'use client';
import { SessionProvider as MainSessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import React from 'react';

export default function SessionProvider({
  session,
  children,
}: Readonly<{
  children: React.ReactNode;
  session: Session | null;
}>) {
  return (
    <MainSessionProvider session={session}>{children}</MainSessionProvider>
  );
}
