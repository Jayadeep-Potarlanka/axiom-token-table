// src/types/token.ts

/**
 * Core token data structure for the trading table
 */
export interface Token {
  id: string;
  name: string;
  symbol: string;
  address: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
  holders: number;
  createdAt: string;
  category: TokenCategory;
  lastUpdate: number;
}

/**
 * Token categories for filtering (New Pairs, Final Stretch, Migrated)
 */
export type TokenCategory = "new" | "final" | "migrated";

/**
 * API response structure for token lists
 */
export interface TokenListResponse {
  tokens: Token[];
  total: number;
}

/**
 * Sorting configuration for table headers
 */
export type SortField = keyof Token;
export type SortDirection = "asc" | "desc";

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

/**
 * WebSocket message types for real-time price updates
 */
export interface PriceUpdateMessage {
  type: "price_update";
  tokenId: string;
  price: number;
  timestamp: number;
}

/**
 * Table filter state
 */
export interface TableFilters {
  search: string;
  minPrice?: number;
  maxPrice?: number;
  category?: TokenCategory;
}
