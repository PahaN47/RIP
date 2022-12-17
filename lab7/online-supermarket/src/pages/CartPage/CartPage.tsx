import React, { useCallback, useEffect, useMemo } from "react";
import { CartItem } from "../../components/CartItem";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  getCart,
  getCartItems,
  payForCart,
} from "../../store/order/order.actions";
import { CartPageStyled, PayButtonStyled } from "./CartPage.style";

import "./CartPage.style.ts";

export const CartPage = () => {
  const { cartItems, cartSelling, user } = useAppSelector(
    (state) => state.order
  );
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      if (!cartItems.length && cartSelling?.id)
        dispatch(getCartItems(cartSelling.id));
      if (!cartSelling && user) dispatch(getCart(user.id));
    },
    [cartItems.length, cartSelling, cartSelling?.id, dispatch, user]
  );

  const cartItemsRender = useMemo(
    () => cartItems.map((item) => <CartItem {...item} />),
    [cartItems]
  );

  const handlePay = useCallback(() => {
    if (cartSelling?.id) void dispatch(payForCart(cartSelling.id));
  }, [cartSelling?.id, dispatch]);

  return (
    <CartPageStyled>
      {cartItemsRender}
      <PayButtonStyled onClick={handlePay}>Оплатить</PayButtonStyled>
    </CartPageStyled>
  );
};
