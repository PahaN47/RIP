import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import ProductReducer from "./product/product.reducer";
import OrderReducer from "./order/order.reducer";

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      product: ProductReducer,
      order: OrderReducer,
    },
  });

  return store;
};

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AsyncThunkConfig = {
  dispatch: AppDispatch;
  state: RootState;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
