import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { PRODUCT_REQUEST } from "../../constant/links";
import { Product } from "../../constant/types";
import { useFetch } from "../../hooks/useFetch";
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

export const ProductPage = () => {
  const location = useLocation();

  const { data } = useFetch<Product>(
    `${PRODUCT_REQUEST}${location.pathname.split("/")[2]}/`
  );

  const stars = useMemo(() => {
    const arr1 = new Array(data?.rating ?? 0).fill(1);
    const arr2 = new Array(5 - (data?.rating ?? 0)).fill(1);
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
  }, [data]);

  return (
    <ProductWrapStyled>
      <ProductImageWrapStyled>
        <img src={data?.image_url} alt="Nothing" />
      </ProductImageWrapStyled>
      <ProductDescWrapStyled>
        <FlexWrapStyled>
          <ProductTitleWrapStyled>{data?.name}</ProductTitleWrapStyled>
          <ProductRatingWrapStyled>Рейтинг: {stars}</ProductRatingWrapStyled>
        </FlexWrapStyled>
        <FlexWrapStyled>
          <ProductPriceTag>{data?.price} руб.</ProductPriceTag>
          <AddProductButton>Добавить в корзину</AddProductButton>
        </FlexWrapStyled>
      </ProductDescWrapStyled>
    </ProductWrapStyled>
  );
};
