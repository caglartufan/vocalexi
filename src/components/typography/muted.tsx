import React from 'react';

export function Muted({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <p className="text-muted-foreground text-sm">{children}</p>;
}
