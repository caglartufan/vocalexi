import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface SocialLoginButtonsProps {
  actionText: 'Sign up' | 'Sign in';
}

export function SocialLoginButtons({ actionText }: SocialLoginButtonsProps) {
  return (
    <>
      <div className="w-full after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or
        </span>
      </div>
      <div className="grid gap-4 justify-center sm:grid-cols-2">
        <Button
          variant="outline"
          type="button"
          className="h-12 w-[220px] sm:w-full rounded-full"
        >
          <Image
            src="/images/brand-logo/facebook.svg"
            alt="Facebook Logo"
            width={20}
            height={20}
          />
          {actionText} with Facebook
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
          {actionText} with Google
        </Button>
      </div>
    </>
  );
}
