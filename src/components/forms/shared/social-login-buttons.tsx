import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface SocialLoginButtonsProps {
  action: 'signin' | 'signup';
}

export function SocialLoginButtons({ action }: SocialLoginButtonsProps) {
  const t = useTranslations(`Auth.${action}`);
  const tMisc = useTranslations('Misc');

  return (
    <>
      <div className="w-full after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          {tMisc('or')}
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
          {t('with_facebook')}
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
          {t('with_google')}
        </Button>
      </div>
    </>
  );
}
