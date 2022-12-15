import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AsyncThunkConfig } from "..";
import {
  PRODUCT_PRICE_RANGE_REQUEST,
  PRODUCT_REQUEST,
} from "../../constant/links";
import { Product, ProductQueryParams } from "../../constant/types";
import { getQueryString } from "../../utils/getQueryString";
import { PRODUCT_SLICE } from "../const";
import { PriceRange } from "./product.types";

export const getProduct = createAsyncThunk<Product, number, AsyncThunkConfig>(
  `${PRODUCT_SLICE}/GET`,
  async (id) =>
    (await (
      await axios.get(`${PRODUCT_REQUEST}${id}/`)
    ).data) as Product
);

export const getProductList = createAsyncThunk<
  Product[],
  ProductQueryParams | undefined,
  AsyncThunkConfig
>(
  `${PRODUCT_SLICE}/GET_LIST`,
  async (filters) =>
    (await axios.get(`${PRODUCT_REQUEST}?${getQueryString(filters)}`))
      .data as Product[]
);

export const getPriceRange = createAsyncThunk<
  PriceRange,
  undefined,
  AsyncThunkConfig
>(
  `${PRODUCT_SLICE}/GET_PRICE_RANGE`,
  async () => (await axios.get(PRODUCT_PRICE_RANGE_REQUEST)).data as PriceRange
);
