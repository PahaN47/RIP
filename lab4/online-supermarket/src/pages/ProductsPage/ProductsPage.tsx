import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { ProductItem } from "../../components/ProductItem";
import { PRODUCTS_LINK, PRODUCT_REQUEST } from "../../constant/links";
import { Product } from "../../constant/types";
import { useFetch } from "../../hooks/useFetch";
import { ProductsWrapStyled } from "./ProductsPage.style";

export const ProductsPage = () => {
  const { data } = useFetch<Product[]>(PRODUCT_REQUEST);

  const [selectedProduct, setSelectedProduct] = useState<number>();
  const makeHandleClick = useCallback(
    (index?: number) => () => {
      setSelectedProduct(index);
    },
    [setSelectedProduct]
  );

  const { data: prdata, fetchData } = useFetch<Product>(
    `${PRODUCT_REQUEST}${selectedProduct}/`
  );

  useEffect(
    () => fetchData(`${PRODUCT_REQUEST}${selectedProduct}/`),
    [selectedProduct]
  );

  const productItems = useMemo(
    () =>
      data?.map(
        (product) =>
          product && (
            <li>
              <button onClick={makeHandleClick(product.pk)}>
                {product?.name}
              </button>
            </li>
          )
      ),
    [data]
  );

  useEffect(() => console.log({ prdata, selectedProduct }));

  return (
    <ProductsWrapStyled>
      <ul>{productItems}</ul>
      {!(prdata as any)?.detail && <ProductItem {...prdata} />}
    </ProductsWrapStyled>
  );
};
