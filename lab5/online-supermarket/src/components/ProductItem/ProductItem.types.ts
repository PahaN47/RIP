import { Product } from "../../constant/types";

export type ProductItemProps = Pick<
  Partial<Product>,
  "id" | "name" | "price" | "image_url"
> & {
  onClick?: () => void;
};
