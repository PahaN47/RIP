import React, { useCallback, useState } from "react";

import { CartItemProps } from "./CartItem.types";

import {
  CartItemAvatarStyled,
  CartItemInputWrapStyled,
  CartItemTitleStyled,
  CartItemTitleWrapStyled,
  CartItemWrapStyled,
  ItemChangeCountStyled,
  ItemCountInputStyled,
  ItemPriceStyled,
  ItemRemoveStyled,
} from "./CartItem.style";
import { useAppDispatch, useAppSelector } from "../../store";
import { addToCart, deleteFromCart } from "../../store/order/order.actions";

export const CartItem = ({ id, product, count }: CartItemProps) => {
  const [newCount, setNewCount] = useState<number>(count);
  const { cartSelling } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  const handleCountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      e.target.value ? setNewCount(parseInt(e.target.value)) : setNewCount(0),
    []
  );

  const handleNewCountClick = useCallback(
    () =>
      void dispatch(
        addToCart({
          cartId: cartSelling?.id ?? -1,
          productId: product.id ?? -1,
          count: newCount,
        })
      ),
    [cartSelling?.id, dispatch, newCount, product.id]
  );

  const handleDeleteClick = useCallback(
    () => void dispatch(deleteFromCart(id ?? -1)),
    [dispatch, id]
  );

  return (
    <CartItemWrapStyled>
      <CartItemTitleWrapStyled>
        <CartItemAvatarStyled>
          <img src={product.image_url} alt="nothing" />
        </CartItemAvatarStyled>
        <CartItemTitleStyled>{product.name}</CartItemTitleStyled>
      </CartItemTitleWrapStyled>
      <CartItemInputWrapStyled>
        <ItemPriceStyled>{product.price} руб.</ItemPriceStyled>
        <ItemCountInputStyled value={newCount} onChange={handleCountChange} />
        <ItemChangeCountStyled onClick={handleNewCountClick} />
        <ItemRemoveStyled onClick={handleDeleteClick} />
      </CartItemInputWrapStyled>
    </CartItemWrapStyled>
  );
};
