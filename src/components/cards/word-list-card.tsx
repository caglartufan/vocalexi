'use client';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/buttons/button';
import Link from 'next/link';
import { BookmarkIcon, ListIcon } from 'lucide-react';

import { MouseEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function WordListCard({
  id,
  title,
  wordCount,
  lastQuizAt,
}: Readonly<{
  id: string;
  title: string;
  wordCount: number;
  lastQuizAt: string;
}>) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  // Prevent card click if the child interactive elements are clicked
  const handleCardClick = (event: MouseEvent<HTMLDivElement>) => {
    // Only trigger onClick if not a descendant button/link
    if (
      event.target instanceof HTMLElement &&
      event.currentTarget === cardRef.current
    ) {
      router.push(`/word-lists/${id}`);
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
      data-wordlist-card
      onClick={handleCardClick}
      className={`
        flex flex-col p-2 w-full text-left
        rounded-lg transition
        border border-transparent
        hover:border-primary/70 hover:bg-primary/10
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary
        active:scale-[0.98]
      `}
      aria-label={`Word list: ${title}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xl font-semibold">{title}</span>
        <div className="flex items-center gap-x-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="size-6 rounded-sm"
                size="icon"
                onClick={stopPropagationHandler}
                asChild
              >
                <Link href="/quiz" tabIndex={0}>
                  <ListIcon />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Take quiz</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="size-6"
                size="icon"
                variant="ghost"
                tabIndex={0}
                // stopPropagation prevents the parent card from firing its onClick
                onClick={stopPropagationHandler}
              >
                <BookmarkIcon className="size-5 fill-primary stroke-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bookmark the list</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <span className="text-primary font-medium">
        Includes {wordCount} words
      </span>
      <span className="text-sm font-medium">{lastQuizAt}</span>
    </div>
  );
}
