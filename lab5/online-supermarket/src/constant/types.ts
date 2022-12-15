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
  status?: string;
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
