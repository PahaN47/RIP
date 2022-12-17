import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AsyncThunkConfig } from "..";
import {
  ADD_TO_CART_REQUEST,
  AUTH_REQUEST,
  DELETE_FROM_CART_REQUEST,
  GET_CART_ITEMS_REQUEST,
  GET_CART_REQUEST,
  PRODUCT_REQUEST,
  SELLING_PRODUCT_REQUEST,
  SELLING_REQUEST,
} from "../../constant/links";
import {
  Product,
  Selling,
  SellingProduct,
  SellingStatus,
  UserState,
} from "../../constant/types";
import { ORDER_SLICE } from "../const";
import { FullOrder, SellingProductPopulated, UserAuth } from "./order.types";

axios.defaults.withCredentials = true;

export const getFullOrderList = createAsyncThunk<
  FullOrder[],
  undefined,
  AsyncThunkConfig
>(`${ORDER_SLICE}/GET_FULL_LIST`, async () => {
  const spList = (await axios.get(SELLING_PRODUCT_REQUEST))
    .data as SellingProduct[];
  console.log(spList);
  const sellingList = (await axios.get(SELLING_REQUEST)).data as Selling[];
  const productList = (await axios.get(PRODUCT_REQUEST)).data as Product[];
  const sellingId: {
    [key in number]: {
      product_ids: { count: number; product_id: number }[];
    };
  } = {};

  spList.forEach(({ selling_id, product_id, count }) => {
    if (selling_id) {
      if (!sellingId[selling_id]) sellingId[selling_id] = { product_ids: [] };
      if (product_id)
        sellingId[selling_id].product_ids.push({ count, product_id });
    }
  });

  return Object.entries(sellingId)
    .map(([selling_id, { product_ids }]) => {
      const selling = sellingList.find((value) => value.id === +selling_id);
      if (!selling) return undefined;
      const products = product_ids.map(({ product_id, count }) => {
        return {
          product: productList.find((value) => value.id === +product_id),
          count,
        };
      });
      return {
        ...selling,
        products,
      };
    })
    .filter((item) => item) as FullOrder[];
});

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

export const payForCart = createAsyncThunk<undefined, number, AsyncThunkConfig>(
  `${ORDER_SLICE}/PAY_FOR_CART`,
  async (cartId) =>
    axios.patch(`${SELLING_REQUEST}${cartId}/`, {
      status: SellingStatus.PAID,
    })
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
