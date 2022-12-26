import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ProductItem } from "../../components/ProductItem";
import { ProductsFilters } from "../../components/ProductsFilters";
import { useAppDispatch, useAppSelector } from "../../store";
import { resetProduct, setProduct } from "../../store/product";
import {
  getPriceRange,
  getProductList,
} from "../../store/product/product.actions";
import { CreateProductButton, ProductsWrapStyled } from "./ProductsPage.style";

export const ProductsPage = () => {
  const { topPrice, bottomPrice } = useAppSelector(
    (state) => state.product.priceRange
  );

  const { productList, product } = useAppSelector((state) => state.product);
  const { user } = useAppSelector((state) => state.order);
  const [maxPrice, setMaxPrice] = useState(-1);
  const [minPrice, setMinPrice] = useState(-1);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();

  const query = useMemo(() => {
    return {
      minPrice: minPrice > 0 && minPrice !== bottomPrice ? minPrice : undefined,
      maxPrice: maxPrice > 0 && minPrice !== topPrice ? maxPrice : undefined,
      name: searchValue || undefined,
    };
  }, [bottomPrice, maxPrice, minPrice, searchValue, topPrice]);

  useEffect(() => {
    if (topPrice > 0 && bottomPrice > 0) {
      setMaxPrice(topPrice);
      setMinPrice(bottomPrice);
    } else dispatch(getPriceRange());
  }, [bottomPrice, dispatch, topPrice]);

  const productItems = useMemo(
    () =>
      productList?.map(
        (product) =>
          product && (
            <ProductItem
              {...product}
              onClick={() => {
                if (product) dispatch(setProduct(product));
              }}
            />
          )
      ),
    [dispatch, productList]
  );

  useEffect(() => {
    void dispatch(getProductList());
  }, [product]);

  const handleSearch = useCallback(
    () => void dispatch(getProductList(query)),
    [dispatch, query]
  );

  const onCreateClick = useCallback(() => {
    dispatch(resetProduct());
  }, [dispatch]);

  return (
    <ProductsWrapStyled>
      <ProductsFilters
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        topPrice={topPrice}
        bottomPrice={bottomPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        handleSearch={handleSearch}
      />
      {user?.is_staff && (
        <CreateProductButton
          to="/products/create"
          onClick={onCreateClick}
          state={{ isCreate: true }}
        >
          Создать
        </CreateProductButton>
      )}
      {productItems}
    </ProductsWrapStyled>
  );
};
