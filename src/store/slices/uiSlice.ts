import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SortConfig, TokenCategory } from "@/types/token";

interface UIState {
  selectedCategory: TokenCategory | "all";
  sortConfig: SortConfig;
  searchQuery: string;
  selectedTokenId: string | null;
  isModalOpen: boolean;
}

const initialState: UIState = {
  selectedCategory: "all",
  sortConfig: { field: "marketCap", direction: "desc" },
  searchQuery: "",
  selectedTokenId: null,
  isModalOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<TokenCategory | "all">) => {
      state.selectedCategory = action.payload;
    },
    setSortConfig: (state, action: PayloadAction<SortConfig>) => {
      state.sortConfig = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.selectedTokenId = action.payload;
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.selectedTokenId = null;
    },
  },
});

export const { setCategory, setSortConfig, setSearchQuery, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
