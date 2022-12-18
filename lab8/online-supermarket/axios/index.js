import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://192.168.1.86:8000",
});
