'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/buttons/button';
import { Badge } from '@/components/ui/badge';
import WordDetails from '@/components/blocks/word-details';
import { SearchIcon } from 'lucide-react';
import useRecentSearches, { RecentSearch } from '@/hooks/use-recent-searches';
import { useFormik } from 'formik';
import axios from '@/lib/axios';
import { Word } from '@/types/types';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { constructFallbackErrorMessage } from '@/lib/utils';
import { useState } from 'react';

export default function WordSearch() {
  const [word, setWord] = useState<Word | undefined>(undefined);
  const { recentSearches, isLoadingRecentSearches, mutateRecentSearches } =
    useRecentSearches();
  const formik = useFormik({
    initialValues: {
      word: '',
    },
    onSubmit: async (values) => {
      let originalRecentSearches;

      await mutateRecentSearches(
        (prevRecentSearches) => {
          if (typeof prevRecentSearches === 'undefined')
            return prevRecentSearches;

          originalRecentSearches = [...prevRecentSearches];
          const currentSearch: RecentSearch = {
            word: values.word,
            language: 'en-US',
            translation_language: 'tr-TR',
            searchedAt: new Date().toISOString(),
          };

          return [currentSearch, prevRecentSearches[0], prevRecentSearches[1]];
        },
        {
          revalidate: false,
        },
      );

      try {
        const res = await axios.get<{ success: boolean; word: Word }>(
          '/words',
          {
            params: {
              word: values.word,
              language: 'en-US',
              translation_language: 'tr-TR',
            },
          },
        );

        setWord(res.data.word);
      } catch (error: unknown) {
        const showToast = () => {
          toast(
            constructFallbackErrorMessage(
              'An error occurred while searching for the word',
              error,
            ),
          );
        };

        if (error instanceof AxiosError) {
          if (
            Array.isArray(error.response?.data?.errors) &&
            error.response?.data?.errors.length > 0
          ) {
            formik.setFieldError('word', error.response.data.errors[0]);
          } else if (typeof error.response?.data?.message === 'string') {
            formik.setFieldError('word', error.response.data.message);
          } else {
            showToast();
          }
        } else {
          showToast();
        }

        // Rollback
        await mutateRecentSearches(originalRecentSearches, {
          revalidate: false,
        });
      }
    },
  });

  const handleRecentSearchClick = async (search: RecentSearch) => {
    if (search.word === word?.word) return;

    await formik.setFieldValue('word', search.word);
    await formik.submitForm();
  };

  return (
    <section className="flex flex-col items-center gap-y-2.5">
      <form onSubmit={formik.handleSubmit}>
        <Input
          type="text"
          name="word"
          placeholder="Search word..."
          containerClassName="w-64"
          rightElementContainerClassName="right-1.5"
          variant={formik.errors.word ? 'error' : 'default'}
          rightElement={
            <Button
              className="size-7 bg-linear-to-b from-primary to-[#D470FF] rounded-full"
              size="icon"
              type="submit"
              disabled={formik.isSubmitting}
            >
              <SearchIcon className="size-[15px]" width={16} height={16} />
            </Button>
          }
          value={formik.values.word}
          onChange={formik.handleChange}
        />
        {formik.errors.word && (
          <span className="block text-sm text-center text-error text-semibold">
            {formik.errors.word}
          </span>
        )}
      </form>
      {!isLoadingRecentSearches &&
        typeof recentSearches !== 'undefined' &&
        recentSearches.length > 0 && (
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
      {formik.isSubmitting ? (
        <p>Generating word data...</p>
      ) : (
        <WordDetails word={word} />
      )}
    </section>
  );
}
