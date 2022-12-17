export enum SellingStatus {
  PENDING = "pending",
  PAID = "paid",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}

export type Product = {
  id?: number;
  name: string;
  price: number;
  rating: number;
  image_url: string;
};

export type Selling = {
  id?: number;
  customer_id: number;
  status?: SellingStatus;
  created_date: string;
  canceled_date?: string;
  delivered_date?: string;
};

export type SellingProduct = {
  id?: number;
  selling_id?: number;
  product_id?: number;
  count: number;
};

export type ProductQueryParams = {
  min_price?: number;
  max_price?: number;
  name?: string;
};

export type UserState = {
  id: number;
  username: string;
};
