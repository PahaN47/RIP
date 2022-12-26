import { Product } from "../../constant/types";
import { LoadingStatus } from "../const";

export type PriceRange = {
  topPrice: number;
  bottomPrice: number;
};

export type ProductState = {
  loadingStatus: LoadingStatus;
  product?: Product;
  productList: Product[];
  priceRange: PriceRange;
  isCreateProduct: boolean;
};
