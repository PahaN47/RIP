import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../axios";
import { Alert } from "react-native";

export const postProduct = createAsyncThunk(
  "PRODUCT/POST",
  async ({ name, price, rating, image_url }) => {
    try {
      return (
        await axiosInstance.post(`/product/`, {
          name,
          price,
          rating,
          image_url,
        })
      ).data;
    } catch (err) {
      Alert.alert(err);
    }
  }
);

export const patchProduct = createAsyncThunk(
  "PRODUCT/PATCH",
  async ({ id, name, price, rating, image_url }) => {
    try {
      return (
        await axiosInstance.patch(`/product/${id}/`, {
          name,
          price,
          rating,
          image_url,
        })
      ).data;
    } catch (err) {
      Alert.alert(err);
    }
  }
);

export const deleteProduct = createAsyncThunk("PRODUCT/DELETE", async (id) => {
  try {
    return (await axiosInstance.delete(`/product/${id}/`)).data;
  } catch (err) {
    Alert.alert(err);
  }
});
