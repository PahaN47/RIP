import React, { useMemo } from "react";
import { ProductItem } from "../../components/ProductItem";
import { PRODUCT_REQUEST } from "../../constant/links";
import { Product } from "../../constant/types";
import { useFetch } from "../../hooks/useFetch";
import { ProductsWrapStyled } from "./ProductsPage.style";

export const ProductsPage = () => {
  const { data } = useFetch<Product[]>(PRODUCT_REQUEST);

  const productItems = useMemo(
    () => data?.map((product) => <ProductItem {...product} />),
    [data]
  );

  return <ProductsWrapStyled>{productItems}</ProductsWrapStyled>;
};
