import React, { useMemo } from "react";
import { useLocation } from "react-router";
import { APP_LINK, ORDERS_LINK, PRODUCTS_LINK } from "../../constant/links";
import {
  ContentWrapStyled,
  MainTitleLinkStyled,
  MainTitleWrapStyled,
  OrdersLinkStyled,
  OrdersLinkWrapStyled,
} from "./Body.styles";
import { BodyProps } from "./Body.types";

export const Body = ({ children }: BodyProps) => {
  const location = useLocation();
  const navigation = useMemo(() => {
    const arr = location.pathname
      .split("/")
      .filter((str, index) => str || index === 0);

    return arr.map((path) => {
      switch (path) {
        case "":
          return <a href={APP_LINK}>Главная</a>;
        case "products":
          return <a href={PRODUCTS_LINK}>/Продукты</a>;
        case "orders":
          return <a href={ORDERS_LINK}>/Заказы</a>;
        default:
          return <a href={PRODUCTS_LINK}>/{path}</a>;
      }
    });
  }, [location]);

  return (
    <ContentWrapStyled>
      {navigation}
      <MainTitleWrapStyled>
        <MainTitleLinkStyled href={PRODUCTS_LINK}>
          ОНЛАЙН-СУПЕРМАРКЕТ
        </MainTitleLinkStyled>
      </MainTitleWrapStyled>
      <OrdersLinkWrapStyled>
        <OrdersLinkStyled href={ORDERS_LINK}>Мои заказы</OrdersLinkStyled>
      </OrdersLinkWrapStyled>
      {children}
    </ContentWrapStyled>
  );
};
