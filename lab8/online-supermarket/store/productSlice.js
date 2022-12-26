import { createSlice } from "@reduxjs/toolkit";
import { deleteProduct, patchProduct, postProduct } from "./productActions";

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
      state.product = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postProduct.fulfilled, (state, { payload }) => {
      state.product = payload;
    });
    builder.addCase(patchProduct.fulfilled, (state, { payload }) => {
      state.product = { ...payload };
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.product = undefined;
    });
  },
});

export const productReducer = productSlice.reducer;

export const { setProductList, setProduct, resetProduct } =
  productSlice.actions;
