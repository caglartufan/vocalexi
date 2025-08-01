import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AuthLink from '@/components/typography/auth-link';

export default function SignInForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-6">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex items-center justify-center gap-x-[11px] rounded-md">
                <Image
                  src="/images/logo.png"
                  alt="Vocalexi Logo"
                  width={56.64}
                  height={47.2}
                  className="w-14"
                />
                <h1 className="text-3xl font-bold">Vocalexi</h1>
                <span className="sr-only">Vocalexi</span>
              </div>
            </Link>
            <h2 className="text-2xl font-bold">Welcome Back!</h2>
          </div>
          <div className="flex flex-col items-center gap-y-3">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              className="h-10 rounded-full"
              required
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              className="h-10 rounded-full"
              required
            />
            <Button type="submit" className="w-full rounded-full h-10">
              Sign In
            </Button>
            <div className="text-center">
              <AuthLink href="/forgot-password">Forgot Pasword?</AuthLink>
            </div>
            <div className="text-center text-xs">
              New user? <AuthLink href="/sign-up">Sign Up</AuthLink>
            </div>
            <div className="w-full after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">
                Or
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Button
                variant="outline"
                type="button"
                className="h-12 w-[220px] sm:w-full rounded-full"
              >
                <Image
                  src="/images/brand-logo/facebook.svg"
                  alt="Google Logo"
                  width={20}
                  height={20}
                />
                Sign in with Facebook
              </Button>
              <Button
                variant="outline"
                type="button"
                className="h-12 w-[220px] sm:w-full rounded-full"
              >
                <Image
                  src="/images/brand-logo/google.svg"
                  alt="Google Logo"
                  width={16}
                  height={16}
                />
                Sign in with Google
              </Button>
            </div>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground text-center text-xs text-balance">
        By clicking continue, you agree to our{' '}
        <AuthLink href="#">Terms of Service</AuthLink> and{' '}
        <AuthLink href="#">Privacy Policy</AuthLink>.
      </div>
    </div>
  );
}
