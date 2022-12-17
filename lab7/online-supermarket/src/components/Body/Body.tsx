import React, { useCallback, useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import {
  APP_LINK,
  CART_LINK,
  LOGIN_LINK,
  ORDERS_LINK,
  PRODUCTS_LINK,
} from "../../constant/links";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  authByCookie,
  authLogout,
  createCart,
  getCart,
} from "../../store/order/order.actions";
import {
  BreadCrumbsWrapStyled,
  ContentWrapStyled,
  LinkStyled,
  MainTitleLinkStyled,
  MainTitleWrapStyled,
  OrdersLinkStyled,
  OrdersLinkWrapStyled,
  OrdersLogoutLinkStyled,
} from "./Body.style";
import { BodyProps } from "./Body.types";

export const Body = ({ children }: BodyProps) => {
  const { pathname } = useLocation();
  const { cartSelling, cartFound, user, cookieAuthError } = useAppSelector(
    (state) => state.order
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cartFound) {
      if (!cartSelling && user) dispatch(getCart(user.id));
    } else if (!cartSelling && user) dispatch(createCart(user.id));
  }, [cartFound, cartSelling, dispatch, user]);

  useEffect(() => {
    if (!cookieAuthError && !user) dispatch(authByCookie());
  }, [cookieAuthError, dispatch, user]);

  const handleLogoutClick = useCallback(
    () => void dispatch(authLogout()),
    [dispatch]
  );

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
            case "login":
              return <LinkStyled to={LOGIN_LINK}>/Вход</LinkStyled>;
            default:
              return <LinkStyled to={pathname}>/{path}</LinkStyled>;
          }
        })}
      </BreadCrumbsWrapStyled>
    );
  }, [pathname]);

  return (
    <ContentWrapStyled>
      {navigation}
      <MainTitleWrapStyled>
        <MainTitleLinkStyled to={PRODUCTS_LINK}>
          ОНЛАЙН-СУПЕРМАРКЕТ
        </MainTitleLinkStyled>
      </MainTitleWrapStyled>
      <OrdersLinkWrapStyled>
        {user ? (
          <>
            <OrdersLinkStyled to={ORDERS_LINK}>Мои заказы</OrdersLinkStyled>
            <OrdersLinkStyled to={CART_LINK}>Корзина</OrdersLinkStyled>
            <OrdersLogoutLinkStyled
              href={PRODUCTS_LINK}
              onClick={handleLogoutClick}
            >
              Выйти
            </OrdersLogoutLinkStyled>
          </>
        ) : (
          <OrdersLinkStyled to={LOGIN_LINK}>Войти</OrdersLinkStyled>
        )}
      </OrdersLinkWrapStyled>
      {children}
    </ContentWrapStyled>
  );
};
