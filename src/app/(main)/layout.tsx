import MobileBottomNav from '@/components/layout/mobile-bottom-nav';
import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import MobileHeader from '@/components/layout/mobile-header';
import { NavProvider } from '@/context/nav-context';

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession();

  if (session === null) {
    redirect('/sign-in');
  }

  return (
    <NavProvider>
      <>
        <MobileHeader />
        <main className="flex flex-col gap-y-4 font-sans h-full pt-4 px-10 pb-24">
          {children}
        </main>
        <MobileBottomNav />
      </>
    </NavProvider>
  );
}
