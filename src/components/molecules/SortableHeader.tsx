'use client';

import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils'; // Now actually used below
import type { SortField, SortDirection } from '@/types/token';

interface SortableHeaderProps {
  label: string;
  field: SortField;
  currentField: SortField;
  direction: SortDirection;
  onSort: (field: SortField) => void;
}

export function SortableHeader({
  label,
  field,
  currentField,
  direction,
  onSort,
}: SortableHeaderProps) {
  const isActive = field === currentField;

  return (
    <button
      onClick={() => onSort(field)}
      className={cn(  // ← Now using cn for proper Tailwind merging
        "flex items-center gap-1 px-2 py-1 rounded transition-colors",
        "text-gray-400 hover:text-white",
        {
          "text-white font-medium": isActive,
          "hover:bg-gray-800": !isActive,
        }
      )}
    >
      <span className="cursor-pointer select-none">{label}</span>
      {isActive && (
        direction === 'asc' ? (
          <ArrowUp className="h-3 w-3" />
        ) : (
          <ArrowDown className="h-3 w-3" />
        )
      )}
    </button>
  );
}
