'use client';
import { Button } from '@/components/ui/buttons/button';
import { BookmarkIcon } from 'lucide-react';

import { MouseEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export interface Word {
  id: string;
  text: string;
  pronunciation: string;
  definitions: string[];
  examples: string[];
  isFavorite: boolean;
}

export default function WordCard({
  word,
}: Readonly<{
  word: Word;
}>) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const { id, text, pronunciation, definitions, isFavorite } = word;

  // Prevent card click if the child interactive elements are clicked
  const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
    // Only trigger onClick if not a descendant button/link
    if (
      event.target instanceof HTMLElement &&
      event.currentTarget === cardRef.current
    ) {
      router.push(`/word/${id}`);
    }
  };

  const stopPropagationHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      role="button"
      onClick={handleCardClick}
      className={`
        flex flex-col p-2 w-full text-left
        rounded-lg transition
        border border-transparent
        hover:border-primary/70 hover:bg-primary/10
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary
        active:scale-[0.98]
      `}
      aria-label={`Word: ${text}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xl font-semibold">{text}</span>
        <div className="flex items-center gap-x-1">
          <Button
            className="size-6"
            size="icon"
            variant="ghost"
            tabIndex={0}
            // stopPropagation prevents the parent card from firing its onClick
            onClick={stopPropagationHandler}
          >
            <BookmarkIcon
              className={cn('size-5 stroke-primary', {
                'fill-primary': isFavorite,
              })}
            />
          </Button>
        </div>
      </div>
      <span className="font-light">{pronunciation}</span>
      <ol className="list-decimal list-inside flex flex-col gap-y-2 text-sm font-medium">
        <li>{definitions[0]}</li>
      </ol>
    </div>
  );
}
