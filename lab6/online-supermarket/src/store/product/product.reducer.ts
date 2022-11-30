import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../constant/types";
import { LoadingStatus, PRODUCT_SLICE } from "../const";
import { getProduct, getProductList } from "./product.actions";
import { ProductState } from "./product.types";

const initialState: ProductState = {
  product: undefined,
  loadingStatus: LoadingStatus.IDLE,
  productList: [],
};

export const productSlice = createSlice({
  name: PRODUCT_SLICE,
  initialState,
  reducers: {
    setProduct: (state, { payload }: PayloadAction<Product>) => {
      state.product = payload;
    },
    resetProduct: (state) => {
      state.loadingStatus = LoadingStatus.IDLE;
      state.product = undefined;
    },
    resetProductList: (state) => {
      state.loadingStatus = LoadingStatus.IDLE;
      state.productList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.loadingStatus = LoadingStatus.PENDING;
    });
    builder.addCase(getProduct.fulfilled, (state, { payload }) => {
      state.loadingStatus = LoadingStatus.FULFILLED;
      state.product = payload;
    });
    builder.addCase(getProduct.rejected, (state) => {
      state.loadingStatus = LoadingStatus.REJECTED;
      state.product = undefined;
    });
    builder.addCase(getProductList.pending, (state) => {
      state.loadingStatus = LoadingStatus.PENDING;
    });
    builder.addCase(getProductList.fulfilled, (state, { payload }) => {
      state.loadingStatus = LoadingStatus.FULFILLED;
      state.productList = payload;
    });
    builder.addCase(getProductList.rejected, (state) => {
      state.loadingStatus = LoadingStatus.REJECTED;
      state.productList = [];
    });
  },
});

export default productSlice.reducer;

export const { setProduct, resetProduct, resetProductList } =
  productSlice.actions;
