import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import uiReducer from "./slices/uiSlice";
import tokenReducer from "./slices/tokenSlice";
import { tokenApi } from "./api/tokenApi";

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      ui: uiReducer,
      tokens: tokenReducer,
      [tokenApi.reducerPath]: tokenApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tokenApi.middleware),
  });
  
  setupListeners(store.dispatch);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
