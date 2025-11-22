'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { Token } from '@/types/token';
import { cn } from '@/lib/utils';

interface TokenDetailsDialogProps {
  open: boolean;
  token: Token | null;
  onOpenChange: (open: boolean) => void;
}

export function TokenDetailsDialog({
  open,
  token,
  onOpenChange,
}: TokenDetailsDialogProps) {
  if (!token) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            'fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-full max-w-md rounded-2xl border border-slate-700 bg-slate-950/95',
            'shadow-[0_0_40px_rgba(15,23,42,0.9)] p-6 space-y-4'
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <Dialog.Title className="text-lg font-semibold text-white">
              {token.name}{' '}
              <span className="text-slate-400">({token.symbol})</span>
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="p-1 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Description className="text-sm text-slate-300">
            Detailed metrics and recent activity for this token.
          </Dialog.Description>

          <div className="space-y-3 text-sm text-slate-200">
            <div className="flex justify-between">
              <span className="text-slate-400">Price</span>
              <span className="font-mono text-emerald-300">
                ${token.price.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">24h Change</span>
              <span
                className={cn(
                  'font-mono',
                  token.priceChange24h >= 0 ? 'text-emerald-300' : 'text-red-300'
                )}
              >
                {token.priceChange24h >= 0 ? '+' : ''}
                {token.priceChange24h.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Market Cap</span>
              <span className="font-mono text-cyan-300">
                ${token.marketCap.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Liquidity</span>
              <span className="font-mono text-amber-300">
                ${token.liquidity.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Holders</span>
              <span className="font-mono text-slate-100">
                {token.holders.toLocaleString()}
              </span>
            </div>
            <div className="mt-2">
              <span className="block text-slate-400 text-xs mb-1">
                Contract address
              </span>
              <code className="block w-full text-xs font-mono break-all bg-slate-900/80 border border-slate-700 rounded-md px-3 py-2 text-cyan-300">
                {token.address}
              </code>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Dialog.Close asChild>
              <button className="px-4 py-2 text-sm rounded-lg border border-slate-600 text-slate-200 hover:border-slate-300 hover:bg-slate-800">
                Close
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
