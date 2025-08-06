import React from 'react';
import AuthLink from '@/components/typography/auth-link';
import { useTranslations } from 'next-intl';

export function FormFooter() {
  const t = useTranslations('Auth.footer');

  return (
    <div className="text-muted-foreground text-center text-xs text-balance">
      {t.rich('agree', {
        link: (chunks) => {
          if (!Array.isArray(chunks) || chunks.length !== 1) return null;

          const linkId = chunks[0];
          const hrefMap = new Map([
            ['terms', '#'],
            ['privacy', '#'],
          ]);
          const textMap = new Map([
            ['terms', t('terms')],
            ['privacy', t('privacy')],
          ]);
          const href = hrefMap.get(linkId);
          const text = textMap.get(linkId);

          if (typeof href === 'undefined' || typeof text === 'undefined')
            return null;

          return <AuthLink href={href}>{text}</AuthLink>;
        },
      })}
    </div>
  );
}
