import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AsyncThunkConfig } from "..";
import {
  PRODUCT_REQUEST,
  SELLING_PRODUCT_REQUEST,
  SELLING_REQUEST,
} from "../../constant/links";
import { Product, Selling, SellingProduct } from "../../constant/types";
import { ORDER_SLICE } from "../const";
import { FullOrder } from "./order.types";

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

  return Object.entries(sellingId).map(([selling_id, { product_ids }]) => {
    const selling = sellingList.find((value) => value.id === +selling_id);
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
  });
});
