import React from "react";
import {
  ProductItemImageWrapStyled,
  ProductItemLinkStyled,
  ProductItemNameWrapStyled,
  ProductItemPriceTag,
  ProductItemWrapStyled,
} from "./ProductItem.style";
import { ProductItemProps } from "./ProductItem.types";

export const ProductItem = ({
  pk,
  name,
  price,
  image_url,
}: ProductItemProps) => {
  return (
    <ProductItemWrapStyled>
      <ProductItemLinkStyled to={`/products/${pk}`} />
      <ProductItemImageWrapStyled>
        <img src={image_url} alt="Nothing" />
      </ProductItemImageWrapStyled>
      <ProductItemNameWrapStyled>
        {name}
        <ProductItemPriceTag>{price}р.</ProductItemPriceTag>
      </ProductItemNameWrapStyled>
    </ProductItemWrapStyled>
  );
};
