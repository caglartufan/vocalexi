import * as Yup from 'yup';

export const getSignUpRequestSchema = (t: (k: string) => string) =>
  Yup.object({
    firstName: Yup.string()
      .min(2, t('Auth.validation.first_name_min'))
      .max(50, t('Auth.validation.first_name_max'))
      .required(t('Auth.validation.first_name_required')),
    lastName: Yup.string()
      .min(2, t('Auth.validation.last_name_min'))
      .max(50, t('Auth.validation.last_name_max'))
      .required(t('Auth.validation.last_name_required')),
    email: Yup.string()
      .email(t('Auth.validation.email'))
      .max(255, t('Auth.validation.email_max'))
      .required(t('Auth.validation.email_required')),
    password: Yup.string()
      .min(6, t('Auth.validation.password_min'))
      .required(t('Auth.validation.password_required')),
    passwordConfirmation: Yup.string()
      .min(6, t('Auth.validation.password_min'))
      .oneOf([Yup.ref('password')], t('Auth.validation.password_match'))
      .required(t('Auth.validation.password_confirmation_required')),
  });

export type SignUpRequestBody = Yup.InferType<
  ReturnType<typeof getSignUpRequestSchema>
>;
