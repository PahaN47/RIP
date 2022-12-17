export const APP_LINK = "http://localhost:3000";
export const PRODUCTS_LINK = `/products`;
export const ORDERS_LINK = `/orders`;
export const PRODUCT_LINK = `${APP_LINK}/product`;
export const ORDERS_PRODUCTS_LINK = `${ORDERS_LINK}/product`;
export const CART_LINK = "/cart";
export const LOGIN_LINK = "/login";

export const API_LINK = "http://localhost:8000";
export const PRODUCT_REQUEST = `${API_LINK}/product/`;
export const SELLING_REQUEST = `${API_LINK}/selling/`;
export const SELLING_PRODUCT_REQUEST = `${API_LINK}/selling-product/`;
export const PRODUCT_PRICE_RANGE_REQUEST = `${PRODUCT_REQUEST}price-range`;
export const ADD_TO_CART_REQUEST = `${SELLING_PRODUCT_REQUEST}add-to-cart`;
export const GET_CART_REQUEST = `${SELLING_REQUEST}get-cart`;
export const GET_CART_ITEMS_REQUEST = `${SELLING_PRODUCT_REQUEST}get-cart-items`;
export const DELETE_FROM_CART_REQUEST = `${SELLING_PRODUCT_REQUEST}delete-from-cart`;
export const AUTH_REQUEST = `${API_LINK}/auth/`;
