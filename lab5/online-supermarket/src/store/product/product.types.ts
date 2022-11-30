import { Product } from "../../constant/types";
import { LoadingStatus } from "../const";

export type ProductState = {
  loadingStatus: LoadingStatus;
  product?: Product;
  productList: Product[];
};
