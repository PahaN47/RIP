import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import {
  APP_LINK,
  CART_LINK,
  LOGIN_LINK,
  ORDERS_LINK,
  PRODUCTS_LINK,
} from "../../constant/links";
import { useAppDispatch, useAppSelector } from "../../store";
import { createCart, getCart } from "../../store/order/order.actions";
import {
  BreadCrumbsWrapStyled,
  ContentWrapStyled,
  LinkStyled,
  MainTitleLinkStyled,
  MainTitleWrapStyled,
  OrdersLinkStyled,
  OrdersLinkWrapStyled,
} from "./Body.style";
import { BodyProps } from "./Body.types";

export const Body = ({ children }: BodyProps) => {
  const { pathname } = useLocation();
  const { cartSelling, cartFound } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    if (cartFound) {
      if (!cartSelling) dispatch(getCart(1));
    } else if (!cartSelling) dispatch(createCart(1));
  }, [cartFound, cartSelling, dispatch]);

  const navigation = useMemo(() => {
    const arr = pathname.split("/").filter((str, index) => str || index === 0);

    return (
      <BreadCrumbsWrapStyled>
        {arr.map((path) => {
          switch (path) {
            case "":
              return <LinkStyled to={APP_LINK}>Главная</LinkStyled>;
            case "products":
              return <LinkStyled to={PRODUCTS_LINK}>/Продукты</LinkStyled>;
            case "orders":
              return <LinkStyled to={ORDERS_LINK}>/Заказы</LinkStyled>;
            case "product":
              return undefined;
            case "cart":
              return <LinkStyled to={CART_LINK}>/Корзина</LinkStyled>;
            default:
              return <LinkStyled to={pathname}>/{path}</LinkStyled>;
          }
        })}
      </BreadCrumbsWrapStyled>
    );
  }, [pathname]);

  return (
    <ContentWrapStyled>
      <button onClick={() => setLoggedIn((prev) => !prev)}>
        Toggle log in ({loggedIn ? "Log out" : "Log in"})
      </button>
      {navigation}
      <MainTitleWrapStyled>
        <MainTitleLinkStyled to={PRODUCTS_LINK}>
          ОНЛАЙН-СУПЕРМАРКЕТ
        </MainTitleLinkStyled>
      </MainTitleWrapStyled>
      <OrdersLinkWrapStyled>
        {loggedIn ? (
          <>
            <OrdersLinkStyled to={ORDERS_LINK}>Мои заказы</OrdersLinkStyled>
            <OrdersLinkStyled to={CART_LINK}>Корзина</OrdersLinkStyled>
          </>
        ) : (
          <OrdersLinkStyled to={LOGIN_LINK}>Войти</OrdersLinkStyled>
        )}
      </OrdersLinkWrapStyled>
      {children}
    </ContentWrapStyled>
  );
};
