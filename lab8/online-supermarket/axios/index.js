import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://192.168.13.17:8000",
});
