'use client';
import { CirclePlus, CircleUser, House, Star } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

function NavLink({
  href,
  text,
  icon,
  isActive,
}: Readonly<{
  href: string;
  text: string;
  icon: React.ReactElement;
  isActive: boolean;
}>) {
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center text-sm transition-colors',
        isActive
          ? 'text-indigo-500'
          : 'text-gray-700 dark:text-gray-300 hover:text-indigo-400 dark:hover:text-indigo-300',
      )}
    >
      {icon}
      {text}
    </Link>
  );
}

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 h-16 flex justify-around items-center shadow-md">
      <NavLink
        href="/"
        text="Home"
        icon={<House size={24} />}
        isActive={pathname === '/'}
      />
      <NavLink
        href="/favorites"
        text="Favorites"
        icon={<Star size={24} />}
        isActive={pathname === '/favorites'}
      />
      <NavLink
        href="/add-word"
        text="Add Word"
        icon={<CirclePlus size={24} />}
        isActive={pathname === '/add-word'}
      />
      <NavLink
        href="/profile"
        text="Profile"
        icon={<CircleUser size={24} />}
        isActive={pathname === '/profile'}
      />
    </nav>
  );
}
