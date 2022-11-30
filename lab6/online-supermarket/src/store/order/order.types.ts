import { Product, Selling } from "../../constant/types";
import { LoadingStatus } from "../const";

export type FullOrder = Partial<Selling> & {
  products: { count: number; product: Product | undefined }[];
};

export type OrderState = {
  fullOrderList: FullOrder[];
  loadingStatus: LoadingStatus;
};
