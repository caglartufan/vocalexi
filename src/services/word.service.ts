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

export interface GeneratedWordDataSchema {
  ipa: string | null;
  romanization: string | null;
  meanings: string[];
  examples: string[];
  examplesTranslated: string[];
  quizzes: {
    question: string;
    options: {
      value: string;
      isCorrect: boolean;
      explanation: string;
      explanationTranslated: string;
    }[];
  }[];
}

export interface GeneratedWordSchema {
  data: GeneratedWordDataSchema | null;
  isValid: boolean;
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

  static processOpenAIResponse(response: Response): GeneratedWordSchema {
    const output = response.output[0];

    if (!('content' in output) || typeof output?.content?.[0] !== 'object') {
      throw new InternalError(
        'Could not generate word data. Please try again later.',
      );
    }

    const content = output.content[0];

    if (content.type === 'refusal') {
      throw new InternalError(
        'The model refused to generate a response while generating word data.',
      );
    }

    if (content.type !== 'output_text') {
      throw new InternalError(
        'Could not generate word data. Please try again later.',
      );
    }

    return JSON.parse(response.output_text);
  }

  static transformToWordModel(
    generatedWord: GeneratedWordSchema,
    params: GenerateWordRequestBody,
  ): IWord {
    if (!generatedWord.isValid || !generatedWord.data) {
      throw new BadRequestError('Please provide a valid word.');
    }

    const { data } = generatedWord;
    const { word: wordText, language, translation_language } = params;

    // Map examples by language
    const examplesLang = {
      [language]: data.examples,
      [translation_language]: data.examplesTranslated,
    };

    // Transform quizzes with multilingual explanations
    const quizzes = data.quizzes.map((quiz) => ({
      question: quiz.question,
      options: quiz.options.map((option) => ({
        value: option.value,
        isCorrect: option.isCorrect,
        explanation: {
          [language]: option.explanation,
          [translation_language]: option.explanationTranslated,
        },
      })),
    }));

    return new Word({
      word: wordText,
      language,
      ipa: data.ipa,
      romanization: data.romanization,
      meanings: data.meanings,
      examples: examplesLang,
      quizzes,
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

    // Generate new word data
    const openAIResponse = await this.generateWordData(params);
    const generatedWord = this.processOpenAIResponse(openAIResponse);
    const wordModel = this.transformToWordModel(generatedWord, params);
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
