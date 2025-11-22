'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { updateTokenPrice } from '@/store/slices/tokenSlice';
import type { Token } from '@/types/token';

export function useWebSocket(tokens: Token[]) {
  const dispatch = useAppDispatch();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const tokensRef = useRef<Token[]>(tokens);

  // Update ref without triggering effect
  useEffect(() => {
    tokensRef.current = tokens;
  }, [tokens]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const currentTokens = tokensRef.current;
      if (currentTokens.length === 0) return;

      const randomToken = currentTokens[Math.floor(Math.random() * currentTokens.length)];
      const changePercent = (Math.random() - 0.5) * 10;
      const newPrice = randomToken.price * (1 + changePercent / 100);

      dispatch(updateTokenPrice({ tokenId: randomToken.id, price: newPrice }));
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [dispatch]); // Only dispatch in dependency array

  return null;
}
