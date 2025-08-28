import * as Yup from 'yup';

export const getWordSearchRequestSchema = () =>
  Yup.object().shape({
    word: Yup.string().required('Word is required'),
    language: Yup.string().required('Language is required'),
    translation_language: Yup.string().required(
      'Translation language is required',
    ),
  });
