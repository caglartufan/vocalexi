import 'server-only';
import { connectDB } from '@/lib/connectDB';
import { IWord, Word } from '@/models/Word';
import { openai } from '@/lib/openai';
import type {
  Response,
  ResponseUsage,
} from 'openai/resources/responses/responses';
import { BadRequestError, InternalError } from '@/lib/error-handler';
import path from 'node:path';
import fs from 'node:fs/promises';
import { buildPublicUrl } from '@/lib/utils-srv';

export type GenerateWordRequestBody = {
  word: string;
  language: string;
  translation_language: string;
};

export interface GeneratedWordValidationDataSchema {
  isValid: boolean;
}

export interface GeneratedWordDataSchema {
  ipa: string | null;
  romanization: string | null;
  meanings: string[];
  examples: string[];
  examplesTranslated: string[];
}

export interface WordGenerationResult {
  word: IWord;
  wasGenerated: boolean;
  usage?: ResponseUsage;
}

export class WordService {
  static async findExistingWord(
    wordText: string,
    language: string,
  ): Promise<IWord | null> {
    await connectDB();
    return Word.findOne({ word: wordText, language });
  }

  static async generateWordValidationData(
    params: GenerateWordRequestBody,
  ): Promise<Response> {
    const response = await openai.responses.create({
      prompt: {
        id: 'pmpt_68b9ee76af0881979d191ffec398873d0ed1de90ef4c020c',
        variables: params,
      },
    });

    if (
      response.status === 'incomplete' &&
      response.incomplete_details?.reason === 'max_output_tokens'
    ) {
      throw new InternalError(
        'The model did not return a complete response while generating word validation data.',
      );
    }

    return response;
  }

  static async generateWordData(
    params: GenerateWordRequestBody,
  ): Promise<Response> {
    const response = await openai.responses.create({
      prompt: {
        id: 'pmpt_68aa3b0b5ac4819080d894b8687352da026eb11c6ecd5b27',
        variables: params,
      },
    });

    if (
      response.status === 'incomplete' &&
      response.incomplete_details?.reason === 'max_output_tokens'
    ) {
      throw new InternalError(
        'The model did not return a complete response while generating word data.',
      );
    }

    return response;
  }

  static processOpenAIResponse<T>(response: Response): T {
    const output = response.output[0];

    if (!('content' in output) || typeof output?.content?.[0] !== 'object') {
      throw new InternalError(
        'Could not generate requested data. Please try again later.',
      );
    }

    const content = output.content[0];

    if (content.type === 'refusal') {
      throw new InternalError(
        'The model refused to generate a response for requested data.',
      );
    }

    if (content.type !== 'output_text') {
      throw new InternalError(
        'Could not generate requested data. Please try again later.',
      );
    }

    return JSON.parse(response.output_text);
  }

  static transformToWordModel(
    params: GenerateWordRequestBody,
    generatedWord: GeneratedWordDataSchema,
  ): IWord {
    const { word: wordText, language, translation_language } = params;

    // Map examples by language
    const examplesLang = {
      [language]: generatedWord.examples,
      [translation_language]: generatedWord.examplesTranslated,
    };

    return new Word({
      word: wordText,
      language,
      ipa: generatedWord.ipa,
      romanization: generatedWord.romanization,
      meanings: generatedWord.meanings,
      examples: examplesLang,
    });
  }

  static async generateWordSpeech(
    wordId: string,
    word: string,
    language: string,
  ) {
    const response = await openai.audio.speech.create({
      model: 'gpt-4o-mini-tts',
      voice: 'shimmer',
      instructions: `Pronounce the given word in ${language}.`,
      input: word,
      response_format: 'mp3',
    });

    // response is a readable stream (Node)
    const buffer = Buffer.from(await response.arrayBuffer());
    // Build the folder and file path
    const dirPath = path.join('./public/audio/');
    const filePath = path.join(dirPath, `${wordId}.mp3`);

    // Ensure nested folders exist
    await fs.mkdir(dirPath, { recursive: true });

    // Write the file
    await fs.writeFile(filePath, buffer);

    return filePath;
  }

  static async getOrGenerateWord(
    params: GenerateWordRequestBody,
  ): Promise<WordGenerationResult> {
    // Check for existing word
    const existingWord = await this.findExistingWord(
      params.word,
      params.language,
    );
    if (existingWord) {
      // TODO: Check if word has translation for params.translation_language
      // If it doesn't, generate it...
      return {
        word: existingWord,
        wasGenerated: false,
      };
    }

    // Validate word
    const validationResponse = await this.generateWordValidationData(params);
    const generatedWordValidation =
      this.processOpenAIResponse<GeneratedWordValidationDataSchema>(
        validationResponse,
      );

    if (!generatedWordValidation.isValid) {
      throw new BadRequestError('Please provide a valid word.');
    }

    // Generate new word data
    const openAIResponse = await this.generateWordData(params);
    const generatedWord =
      this.processOpenAIResponse<GeneratedWordDataSchema>(openAIResponse);
    const wordModel = this.transformToWordModel(params, generatedWord);
    const audioFilePath = await this.generateWordSpeech(
      wordModel._id!.toString(),
      wordModel.word,
      wordModel.language,
    );

    wordModel.audioURL = buildPublicUrl(audioFilePath);
    await wordModel.save();

    return {
      word: wordModel,
      wasGenerated: true,
      usage: openAIResponse.usage,
    };
  }
}
