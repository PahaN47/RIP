import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AsyncThunkConfig } from "..";
import { PRODUCT_REQUEST } from "../../constant/links";
import { Product } from "../../constant/types";
import { PRODUCT_SLICE } from "../const";

export const getProduct = createAsyncThunk<Product, number, AsyncThunkConfig>(
  `${PRODUCT_SLICE}/GET`,
  async (id) =>
    (await (
      await axios.get(`${PRODUCT_REQUEST}${id}/`)
    ).data) as Product
);

export const getProductList = createAsyncThunk<
  Product[],
  undefined,
  AsyncThunkConfig
>(
  `${PRODUCT_SLICE}/GET_LIST`,
  async () => (await (await axios.get(`${PRODUCT_REQUEST}`)).data) as Product[]
);
