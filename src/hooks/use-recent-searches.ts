import useSWR from 'swr';

export interface RecentSearch {
  word: string;
  language: string;
  translation_language: string;
  searchedAt: string;
}

export default function useRecentSearches() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/user/recent-searches',
    async (url) => {
      const res = await fetch(url);
      const data: { searches: RecentSearch[]; success: boolean } =
        await res.json();
      return data.searches;
    },
  );

  return {
    recentSearches: data,
    recentSearchesError: error,
    isLoadingRecentSearches: isLoading,
    mutateRecentSearches: mutate,
  };
}
