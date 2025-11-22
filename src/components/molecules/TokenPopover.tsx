'use client';

import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { formatNumber, formatAddress } from '@/lib/formatters';
import type { Token } from '@/types/token';

interface TokenPopoverProps {
  token: Token;
  children: React.ReactNode;
}

export function TokenPopover({ token, children }: TokenPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-white text-lg">{token.name}</h3>
            <p className="text-sm text-gray-400">{token.symbol}</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Address:</span>
              <span className="text-white font-mono">{formatAddress(token.address)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Market Cap:</span>
              <span className="text-white">${formatNumber(token.marketCap)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Liquidity:</span>
              <span className="text-white">${formatNumber(token.liquidity)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Holders:</span>
              <span className="text-white">{token.holders.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Volume 24h:</span>
              <span className="text-white">${formatNumber(token.volume24h)}</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
