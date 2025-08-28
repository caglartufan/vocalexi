'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/buttons/button';
import { Badge } from '@/components/ui/badge';
import WordDetails from '@/components/blocks/word-details';
import { SearchIcon } from 'lucide-react';

interface RecentWordSearch {
  word: string;
  language: string;
  translation_language: string;
  searchedAt: string;
}

export default function WordSearch() {
  const [recentSearches, setRecentSearches] = useState<RecentWordSearch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentSearches() {
      try {
        const response = await fetch('/api/user/recent-searches');
        if (response.ok) {
          const data = await response.json();
          setRecentSearches(data.searches || []);
        }
      } catch (error) {
        console.error('Failed to fetch recent searches:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecentSearches();
  }, []);

  const handleRecentSearchClick = (search: RecentWordSearch) => {
    // TODO: Implement search functionality
    console.log('Search for:', search.word);
  };

  return (
    <section className="flex flex-col items-center gap-y-2.5">
      <Input
        type="text"
        placeholder="Search word..."
        containerClassName="w-64"
        rightElementContainerClassName="right-1.5"
        rightElement={
          <Button
            className="size-7 bg-linear-to-b from-primary to-[#D470FF] rounded-full"
            size="icon"
          >
            <SearchIcon className="size-[15px]" width={16} height={16} />
          </Button>
        }
      />

      {!isLoading && recentSearches.length > 0 && (
        <>
          <span className="text-sm font-semibold">
            Previously searched words
          </span>
          <div className="flex gap-2 mb-8">
            {recentSearches.map((search, index) => (
              <Badge
                key={`${search.word}-${search.searchedAt}`}
                variant={index === 0 ? 'default' : 'muted'}
                asChild
              >
                <Button
                  variant="ghost"
                  className="text-sm size-auto"
                  onClick={handleRecentSearchClick.bind(null, search)}
                >
                  {search.word}
                </Button>
              </Badge>
            ))}
          </div>
        </>
      )}

      <WordDetails />
    </section>
  );
}
