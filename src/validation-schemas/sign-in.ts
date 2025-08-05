import * as Yup from 'yup';

export const signInRequestSchema = Yup.object({
  email: Yup.string().email().max(255).required(),
  password: Yup.string().min(6).required(),
});

export type SignInRequestBody = Yup.InferType<typeof signInRequestSchema>;
