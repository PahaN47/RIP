import { Product } from "../../constant/types";

export type ProductItemProps = Pick<
  Partial<Product>,
  "pk" | "name" | "price" | "image_url"
>;
