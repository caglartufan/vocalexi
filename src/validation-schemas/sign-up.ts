import * as Yup from 'yup';

export const signUpRequestSchema = Yup.object({
  firstName: Yup.string().min(2).max(50).required(),
  lastName: Yup.string().min(2).max(50).required(),
  email: Yup.string().email().max(255).required(),
  password: Yup.string().min(6).required(),
  passwordConfirmation: Yup.string()
    .min(6)
    .oneOf([Yup.ref('password')])
    .required(),
});

export type SignUpRequestBody = Yup.InferType<typeof signUpRequestSchema>;
