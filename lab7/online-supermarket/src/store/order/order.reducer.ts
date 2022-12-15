import { createSlice } from "@reduxjs/toolkit";
import { LoadingStatus, ORDER_SLICE } from "../const";
import {
  addToCart,
  createCart,
  deleteFromCart,
  deleteSellingProduct,
  getCart,
  getCartItems,
  getFullOrderList,
  getSellingProductList,
  payForCart,
} from "./order.actions";
import { OrderState } from "./order.types";

const initialState: OrderState = {
  fullOrderList: [],
  loadingStatus: LoadingStatus.IDLE,
  sellingProductList: [],
  cartItems: [],
  cartSelling: undefined,
  cartFound: true,
};

export const productSlice = createSlice({
  name: ORDER_SLICE,
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.fullOrderList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFullOrderList.pending, (state) => {
      state.loadingStatus = LoadingStatus.PENDING;
    });
    builder.addCase(getFullOrderList.fulfilled, (state, { payload }) => {
      state.loadingStatus = LoadingStatus.FULFILLED;
      state.fullOrderList = payload;
    });
    builder.addCase(getFullOrderList.rejected, (state) => {
      state.loadingStatus = LoadingStatus.REJECTED;
    });
    builder.addCase(getSellingProductList.pending, (state) => {
      state.loadingStatus = LoadingStatus.PENDING;
    });
    builder.addCase(getSellingProductList.fulfilled, (state, { payload }) => {
      state.loadingStatus = LoadingStatus.FULFILLED;
      state.sellingProductList = payload;
    });
    builder.addCase(getSellingProductList.rejected, (state) => {
      state.loadingStatus = LoadingStatus.REJECTED;
    });
    builder.addCase(deleteSellingProduct.pending, (state) => {
      state.loadingStatus = LoadingStatus.PENDING;
    });
    builder.addCase(deleteSellingProduct.fulfilled, (state, { payload }) => {
      state.loadingStatus = LoadingStatus.FULFILLED;
      state.sellingProductList = state.sellingProductList.filter(
        (sp) => sp.id && sp.id !== payload.id
      );
    });
    builder.addCase(deleteSellingProduct.rejected, (state) => {
      state.loadingStatus = LoadingStatus.REJECTED;
    });
    builder.addCase(createCart.pending, (state) => {
      state.loadingStatus = LoadingStatus.PENDING;
    });
    builder.addCase(createCart.fulfilled, (state, { payload }) => {
      state.loadingStatus = LoadingStatus.FULFILLED;
      state.cartSelling = payload;
      state.cartFound = true;
    });
    builder.addCase(createCart.rejected, (state) => {
      state.loadingStatus = LoadingStatus.REJECTED;
    });
    builder.addCase(getCart.pending, (state) => {
      state.loadingStatus = LoadingStatus.PENDING;
    });
    builder.addCase(getCart.fulfilled, (state, { payload }) => {
      state.loadingStatus = LoadingStatus.FULFILLED;
      state.cartSelling = payload;
      state.cartFound = true;
    });
    builder.addCase(getCart.rejected, (state) => {
      state.loadingStatus = LoadingStatus.REJECTED;
      state.cartFound = false;
    });
    builder.addCase(addToCart.pending, (state) => {
      state.loadingStatus = LoadingStatus.PENDING;
    });
    builder.addCase(addToCart.fulfilled, (state, { payload }) => {
      state.loadingStatus = LoadingStatus.FULFILLED;
      state.cartItems = payload;
    });
    builder.addCase(addToCart.rejected, (state) => {
      state.loadingStatus = LoadingStatus.REJECTED;
    });
    builder.addCase(getCartItems.pending, (state) => {
      state.loadingStatus = LoadingStatus.PENDING;
    });
    builder.addCase(getCartItems.fulfilled, (state, { payload }) => {
      state.loadingStatus = LoadingStatus.FULFILLED;
      state.cartItems = payload;
    });
    builder.addCase(getCartItems.rejected, (state) => {
      state.loadingStatus = LoadingStatus.REJECTED;
    });
    builder.addCase(deleteFromCart.pending, (state) => {
      state.loadingStatus = LoadingStatus.PENDING;
    });
    builder.addCase(deleteFromCart.fulfilled, (state, { payload }) => {
      state.loadingStatus = LoadingStatus.FULFILLED;
      state.cartItems = payload;
    });
    builder.addCase(deleteFromCart.rejected, (state) => {
      state.loadingStatus = LoadingStatus.REJECTED;
    });
    builder.addCase(payForCart.pending, (state) => {
      state.loadingStatus = LoadingStatus.PENDING;
    });
    builder.addCase(payForCart.fulfilled, (state, { payload }) => {
      state.loadingStatus = LoadingStatus.FULFILLED;
      state.cartItems = [];
      state.cartSelling = undefined;
      state.cartFound = false;
    });
    builder.addCase(payForCart.rejected, (state) => {
      state.loadingStatus = LoadingStatus.REJECTED;
    });
  },
});

export default productSlice.reducer;

export const { resetOrder } = productSlice.actions;
