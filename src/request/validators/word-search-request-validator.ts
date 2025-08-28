import { NextRequest } from 'next/server';
import { getWordSearchRequestSchema } from '@/validation-schemas/word-search';

export type GenerateWordRequestBody = {
  word: string;
  language: string;
  translation_language: string;
};

export async function wordSearchRequestValidator(req: NextRequest) {
  const word = req.nextUrl.searchParams.get('word');
  const language = req.nextUrl.searchParams.get('language');
  const translation_language = req.nextUrl.searchParams.get(
    'translation_language',
  );

  const params = { word, language, translation_language };
  await getWordSearchRequestSchema().validate(params);

  return params as GenerateWordRequestBody;
}
