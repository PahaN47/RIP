import React, { useCallback, useEffect, useMemo } from "react";
import { ProductItem } from "../../components/ProductItem";
import { useAppDispatch, useAppSelector } from "../../store";
import { setProduct } from "../../store/product";
import { getProductList } from "../../store/product/product.actions";
import { ProductsWrapStyled } from "./ProductsPage.style";

export const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { product, productList } = useAppSelector((state) => state.product);

  const makeHandleClick = useCallback(
    (index?: number) => () => {
      index && void dispatch(setProduct(productList[index - 1]));
    },
    [dispatch, productList]
  );

  const productItems = useMemo(
    () =>
      productList?.map(
        (product) =>
          product && (
            <li>
              <button onClick={makeHandleClick(product.id)}>
                {product?.name}
              </button>
            </li>
          )
      ),
    [productList, makeHandleClick]
  );

  useEffect(() => {
    if (!productList.length) void dispatch(getProductList());
  }, [productList.length, dispatch]);

  return (
    <ProductsWrapStyled>
      <ul>{productItems}</ul>
      {product && <ProductItem {...product} />}
    </ProductsWrapStyled>
  );
};
