'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import AuthLink from '@/components/typography/auth-link';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import { signInRequestSchema } from '@/validation-schemas/sign-in';
import { FormErrorMessage } from '@/components/ui/form-error-message';
import { FormHeader } from './shared/form-header';
import { FormErrorAlert } from './shared/form-error-alert';
import { SocialLoginButtons } from './shared/social-login-buttons';
import { FormFooter } from './shared/form-footer';
import {
  getInputVariant,
  hasFormikFieldError,
  SuccessIcon,
} from './shared/form-input-utils';
import { useAuthError } from './shared/use-auth-error';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type SignInFormFields = {
  email: string;
  password: string;
};

export default function SignInForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();
  const { error, clearError, setAuthError } = useAuthError();

  const formik = useFormik<SignInFormFields>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInRequestSchema,
    onSubmit: async (values) => {
      try {
        clearError();

        const signInRes = await signIn('credentials', {
          callbackUrl: '/',
          redirect: false,
          email: values.email,
          password: values.password,
        });

        if (typeof signInRes === 'undefined') {
          setAuthError(
            'Something went wrong during sign in. Please try again.',
          );
          return;
        }

        if (signInRes.ok) {
          toast('You have successfully signed in!');
          if (typeof signInRes.url === 'string') {
            router.push(signInRes.url);
            return;
          }
        } else if (signInRes.error === 'CredentialsSignin') {
          setAuthError(
            'Invalid email or password. Please check your credentials and try again.',
          );
        } else {
          setAuthError(
            'Something went wrong during sign in. Please try again.',
          );
        }
      } catch (error) {
        let message = 'An error occurred during sign in. Please try again.';
        if (error instanceof Error) {
          message = `An error occurred during sign in. ${error.message}`;
        }
        setAuthError(message);
      }
    },
  });

  // Extract error checks using shared utilities
  const emailHasError = hasFormikFieldError(formik, 'email');
  const passwordHasError = hasFormikFieldError(formik, 'password');

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-6">
          <FormHeader title="Welcome Back!" />
          <FormErrorAlert error={error} />
          <div className="flex flex-col items-stretch gap-y-3">
            <div>
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                className="h-10 rounded-full"
                variant={getInputVariant(formik, 'email')}
                rightElement={
                  getInputVariant(formik, 'email') === 'success' && (
                    <SuccessIcon />
                  )
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {emailHasError && (
                <FormErrorMessage message={formik.errors.email!} />
              )}
            </div>
            <div>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="h-10 rounded-full"
                variant={getInputVariant(formik, 'password')}
                rightElement={
                  getInputVariant(formik, 'password') === 'success' && (
                    <SuccessIcon />
                  )
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {passwordHasError && (
                <FormErrorMessage message={formik.errors.password!} />
              )}
            </div>
            <Button type="submit" className="w-full rounded-full h-10">
              Sign In
            </Button>
            <div className="text-center">
              <AuthLink href="/forgot-password">Forgot Password?</AuthLink>
            </div>
            <div className="text-center text-xs">
              New user? <AuthLink href="/sign-up">Sign Up</AuthLink>
            </div>
            <SocialLoginButtons actionText="Sign in" />
          </div>
        </div>
      </form>
      <FormFooter />
    </div>
  );
}
