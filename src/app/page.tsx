'use client';

import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTokens } from '@/store/slices/tokenSlice';
import { setCategory, setSearchQuery, closeModal } from '@/store/slices/uiSlice';
import { useGetTokensQuery } from '@/store/api/tokenApi';
import { useWebSocket } from '@/hooks/useWebSocket';
import { TokenTable } from '@/components/organisms/TokenTable';
import { TokenDetailsDialog } from '@/components/organisms/TokenDetailsDialog';
import { Button } from '@/components/atoms/Button';
import { ShimmerSkeleton } from '@/components/atoms/Skeleton';
import { Badge } from '@/components/atoms/Badge';
import { cn } from '@/lib/utils';
import { Search, RefreshCw, AlertCircle } from 'lucide-react';
import type { Token, TokenCategory } from '@/types/token';

const MOCK_TOKENS: Token[] = [
  {
    id: '1',
    name: 'New Token 1',
    symbol: 'NEW0',
    address: '0x1234567890abcdef1234567890abcdef12345678',
    price: 53.07,
    priceChange24h: 1.46,
    volume24h: 815750,
    marketCap: 6720000,
    liquidity: 57680,
    holders: 3804,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    category: 'new',
    lastUpdate: Date.now(),
  },
  {
    id: '2',
    name: 'New Token 2',
    symbol: 'NEW1',
    address: '0xabcdef1234567890abcdef1234567890abcdef12',
    price: 17.23,
    priceChange24h: -0.76,
    volume24h: 897260,
    marketCap: 9070000,
    liquidity: 147810,
    holders: 7528,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    category: 'new',
    lastUpdate: Date.now(),
  },
  {
    id: '3',
    name: 'New Token 3',
    symbol: 'NEW2',
    address: '0x9876543210fedcba9876543210fedcba98765432',
    price: 67.28,
    priceChange24h: 3.19,
    volume24h: 804090,
    marketCap: 1560000,
    liquidity: 405790,
    holders: 6462,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'new',
    lastUpdate: Date.now(),
  },
  {
    id: '4',
    name: 'New Token 4',
    symbol: 'NEW3',
    address: '0x1111111111111111111111111111111111111111',
    price: 76.11,
    priceChange24h: 3.16,
    volume24h: 461290,
    marketCap: 8100000,
    liquidity: 212070,
    holders: 9106,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'new',
    lastUpdate: Date.now(),
  },
  {
    id: '5',
    name: 'New Token 5',
    symbol: 'NEW4',
    address: '0x2222222222222222222222222222222222222222',
    price: 92.36,
    priceChange24h: 3.79,
    volume24h: 440400,
    marketCap: 5200000,
    liquidity: 346850,
    holders: 3621,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'new',
    lastUpdate: Date.now(),
  },
  {
    id: '6',
    name: 'Final Token 1',
    symbol: 'FIN0',
    address: '0x3333333333333333333333333333333333333333',
    price: 48.61,
    priceChange24h: 2.02,
    volume24h: 942650,
    marketCap: 8550000,
    liquidity: 319610,
    holders: 2328,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'final',
    lastUpdate: Date.now(),
  },
  {
    id: '7',
    name: 'Final Token 2',
    symbol: 'FIN1',
    address: '0x4444444444444444444444444444444444444444',
    price: 78.40,
    priceChange24h: 4.09,
    volume24h: 120580,
    marketCap: 7220000,
    liquidity: 291680,
    holders: 1267,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'final',
    lastUpdate: Date.now(),
  },
  {
    id: '8',
    name: 'Final Token 3',
    symbol: 'FIN2',
    address: '0x5555555555555555555555555555555555555555',
    price: 39.82,
    priceChange24h: -4.56,
    volume24h: 519880,
    marketCap: 1740000,
    liquidity: 284400,
    holders: 9305,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    category: 'final',
    lastUpdate: Date.now(),
  },
  {
    id: '9',
    name: 'Final Token 4',
    symbol: 'FIN3',
    address: '0x6666666666666666666666666666666666666666',
    price: 45.85,
    priceChange24h: -4.08,
    volume24h: 31450,
    marketCap: 974220,
    liquidity: 285350,
    holders: 7364,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    category: 'final',
    lastUpdate: Date.now(),
  },
  {
    id: '10',
    name: 'Final Token 5',
    symbol: 'FIN4',
    address: '0x7777777777777777777777777777777777777777',
    price: 39.01,
    priceChange24h: 2.29,
    volume24h: 388710,
    marketCap: 5050000,
    liquidity: 198590,
    holders: 9265,
    createdAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    category: 'final',
    lastUpdate: Date.now(),
  },
  {
    id: '11',
    name: 'Migrated Token 1',
    symbol: 'MIG0',
    address: '0x8888888888888888888888888888888888888888',
    price: 28.84,
    priceChange24h: 8.41,
    volume24h: 148740,
    marketCap: 8730000,
    liquidity: 457070,
    holders: 4180,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'migrated',
    lastUpdate: Date.now(),
  },
  {
    id: '12',
    name: 'Migrated Token 2',
    symbol: 'MIG1',
    address: '0x9999999999999999999999999999999999999999',
    price: 88.38,
    priceChange24h: -5.09,
    volume24h: 186700,
    marketCap: 8180000,
    liquidity: 102360,
    holders: 1918,
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    category: 'migrated',
    lastUpdate: Date.now(),
  },
  {
    id: '13',
    name: 'Migrated Token 3',
    symbol: 'MIG2',
    address: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    price: 63.25,
    priceChange24h: 8.84,
    volume24h: 573170,
    marketCap: 296320,
    liquidity: 387030,
    holders: 6370,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    category: 'migrated',
    lastUpdate: Date.now(),
  },
  {
    id: '14',
    name: 'Migrated Token 4',
    symbol: 'MIG3',
    address: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
    price: 53.67,
    priceChange24h: 7.29,
    volume24h: 767960,
    marketCap: 4880000,
    liquidity: 360880,
    holders: 3289,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'migrated',
    lastUpdate: Date.now(),
  },
  {
    id: '15',
    name: 'Migrated Token 5',
    symbol: 'MIG4',
    address: '0xcccccccccccccccccccccccccccccccccccccccc',
    price: 14.02,
    priceChange24h: -4.70,
    volume24h: 775750,
    marketCap: 1640000,
    liquidity: 111460,
    holders: 6510,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'migrated',
    lastUpdate: Date.now(),
  },
];

export default function Home() {
  const dispatch = useAppDispatch();
  const { selectedCategory, searchQuery, selectedTokenId, isModalOpen } =
    useAppSelector((state) => state.ui);

  // Redux tokens
  const tokensFromStore = useAppSelector(
    (state) => Object.values(state.tokens.tokens) as Token[]
  );

  // RTK Query (optional live fetch)
  const queryArg =
    selectedCategory === 'all' ? {} : { category: selectedCategory };
  const {
    data,
    isLoading: queryLoading,
    isFetching,
    error,
    refetch,
  } = useGetTokensQuery(queryArg);

  // Decide tokens to show: Redux → RTK Query → mock
  const tokens: Token[] =
    tokensFromStore.length > 0
      ? tokensFromStore
      : data?.tokens && data.tokens.length > 0
      ? (data.tokens as Token[])
      : MOCK_TOKENS;

  // Our loading flag: only while we have no tokens from store AND query is loading
  const isLoading =
    tokensFromStore.length === 0 && (queryLoading || isFetching);

  // Sync RTK Query data into Redux when it arrives
  useEffect(() => {
    if (data?.tokens && data.tokens.length > 0) {
      dispatch(setTokens(data.tokens as Token[]));
    }
  }, [data?.tokens, dispatch]);

  // WebSocket live price updates
  useWebSocket(tokens);

  // Filter + search
  const filteredTokens = useMemo(() => {
    let filtered: Token[] = tokens;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.symbol.toLowerCase().includes(q) ||
          t.address.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((t) => t.category === selectedCategory);
    }

    return filtered;
  }, [tokens, searchQuery, selectedCategory]);

  const handleSearch = (v: string) => {
    dispatch(setSearchQuery(v));
  };

  const handleCategoryChange = (category: TokenCategory | 'all') => {
    dispatch(setCategory(category));
    if (searchQuery.trim()) {
      dispatch(setSearchQuery(''));
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  const selectedToken: Token | null =
    (tokens.find((t) => t.id === selectedTokenId) as Token | undefined) || null;

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center max-w-md space-y-4">
          <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="h-8 w-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-red-400">
            Failed to Load Market Data
          </h2>
          <p className="text-gray-400">
            There was an error fetching token information. Please try again.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleRefresh}
              variant="primary"
              className="inline-flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700"
              disabled={queryLoading || isFetching}
            >
              <RefreshCw
                className={cn(
                  'h-4 w-4',
                  (queryLoading || isFetching) && 'animate-spin'
                )}
              />
              Retry
            </Button>
            <Button
              onClick={() => window.location.reload()}
              variant="secondary"
              className="px-6 py-2"
            >
              Reload Page
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Token Discovery
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            Real-time token analytics and trading intelligence
          </p>
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-4">
            <Badge
              variant="default"
              className="bg-emerald-900/30 border-emerald-500/30 text-emerald-300"
            >
              {tokens.length} Active Tokens
            </Badge>
            <Badge
              variant="default"
              className="bg-blue-900/30 border-blue-500/30 text-blue-300"
            >
              Live Updates •{' '}
              {new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Badge>
            {(queryLoading || isFetching) && (
              <Badge
                variant="default"
                className="bg-amber-900/30 border-amber-500/30 text-amber-300 animate-pulse"
              >
                <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                Updating...
              </Badge>
            )}
          </div>
        </header>

        {/* Controls */}
        <div className="mb-8 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-gray-900/50 rounded-xl p-4 border border-gray-700">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 order-2 lg:order-1">
            <Button
              variant={selectedCategory === 'all' ? 'primary' : 'ghost'}
              onClick={() => handleCategoryChange('all')}
              size="sm"
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 border-2',
                selectedCategory !== 'all'
                  ? 'border-gray-600/50 hover:border-gray-500 text-gray-300 hover:text-white hover:bg-gray-800/50 shadow-sm'
                  : 'border-blue-500 bg-blue-900/20 text-blue-300 shadow-lg shadow-blue-500/20 hover:bg-blue-900/30 hover:border-blue-400'
              )}
            >
              All Tokens ({tokens.length})
            </Button>

            <Button
              variant={selectedCategory === 'new' ? 'primary' : 'ghost'}
              onClick={() => handleCategoryChange('new')}
              size="sm"
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 border-2',
                selectedCategory !== 'new'
                  ? 'border-gray-600/50 hover:border-gray-500 text-gray-300 hover:text-white hover:bg-gray-800/50 shadow-sm'
                  : 'border-emerald-500 bg-emerald-900/20 text-emerald-300 shadow-lg shadow-emerald-500/20 hover:bg-emerald-900/30 hover:border-emerald-400'
              )}
            >
              <span className="hidden sm:inline">New Pairs</span>
              <span className="sm:hidden">New</span>
              {selectedCategory === 'new' && ` (${filteredTokens.length})`}
            </Button>

            <Button
              variant={selectedCategory === 'final' ? 'primary' : 'ghost'}
              onClick={() => handleCategoryChange('final')}
              size="sm"
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 border-2',
                selectedCategory !== 'final'
                  ? 'border-gray-600/50 hover:border-gray-500 text-gray-300 hover:text-white hover:bg-gray-800/50 shadow-sm'
                  : 'border-amber-500 bg-amber-900/20 text-amber-300 shadow-lg shadow-amber-500/20 hover:bg-amber-900/30 hover:border-amber-400'
              )}
            >
              <span className="hidden sm:inline">Final Stretch</span>
              <span className="sm:hidden">Final</span>
              {selectedCategory === 'final' && ` (${filteredTokens.length})`}
            </Button>

            <Button
              variant={selectedCategory === 'migrated' ? 'primary' : 'ghost'}
              onClick={() => handleCategoryChange('migrated')}
              size="sm"
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 border-2',
                selectedCategory !== 'migrated'
                  ? 'border-gray-600/50 hover:border-gray-500 text-gray-300 hover:text-white hover:bg-gray-800/50 shadow-sm'
                  : 'border-red-500 bg-red-900/20 text-red-300 shadow-lg shadow-red-500/20 hover:bg-red-900/30 hover:border-red-400'
              )}
            >
              <span className="hidden sm:inline">Migrated</span>
              <span className="sm:hidden">Migrated</span>
              {selectedCategory === 'migrated' &&
                ` (${filteredTokens.length})`}
            </Button>
          </div>

          {/* Search + refresh */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto order-1 lg:order-2">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search tokens by name, symbol, or address..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className={cn(
                  'w-full pl-10 pr-4 py-2.5 bg-gray-900/80 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none',
                  'focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200',
                  searchQuery && 'ring-1 ring-blue-500/30 border-blue-500/50'
                )}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700/50 transition-colors"
                  aria-label="Clear search"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            <Button
              onClick={handleRefresh}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 px-4 py-2 border border-gray-600 hover:border-gray-500"
              disabled={queryLoading || isFetching}
            >
              <RefreshCw
                className={cn(
                  'h-4 w-4',
                  (queryLoading || isFetching) && 'animate-spin'
                )}
              />
              <span className="hidden sm:inline">Refresh</span>
              <span className="sm:hidden">↻</span>
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
          {/* Loading state */}
          {isLoading && tokensFromStore.length === 0 && (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <ShimmerSkeleton className="h-8 w-48" />
                <ShimmerSkeleton className="h-8 w-32 rounded-full" />
              </div>
              <div className="space-y-3">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-7 gap-4 p-4 bg-gray-800/30 rounded-lg items-center"
                  >
                    <ShimmerSkeleton className="h-10 w-48 col-span-2" />
                    <ShimmerSkeleton className="h-10 w-20" />
                    <ShimmerSkeleton className="h-10 w-16" />
                    <ShimmerSkeleton className="h-10 w-24" />
                    <ShimmerSkeleton className="h-10 w-24" />
                    <ShimmerSkeleton className="h-10 w-20" />
                    <ShimmerSkeleton className="h-10 w-16 flex justify-end" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && filteredTokens.length === 0 && tokens.length > 0 && (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-300">
                {searchQuery.trim()
                  ? `No tokens found for "${searchQuery}"`
                  : selectedCategory === 'all'
                  ? 'No tokens available'
                  : `No ${selectedCategory} tokens found`}
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {searchQuery.trim()
                  ? 'Try different search terms or clear the search to see all tokens.'
                  : `Check back later for new ${selectedCategory} tokens or try a different category.`}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={handleRefresh}
                  variant="secondary"
                  className="inline-flex items-center gap-2 px-6 py-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh Data
                </Button>
                {searchQuery.trim() && (
                  <Button
                    onClick={() => handleSearch('')}
                    variant="ghost"
                    className="px-6 py-2"
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Table */}
          {!isLoading && filteredTokens.length > 0 && (
            <>
              <div className="px-6 py-4 border-b border-gray-700 bg-gray-950/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold text-white">
                      Token Market Data
                    </h2>
                    <Badge
                      variant="default"
                      className="bg-blue-900/30 text-blue-300"
                    >
                      {filteredTokens.length} tokens
                    </Badge>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
                    <span>Last updated:</span>
                    <span className="font-mono text-xs">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>

              <TokenTable tokens={filteredTokens} />

              <div className="px-6 py-4 border-t border-gray-700 bg-gray-950/50">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between text-xs text-gray-400">
                  <div className="text-center sm:text-left">
                    Showing {filteredTokens.length} of {tokens.length} tokens •{' '}
                    {searchQuery.trim() && `Searching "${searchQuery}"`}{' '}
                    {selectedCategory !== 'all' &&
                      `• Category: ${selectedCategory}`}
                  </div>
                  <Button
                    onClick={handleRefresh}
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500"
                    disabled={queryLoading || isFetching}
                  >
                    <RefreshCw
                      className={cn(
                        'h-3 w-3',
                        (queryLoading || isFetching) && 'animate-spin'
                      )}
                    />
                    Update Data
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Token details modal */}
      <TokenDetailsDialog
        open={isModalOpen}
        token={selectedToken}
        onOpenChange={(open) => {
          if (!open) {
            dispatch(closeModal());
          }
        }}
      />
    </main>
  );
}
