import React, { useState } from "react";
import { PRODUCTS_LINK, PRODUCT_LINK } from "../../constant/links";
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
      <ProductItemLinkStyled href={`${PRODUCTS_LINK}/${pk}`} />
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
