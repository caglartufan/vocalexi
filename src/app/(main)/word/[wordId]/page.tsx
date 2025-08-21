'use client';
import WordDetailsFull from '@/components/blocks/word-details-full';
import { useNav } from '@/context/nav-context';
import { useEffect } from 'react';

export default function Page() {
  const { setRouteConfig } = useNav();

  useEffect(() => {
    setRouteConfig({
      title: 'Cumbersome',
      className: 'bg-red-300',
    });

    return () => {
      setRouteConfig(null);
    };
  }, [setRouteConfig]);

  return <WordDetailsFull />;
}
