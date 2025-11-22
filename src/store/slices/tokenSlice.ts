import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Token } from "@/types/token";

interface TokenState {
  tokens: Record<string, Token>;
  priceHistory: Record<string, number[]>;
}

const initialState: TokenState = {
  tokens: {},
  priceHistory: {},
};

const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      action.payload.forEach((token) => {
        state.tokens[token.id] = token;
        if (!state.priceHistory[token.id]) {
          state.priceHistory[token.id] = [token.price];
        }
      });
    },
    updateTokenPrice: (
      state,
      action: PayloadAction<{ tokenId: string; price: number }>
    ) => {
      const { tokenId, price } = action.payload;
      if (state.tokens[tokenId]) {
        const oldPrice = state.tokens[tokenId].price;
        state.tokens[tokenId].price = price;
        state.tokens[tokenId].priceChange24h =
          ((price - oldPrice) / oldPrice) * 100;
        state.tokens[tokenId].lastUpdate = Date.now();

        state.priceHistory[tokenId] = [
          ...(state.priceHistory[tokenId] || []),
          price,
        ].slice(-20);
      }
    },
  },
});

export const { setTokens, updateTokenPrice } = tokenSlice.actions;
export default tokenSlice.reducer;
