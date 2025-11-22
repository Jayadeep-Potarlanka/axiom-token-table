import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Token, TokenListResponse, TokenCategory } from "@/types/token";
import { generateMockTokens } from "@/lib/mockData";

export const tokenApi = createApi({
  reducerPath: "tokenApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Token"], // Add caching tags
  endpoints: (builder) => ({
    getTokens: builder.query<TokenListResponse, { category?: TokenCategory }>({
      queryFn: async ({ category }) => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Filter by category if provided, otherwise get all
        const tokens = category 
          ? generateMockTokens(15, category) // Uses TokenCategory
          : [
              ...generateMockTokens(5, "new"),
              ...generateMockTokens(5, "final"),
              ...generateMockTokens(5, "migrated"),
            ];
        
        // Use Token type here for type safety
        const typedTokens: Token[] = tokens;
        
        return { 
          data: { 
            tokens: typedTokens, 
            total: typedTokens.length 
          } 
        };
      },
      providesTags: ["Token"], // Caching tag
    }),
  }),
});

export const { useGetTokensQuery } = tokenApi;
