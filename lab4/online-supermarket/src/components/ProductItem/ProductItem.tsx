import React from "react";
import { PRODUCT_LINK } from "../../constant/links";
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
      <ProductItemLinkStyled href={`${PRODUCT_LINK}/${pk}`} />
      <ProductItemImageWrapStyled>
        <img src={image_url} alt="Nothing" />
      </ProductItemImageWrapStyled>
      <ProductItemNameWrapStyled>
        {name}
        <ProductItemPriceTag>{price}</ProductItemPriceTag>
      </ProductItemNameWrapStyled>
    </ProductItemWrapStyled>
  );
};
