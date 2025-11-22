'use client';

import { memo, useEffect, useState } from 'react';
import { formatPrice, formatPercentage } from '@/lib/formatters';
import { cn } from '@/lib/utils';

interface PriceCellProps {
  price: number;
  priceChange24h: number;
  lastUpdate: number;
}

export const PriceCell = memo(function PriceCell({
  price,
  priceChange24h,
  lastUpdate,
}: PriceCellProps) {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (priceChange24h > 0) {
      setAnimationClass('animate-price-up');
    } else if (priceChange24h < 0) {
      setAnimationClass('animate-price-down');
    }

    const timeout = setTimeout(() => setAnimationClass(''), 500);
    return () => clearTimeout(timeout);
  }, [lastUpdate]);

  const isPositive = priceChange24h >= 0;

  return (
    <div className={cn('flex flex-col gap-1', animationClass)}>
      <span className="font-medium text-white">{formatPrice(price)}</span>
      <span
        className={cn('text-xs font-medium', {
          'text-success': isPositive,
          'text-danger': !isPositive,
        })}
      >
        {formatPercentage(priceChange24h)}
      </span>
    </div>
  );
});
