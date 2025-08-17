import MobileBottomNav from '@/components/layout/MobileBottomNav';
import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import MobileHeader from '@/components/layout/MobileHeader';

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession();

  if (session === null) {
    redirect('/sign-in');
  }

  return (
    <>
      <MobileHeader />
      <main className="flex flex-col gap-y-4 font-sans h-full pt-4 px-10 pb-16">
        {children}
      </main>
      <MobileBottomNav />
    </>
  );
}
