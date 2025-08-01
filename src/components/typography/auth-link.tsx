import Link, { LinkProps } from 'next/link';
import React from 'react';

export default function AuthLink({
  children,
  ...linkProps
}: Readonly<LinkProps & { children: React.ReactNode }>) {
  return (
    <Link
      className="text-primary text-xs underline underline-offset-4"
      {...linkProps}
    >
      {children}
    </Link>
  );
}
