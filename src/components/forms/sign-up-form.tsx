'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/buttons/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useFormik } from 'formik';
import { getSignUpRequestSchema } from '@/validation-schemas/sign-up';
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
import { useTranslations } from 'next-intl';

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
  const t = useTranslations();
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
    validationSchema: getSignUpRequestSchema(t),
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
            setAuthError(t('Auth.error.generic_signup'));
            return;
          }

          if (signInRes.ok) {
            toast(t('Auth.success.signed_up'));
            if (typeof signInRes.url === 'string') {
              router.push(signInRes.url);
              return;
            }
          } else if (signInRes.error === 'CredentialsSignin') {
            setAuthError(t('Auth.error.invalid_credentials'));
          } else {
            setAuthError(t('Auth.error.generic_signup'));
          }
        } else {
          // Handle sign-up errors
          if (data.message && data.errors && data.errors.length > 0) {
            setComplexError(data.message, data.errors);
          } else if (data.message) {
            setAuthError(data.message);
          } else {
            setAuthError(t('Auth.error.generic_signup'));
          }
        }
      } catch (error) {
        let message = t('Auth.error.unknown_signup');
        if (error instanceof Error) {
          message = `${t('Auth.error.unknown_signup')}: ${error.message}`;
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
          <FormHeader title={t('Auth.signup.title')} />
          <FormErrorAlert error={error} />
          <div className="flex flex-col items-stretch gap-y-3">
            <div>
              <Input
                id="firstName"
                type="text"
                placeholder={t('Auth.fields.first_name')}
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
                placeholder={t('Auth.fields.last_name')}
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
                placeholder={t('Auth.fields.email')}
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
                placeholder={t('Auth.fields.password')}
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
                placeholder={t('Auth.fields.password_confirmation')}
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
            <Button
              type="submit"
              className="w-full rounded-full h-10"
              disabled={formik.isSubmitting}
            >
              {t('Auth.signup.button')}
            </Button>
            <div className="text-center text-xs">
              {t('Auth.signup.already_have_account')}{' '}
              <AuthLink href="/sign-in">
                {t('Auth.signup.signin_link')}
              </AuthLink>
            </div>
            <SocialLoginButtons action={'signup'} />
          </div>
        </div>
      </form>
      <FormFooter />
    </div>
  );
}
