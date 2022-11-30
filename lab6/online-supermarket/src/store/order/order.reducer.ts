import { createSlice } from "@reduxjs/toolkit";
import { LoadingStatus, ORDER_SLICE } from "../const";
import { getFullOrderList } from "./order.actions";
import { OrderState } from "./order.types";

const initialState: OrderState = {
  fullOrderList: [],
  loadingStatus: LoadingStatus.IDLE,
};

export const productSlice = createSlice({
  name: ORDER_SLICE,
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.loadingStatus = LoadingStatus.IDLE;
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
      state.fullOrderList = [];
    });
  },
});

export default productSlice.reducer;

export const { resetOrder } = productSlice.actions;
