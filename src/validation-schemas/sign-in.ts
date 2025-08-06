import * as Yup from 'yup';

export const getSignInRequestSchema = (t: (k: string) => string) =>
  Yup.object({
    email: Yup.string()
      .email(t('Auth.validation.email'))
      .max(255, t('Auth.validation.email_max'))
      .required(t('Auth.validation.email_required')),
    password: Yup.string()
      .min(6, t('Auth.validation.password_min'))
      .required(t('Auth.validation.password_required')),
  });

export type SignInRequestBody = Yup.InferType<
  ReturnType<typeof getSignInRequestSchema>
>;
