import React, { useEffect, useMemo } from "react";
import {
  AddProductButton,
  FlexWrapStyled,
  ProductDescWrapStyled,
  ProductImageWrapStyled,
  ProductPriceTag,
  ProductRatingWrapStyled,
  ProductTitleWrapStyled,
  ProductWrapStyled,
  StarStyled,
} from "./ProductPage.style";
import star from "../../assets/star.png";
import { useAppDispatch, useAppSelector } from "../../store";
import { useLocation } from "react-router";
import { getProduct } from "../../store/product/product.actions";

export const ProductPage = () => {
  const { product } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!product) {
      dispatch(getProduct(+pathname.slice(pathname.lastIndexOf("/") + 1)));
    }
  }, []);

  const stars = useMemo(() => {
    const arr1 = new Array(product?.rating ?? 0).fill(1);
    const arr2 = new Array(5 - (product?.rating ?? 0)).fill(1);
    return (
      <>
        {arr1.map(() => (
          <StarStyled src={star} />
        ))}
        {arr2.map(() => (
          <StarStyled fade src={star} />
        ))}
      </>
    );
  }, [product]);

  return (
    <ProductWrapStyled>
      <ProductImageWrapStyled>
        <img src={product?.image_url} alt="Nothing" />
      </ProductImageWrapStyled>
      <ProductDescWrapStyled>
        <FlexWrapStyled>
          <ProductTitleWrapStyled>{product?.name}</ProductTitleWrapStyled>
          <ProductRatingWrapStyled>Рейтинг: {stars}</ProductRatingWrapStyled>
        </FlexWrapStyled>
        <FlexWrapStyled>
          <ProductPriceTag>{product?.price} руб.</ProductPriceTag>
          <AddProductButton>Добавить в корзину</AddProductButton>
        </FlexWrapStyled>
      </ProductDescWrapStyled>
    </ProductWrapStyled>
  );
};
