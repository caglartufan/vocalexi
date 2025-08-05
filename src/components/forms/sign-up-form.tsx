'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useFormik } from 'formik';
import { signUpRequestSchema } from '@/validation-schemas/sign-up';
import { IUser } from '@/models/User';
import { signIn } from 'next-auth/react';
import AuthLink from '@/components/typography/auth-link';
import { FormErrorMessage } from '@/components/ui/form-error-message';
import { toast } from 'sonner';
import {
  getInputVariant,
  hasFormikFieldError,
  SuccessIcon,
} from '@/components/forms/shared/form-input-utils';
import { SocialLoginButtons } from '@/components/forms/shared/social-login-buttons';
import { FormFooter } from '@/components/forms/shared/form-footer';
import { FormHeader } from '@/components/forms/shared/form-header';
import { FormErrorAlert } from '@/components/forms/shared/form-error-alert';
import { useAuthError } from '@/components/forms/shared/use-auth-error';
import { useRouter } from 'next/navigation';

type SignUpFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export default function SignUpForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();
  const { error, clearError, setAuthError, setComplexError } = useAuthError();

  const formik = useFormik<SignUpFormFields>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: signUpRequestSchema,
    onSubmit: async (values) => {
      try {
        clearError();

        const signUpRes = await fetch('/api/auth/sign-up', {
          method: 'POST',
          body: JSON.stringify(values),
        });

        const data: {
          success: boolean;
          message?: string;
          errors?: string[];
          user?: Partial<IUser>;
        } = await signUpRes.json();

        if (signUpRes.status === 201 && data.success) {
          const signInRes = await signIn('credentials', {
            callbackUrl: '/',
            redirect: false,
            email: values.email,
            password: values.password,
          });

          if (typeof signInRes === 'undefined') {
            setAuthError(
              'Something went wrong during sign up. Please try again.',
            );
            return;
          }

          if (signInRes.ok) {
            toast('You have successfully signed up!');
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
              'Something went wrong during sign up. Please try again.',
            );
          }
        } else {
          // Handle sign-up errors
          if (data.message && data.errors && data.errors.length > 0) {
            setComplexError(data.message, data.errors);
          } else if (data.message) {
            setAuthError(data.message);
          } else {
            setAuthError(
              'Something went wrong during sign up. Please try again.',
            );
          }
        }
      } catch (error) {
        let message = 'An error occurred during sign up. Please try again.';
        if (error instanceof Error) {
          message = `An error occurred during sign up. ${error.message}`;
        }
        setAuthError(message);
      }
    },
  });

  // Extract error checks using shared utilities
  const firstNameHasError = hasFormikFieldError(formik, 'firstName');
  const lastNameHasError = hasFormikFieldError(formik, 'lastName');
  const emailHasError = hasFormikFieldError(formik, 'email');
  const passwordHasError = hasFormikFieldError(formik, 'password');
  const passwordConfirmationHasError = hasFormikFieldError(
    formik,
    'passwordConfirmation',
  );

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-6">
          <FormHeader title="Welcome New User!" />
          <FormErrorAlert error={error} />
          <div className="flex flex-col items-stretch gap-y-3">
            <div>
              <Input
                id="firstName"
                type="text"
                placeholder="First name"
                className="h-10 rounded-full"
                variant={getInputVariant(formik, 'firstName')}
                rightElement={
                  getInputVariant(formik, 'firstName') === 'success' && (
                    <SuccessIcon />
                  )
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {firstNameHasError && (
                <FormErrorMessage message={formik.errors.firstName!} />
              )}
            </div>
            <div>
              <Input
                id="lastName"
                type="text"
                placeholder="Last name"
                className="h-10 rounded-full"
                variant={getInputVariant(formik, 'lastName')}
                rightElement={
                  getInputVariant(formik, 'lastName') === 'success' && (
                    <SuccessIcon />
                  )
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {lastNameHasError && (
                <FormErrorMessage message={formik.errors.lastName!} />
              )}
            </div>
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
            <div>
              <Input
                id="passwordConfirmation"
                type="password"
                placeholder="Password confirmation"
                className="h-10 rounded-full"
                variant={getInputVariant(formik, 'passwordConfirmation')}
                rightElement={
                  getInputVariant(formik, 'passwordConfirmation') ===
                    'success' && <SuccessIcon />
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {passwordConfirmationHasError && (
                <FormErrorMessage
                  message={formik.errors.passwordConfirmation!}
                />
              )}
            </div>
            <Button type="submit" className="w-full rounded-full h-10">
              Sign Up
            </Button>
            <div className="text-center text-xs">
              Already have an account?{' '}
              <AuthLink href="/sign-in">Sign In</AuthLink>
            </div>
            <SocialLoginButtons actionText="Sign up" />
          </div>
        </div>
      </form>
      <FormFooter />
    </div>
  );
}
