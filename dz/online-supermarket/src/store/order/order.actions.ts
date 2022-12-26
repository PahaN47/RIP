import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AsyncThunkConfig } from "..";
import {
  ADD_TO_CART_REQUEST,
  AUTH_REQUEST,
  DELETE_FROM_CART_REQUEST,
  GET_CART_ITEMS_REQUEST,
  GET_CART_REQUEST,
  SELLING_PRODUCT_REQUEST,
  SELLING_REQUEST,
} from "../../constant/links";
import {
  Selling,
  SellingProduct,
  SellingStatus,
  UserState,
} from "../../constant/types";
import { getQueryString } from "../../utils/getQueryString";
import { ORDER_SLICE } from "../const";
import {
  FullOrder,
  OrderListFilter,
  SellingProductPopulated,
  UserAuth,
} from "./order.types";

axios.defaults.withCredentials = true;

export const getFullOrderList = createAsyncThunk<
  FullOrder[],
  OrderListFilter | undefined,
  AsyncThunkConfig
>(
  `${ORDER_SLICE}/GET_FULL_LIST`,
  async (filters) =>
    (
      await axios.get(
        `${SELLING_REQUEST}full-order-list?${getQueryString(filters)}`
      )
    ).data as FullOrder[]
);

export const getSellingProductList = createAsyncThunk<
  SellingProduct[],
  undefined,
  AsyncThunkConfig
>(
  `${ORDER_SLICE}/GET_SP_LIST`,
  async () =>
    (await axios.get(SELLING_PRODUCT_REQUEST)).data as SellingProduct[]
);

export const deleteSellingProduct = createAsyncThunk<
  SellingProduct,
  number,
  AsyncThunkConfig
>(
  `${ORDER_SLICE}/DELETE_SP`,
  async (id: number) =>
    (await axios.delete(`${SELLING_PRODUCT_REQUEST}/${id}`))
      .data as SellingProduct
);

export const getCart = createAsyncThunk<Selling, number, AsyncThunkConfig>(
  `${ORDER_SLICE}/GET_CART`,
  async (customerId: number) =>
    (await axios.get(`${GET_CART_REQUEST}/${customerId}`)).data as Selling
);

export const createCart = createAsyncThunk<Selling, number, AsyncThunkConfig>(
  `${ORDER_SLICE}/CREATE_CART`,
  async (customerId: number) =>
    (
      await axios.post(`${SELLING_REQUEST}`, {
        customer_id: customerId,
      })
    ).data as Selling
);

export const addToCart = createAsyncThunk<
  SellingProductPopulated[],
  { cartId: number; productId: number; count?: number },
  AsyncThunkConfig
>(
  `${ORDER_SLICE}/ADD_TO_CART`,
  async ({ cartId, productId, count }) =>
    (
      await axios.post(`${ADD_TO_CART_REQUEST}`, {
        cartId,
        productId,
        count,
      })
    ).data as SellingProductPopulated[]
);

export const getCartItems = createAsyncThunk<
  SellingProductPopulated[],
  number,
  AsyncThunkConfig
>(
  `${ORDER_SLICE}/GET_CART_ITEMS`,
  async (cartId) =>
    (await axios.get(`${GET_CART_ITEMS_REQUEST}/${cartId}`))
      .data as SellingProductPopulated[]
);

export const deleteFromCart = createAsyncThunk<
  SellingProductPopulated[],
  number,
  AsyncThunkConfig
>(
  `${ORDER_SLICE}/DELETE_FROM_CART`,
  async (spId) =>
    (await axios.delete(`${DELETE_FROM_CART_REQUEST}/${spId}`))
      .data as SellingProductPopulated[]
);

export const payForCart = createAsyncThunk<Selling, number, AsyncThunkConfig>(
  `${ORDER_SLICE}/PAY_FOR_CART`,
  async (cartId) =>
    (
      await axios.patch(`${SELLING_REQUEST}${cartId}/`, {
        status: SellingStatus.PAID,
        created_date: new Date().toISOString(),
      })
    ).data as Selling
);

export const confirmSelling = createAsyncThunk<
  Selling,
  number,
  AsyncThunkConfig
>(
  `${ORDER_SLICE}/CONFIRM_SELLING`,
  async (id) =>
    (
      await axios.patch(`${SELLING_REQUEST}${id}/`, {
        status: SellingStatus.DELIVERED,
      })
    ).data as Selling
);

export const rejectSelling = createAsyncThunk<
  Selling,
  number,
  AsyncThunkConfig
>(
  `${ORDER_SLICE}/REJECT_SELLING`,
  async (id) =>
    (
      await axios.patch(`${SELLING_REQUEST}${id}/`, {
        status: SellingStatus.PENDING,
      })
    ).data as Selling
);

export const authLogin = createAsyncThunk<
  UserState,
  UserAuth,
  AsyncThunkConfig
>(`${ORDER_SLICE}/AUTH_LOGIN`, async ({ username, password }, thunkApi) => {
  try {
    const response = await axios.post(`${AUTH_REQUEST}login/`, {
      username,
      password,
    });
    return response?.data as UserState;
  } catch (err) {
    console.log(err);
    return thunkApi.rejectWithValue(err);
  }
});

export const authByCookie = createAsyncThunk<
  UserState,
  undefined,
  AsyncThunkConfig
>(`${ORDER_SLICE}/AUTH_COOKIE`, async (value, thunkApi) => {
  try {
    const response = await axios.post(`${AUTH_REQUEST}login/`);
    return response?.data as UserState;
  } catch (err) {
    console.log(err);
    return thunkApi.rejectWithValue(err);
  }
});

export const authRegister = createAsyncThunk<
  UserState,
  UserAuth,
  AsyncThunkConfig
>(`${ORDER_SLICE}/AUTH_REGISTER`, async ({ username, password }, thunkApi) => {
  try {
    const response = await axios.post(`${AUTH_REQUEST}create/`, {
      username,
      password,
    });
    return response?.data as UserState;
  } catch (err) {
    console.log(err);
    return thunkApi.rejectWithValue(err);
  }
});

export const authLogout = createAsyncThunk<
  undefined,
  undefined,
  AsyncThunkConfig
>(`${ORDER_SLICE}/AUTH_LOGOUT`, async (value, thunkApi) => {
  try {
    await axios.post(`${AUTH_REQUEST}logout/`);
  } catch (err) {
    console.log(err);
    return thunkApi.rejectWithValue(err);
  }
});
