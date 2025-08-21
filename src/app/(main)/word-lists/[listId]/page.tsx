'use client';
import { Button } from '@/components/ui/buttons/button';
import { BookmarkIcon, ClipboardCheckIcon, PlusIcon } from 'lucide-react';
import WordCard, { Word } from '@/components/cards/word-card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useNav } from '@/context/nav-context';
import { useEffect } from 'react';

const words: Word[] = [
  {
    id: '0',
    text: 'cumbersome',
    pronunciation: "/'kəmbərsəm/",
    definitions: [
      'large or heavy and therefore difficult to carry or use; unwieldy.',
    ],
    examples: [
      'The view from the top of the mountain was absolutely magnificent.',
      'She wore a magnificent dress to the gala.',
      'The palace was a magnificent example of Ottoman architecture.',
    ],
    isFavorite: true,
  },
  {
    id: '1',
    text: 'pompous',
    pronunciation: "/'pämpəs/",
    definitions: [
      'affectedly and irritatingly grand, solemn, or self-important.',
    ],
    examples: [
      'The professor’s pompous lecture was filled with long, unnecessary words that confused rather than impressed the students.',
      'She rolled her eyes at his pompous speech, which made him sound more arrogant than wise.',
      'Despite his pompous attitude, everyone knew he had very little real experience.',
    ],
    isFavorite: false,
  },
  {
    id: '2',
    text: 'magnificent',
    pronunciation: '/mæɡˈnɪf.ɪ.sənt/',
    definitions: [
      'Extremely beautiful, impressive, or grand.',
      'Excellent or outstanding in quality.',
    ],
    examples: [
      'The palace looked absolutely magnificent when lit up at night.',
      'She gave a magnificent performance that left the audience in awe.',
      'The view from the mountain top was so magnificent that we stood silently, just taking it in.',
    ],
    isFavorite: false,
  },
];

export default function Page() {
  const { setRouteConfig } = useNav();

  useEffect(() => {
    setRouteConfig({
      title: 'Default',
      className: 'bg-blue-300',
    });

    return () => {
      setRouteConfig(null);
    };
  }, [setRouteConfig]);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-center">
        <Button variant="ghost-inline" asChild>
          <Link href="/quiz">
            <ClipboardCheckIcon className="size-5" />
            Quiz
          </Link>
        </Button>
        <Button variant="ghost-inline">
          <BookmarkIcon className="size-5" />
          Bookmark
        </Button>
      </div>
      <Separator />
      <div className="flex flex-col gap-y-5 p-1">
        {words.map((word) => (
          <WordCard key={word.id} word={word} />
        ))}
        <Button
          variant="ghost"
          className="size-auto text-2xl font-semibold p-2"
        >
          <PlusIcon className="size-8 text-white bg-primary rounded-full p-1" />
          Add Word
        </Button>
      </div>
    </div>
  );
}
