'use client';
import WordListCard from '@/components/cards/word-list-card';
import { Button } from '@/components/ui/buttons/button';
import { PlusIcon } from 'lucide-react';
import { useNav } from '@/context/nav-context';
import { useEffect } from 'react';

export default function Page() {
  const { setRouteConfig } = useNav();

  useEffect(() => {
    setRouteConfig({
      title: 'Word Lists',
      className: 'bg-green-300',
    });

    return () => {
      setRouteConfig(null);
    };
  }, [setRouteConfig]);

  return (
    <div className="flex flex-col gap-y-5 p-1">
      <WordListCard
        id="0"
        title="Default"
        wordCount={8}
        lastQuizAt="Last exam 2 hours ago"
      />
      <WordListCard
        id="1"
        title="Animals"
        wordCount={23}
        lastQuizAt="No exams have been held yet"
      />
      <Button variant="ghost" className="size-auto text-2xl font-semibold p-2">
        <PlusIcon className="size-8 text-white bg-primary rounded-full p-1" />
        Add List
      </Button>
    </div>
  );
}
