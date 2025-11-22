'use client';

import { memo } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { PriceCell } from '@/components/molecules/PriceCell';
import { SortableHeader } from '@/components/molecules/SortableHeader';
import { TokenPopover } from '@/components/molecules/TokenPopover';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { formatNumber, formatRelativeTime } from '@/lib/formatters';
import { openModal } from '@/store/slices/uiSlice';
import { useSortableTable } from '@/hooks/useSortableTable';
import type { Token } from '@/types/token';

interface TokenTableProps {
  tokens: Token[];
}

const TokenRow = memo(function TokenRow({ token }: { token: Token }) {
  const dispatch = useAppDispatch();

  return (
    <tr
      className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
      onClick={() => dispatch(openModal(token.id))}
    >
      <td className="px-4 py-3">
        <TokenPopover token={token}>
          <div className="flex items-center gap-2">
            <div>
              <div className="font-medium text-white">{token.name}</div>
              <div className="text-xs text-gray-400">{token.symbol}</div>
            </div>
          </div>
        </TokenPopover>
      </td>

      <td className="px-4 py-3">
        <PriceCell
          price={token.price}
          priceChange24h={token.priceChange24h}
          lastUpdate={token.lastUpdate}
        />
      </td>

      <td className="px-4 py-3 text-white">
        ${formatNumber(token.volume24h)}
      </td>

      <td className="px-4 py-3 text-white">
        ${formatNumber(token.marketCap)}
      </td>

      <td className="px-4 py-3 text-white">
        ${formatNumber(token.liquidity)}
      </td>

      <td className="px-4 py-3 text-white">
        {token.holders.toLocaleString()}
      </td>

      <td className="px-4 py-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-gray-400 text-sm cursor-help">
                {formatRelativeTime(token.createdAt)}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              {new Date(token.createdAt).toLocaleString()}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </td>
    </tr>
  );
});

export function TokenTable({ tokens }: TokenTableProps) {
  const { sortedTokens, sortConfig, handleSort } = useSortableTable(tokens);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-card border-b border-border">
          <tr className="text-left text-sm text-gray-400">
            <th className="px-4 py-3 font-medium">Token</th>

            <th className="px-4 py-3 font-medium">
              <SortableHeader
                label="Price"
                field="price"
                currentField={sortConfig.field}
                direction={sortConfig.direction}
                onSort={handleSort}
              />
            </th>

            <th className="px-4 py-3 font-medium">
              <SortableHeader
                label="Volume 24h"
                field="volume24h"
                currentField={sortConfig.field}
                direction={sortConfig.direction}
                onSort={handleSort}
              />
            </th>

            <th className="px-4 py-3 font-medium">
              <SortableHeader
                label="Market Cap"
                field="marketCap"
                currentField={sortConfig.field}
                direction={sortConfig.direction}
                onSort={handleSort}
              />
            </th>

            <th className="px-4 py-3 font-medium">
              <SortableHeader
                label="Liquidity"
                field="liquidity"
                currentField={sortConfig.field}
                direction={sortConfig.direction}
                onSort={handleSort}
              />
            </th>

            <th className="px-4 py-3 font-medium">
              <SortableHeader
                label="Holders"
                field="holders"
                currentField={sortConfig.field}
                direction={sortConfig.direction}
                onSort={handleSort}
              />
            </th>

            <th className="px-4 py-3 font-medium">Created</th>
          </tr>
        </thead>

        <tbody>
          {sortedTokens.map((token) => (
            <TokenRow key={token.id} token={token} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
