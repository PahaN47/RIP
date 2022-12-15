import { Product, Selling, SellingProduct } from "../../constant/types";
import { LoadingStatus } from "../const";

export type FullOrder = Partial<Selling> & {
  products: { count: number; product: Product | undefined }[];
};

export type SellingProductPopulated = Omit<SellingProduct, "product_id"> & {
  product: Product;
};

export type OrderState = {
  fullOrderList: FullOrder[];
  loadingStatus: LoadingStatus;
  sellingProductList: SellingProduct[];
  cartItems: SellingProductPopulated[];
  cartSelling?: Selling;
  cartFound: boolean;
};
