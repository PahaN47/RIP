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
  id,
  name,
  price,
  image_url,
  onClick,
}: ProductItemProps) => {
  return (
    <ProductItemWrapStyled>
      <ProductItemLinkStyled to={`/products/${id}`} onClick={onClick} />
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
