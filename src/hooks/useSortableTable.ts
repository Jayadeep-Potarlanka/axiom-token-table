import { useMemo, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import type { Token, SortField } from "@/types/token";
import { setSortConfig } from "@/store/slices/uiSlice";

export function useSortableTable(tokens: Token[]) {
  const dispatch = useAppDispatch();
  const { sortConfig, searchQuery } = useAppSelector((state) => state.ui);

  const sortedTokens = useMemo(() => {
    let filtered = [...tokens];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (token) =>
          token.name.toLowerCase().includes(query) ||
          token.symbol.toLowerCase().includes(query) ||
          token.address.toLowerCase().includes(query)
      );
    }

    filtered.sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      const aString = String(aValue);
      const bString = String(bValue);
      return sortConfig.direction === "asc"
        ? aString.localeCompare(bString)
        : bString.localeCompare(aString);
    });

    return filtered;
  }, [tokens, sortConfig, searchQuery]);

  const handleSort = useCallback(
    (field: SortField) => {
      const direction =
        sortConfig.field === field && sortConfig.direction === "asc"
          ? "desc"
          : "asc";
      dispatch(setSortConfig({ field, direction }));
    },
    [sortConfig, dispatch]
  );

  return { sortedTokens, sortConfig, handleSort };
}
