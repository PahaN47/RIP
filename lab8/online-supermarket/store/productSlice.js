import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  product: {},
};

export const productSlice = createSlice({
  name: "PRODUCT",
  initialState,
  reducers: {
    setProductList: (state, { payload }) => {
      state.productList = payload;
    },
    setProduct: (state, { payload }) => {
      state.product = payload;
    },
    resetProduct: (state) => {
      state.product = {};
    },
  },
});

export const productReducer = productSlice.reducer;

export const { setProductList, setProduct, resetProduct } =
  productSlice.actions;
