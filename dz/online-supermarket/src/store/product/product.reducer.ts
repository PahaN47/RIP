import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../constant/types";
import { LoadingStatus, PRODUCT_SLICE } from "../const";
import {
  deleteProduct,
  getPriceRange,
  getProduct,
  getProductList,
  patchProduct,
  postProduct,
} from "./product.actions";
import { ProductState } from "./product.types";

const initialState: ProductState = {
  product: undefined,
  loadingStatus: LoadingStatus.IDLE,
  productList: [],
  priceRange: {
    topPrice: -1,
    bottomPrice: -1,
  },
  isCreateProduct: false,
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
    });
    builder.addCase(getPriceRange.pending, (state) => {
      state.loadingStatus = LoadingStatus.PENDING;
    });
    builder.addCase(getPriceRange.fulfilled, (state, { payload }) => {
      state.loadingStatus = LoadingStatus.FULFILLED;
      state.priceRange = payload;
    });
    builder.addCase(getPriceRange.rejected, (state) => {
      state.loadingStatus = LoadingStatus.REJECTED;
    });
    builder.addCase(postProduct.pending, (state) => {
      state.loadingStatus = LoadingStatus.PENDING;
    });
    builder.addCase(postProduct.fulfilled, (state, { payload }) => {
      state.loadingStatus = LoadingStatus.FULFILLED;
      state.product = payload;
    });
    builder.addCase(postProduct.rejected, (state) => {
      state.loadingStatus = LoadingStatus.REJECTED;
    });
    builder.addCase(patchProduct.pending, (state) => {
      state.loadingStatus = LoadingStatus.PENDING;
    });
    builder.addCase(patchProduct.fulfilled, (state, { payload }) => {
      state.loadingStatus = LoadingStatus.FULFILLED;
      state.product = payload;
    });
    builder.addCase(patchProduct.rejected, (state) => {
      state.loadingStatus = LoadingStatus.REJECTED;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.loadingStatus = LoadingStatus.PENDING;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.loadingStatus = LoadingStatus.FULFILLED;
      state.product = undefined;
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.loadingStatus = LoadingStatus.REJECTED;
    });
  },
});

export default productSlice.reducer;

export const { setProduct, resetProduct, resetProductList } =
  productSlice.actions;
