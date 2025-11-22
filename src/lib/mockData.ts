import type { Token } from "@/types/token";

export function generateMockTokens(count: number, category: string): Token[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${category}-${i}-${Math.random().toString(36).substr(2, 9)}`,
    name: `${category.charAt(0).toUpperCase() + category.slice(1)} Token ${i + 1}`,
    symbol: `${category.toUpperCase().slice(0, 3)}${i}`,
    address: `0x${Math.random().toString(16).substr(2, 40)}`,
    price: Math.random() * 100,
    priceChange24h: (Math.random() - 0.5) * 20,
    volume24h: Math.random() * 1000000,
    marketCap: Math.random() * 10000000,
    liquidity: Math.random() * 500000,
    holders: Math.floor(Math.random() * 10000),
    createdAt: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
    category: category as any,
    lastUpdate: Date.now(),
  }));
}
