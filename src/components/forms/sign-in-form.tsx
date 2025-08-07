'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import AuthLink from '@/components/typography/auth-link';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import { getSignInRequestSchema } from '@/validation-schemas/sign-in';
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
import { useTranslations } from 'next-intl';

type SignInFormFields = {
  email: string;
  password: string;
};

export default function SignInForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const t = useTranslations();
  const router = useRouter();
  const { error, clearError, setAuthError } = useAuthError();

  const formik = useFormik<SignInFormFields>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: getSignInRequestSchema(t),
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
          setAuthError(t('Auth.error.generic_signin'));
          return;
        }

        if (signInRes.ok) {
          toast(t('Auth.success.signed_in'));
          if (typeof signInRes.url === 'string') {
            router.push(signInRes.url);
            return;
          }
        } else if (signInRes.error === 'CredentialsSignin') {
          setAuthError(t('Auth.error.invalid_credentials'));
        } else {
          setAuthError(t('Auth.error.generic_signin'));
        }
      } catch (error) {
        let message = t('Auth.error.unknown_signin');
        if (error instanceof Error) {
          message = `${t('Auth.error.unknown_signin')}: ${error.message}`;
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
          <FormHeader title={t('Auth.signin.title')} />
          <FormErrorAlert error={error} />
          <div className="flex flex-col items-stretch gap-y-3">
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
            <Button
              type="submit"
              className="w-full rounded-full h-10"
              disabled={formik.isSubmitting}
            >
              {t('Auth.signin.button')}
            </Button>
            <div className="text-center">
              <AuthLink href="/forgot-password">
                {t('Auth.signin.forgot')}
              </AuthLink>
            </div>
            <div className="text-center text-xs">
              {t('Auth.signin.new_user')}{' '}
              <AuthLink href="/sign-up">
                {t('Auth.signin.signup_link')}
              </AuthLink>
            </div>
            <SocialLoginButtons action={'signin'} />
          </div>
        </div>
      </form>
      <FormFooter />
    </div>
  );
}
