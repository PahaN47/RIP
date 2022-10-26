export type Product = {
  pk?: number;
  name: string;
  price: number;
  rating: number;
  image_url: string;
};

export type Selling = {
  pk?: number;
  customer_id: number;
  status?: string;
  created_date: string;
  canceled_date?: string;
  delivered_date?: string;
};

export type SellingProduct = {
  pk?: number;
  selling_id?: number;
  product_id?: number;
  count: number;
};
