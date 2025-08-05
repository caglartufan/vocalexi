import React from 'react';
import AuthLink from '@/components/typography/auth-link';

export function FormFooter() {
  return (
    <div className="text-muted-foreground text-center text-xs text-balance">
      By clicking continue, you agree to our{' '}
      <AuthLink href="#">Terms of Service</AuthLink> and{' '}
      <AuthLink href="#">Privacy Policy</AuthLink>.
    </div>
  );
}
