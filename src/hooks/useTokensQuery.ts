'use client';

import { useQuery } from '@tanstack/react-query';
import type { Token, TokenCategory } from '@/types/token';
import { generateMockTokens } from '@/lib/mockData';

export function useTokensQuery(category: TokenCategory | 'all') {
  const arg = category === 'all' ? {} : { category };

  return useQuery({
    queryKey: ['tokens', arg],
    queryFn: async (): Promise<{ tokens: Token[] }> => {
      // TODO: replace with real API call when ready:
      // const res = await fetch('/api/tokens', { ... });
      // return res.json();

      const categories: TokenCategory[] =
        category === 'all'
          ? ['new', 'final', 'migrated']
          : [category];

      const tokens: Token[] = categories.flatMap((c) =>
        generateMockTokens(20, c),
      );

      return { tokens };
    },
    refetchInterval: 10_000,
  });
}
