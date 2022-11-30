import React, { useMemo } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
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
  const { pathname } = useLocation();
  const navigation = useMemo(() => {
    const arr = pathname.split("/").filter((str, index) => str || index === 0);

    return arr.map((path) => {
      switch (path) {
        case "":
          return <Link to={APP_LINK}>Главная</Link>;
        case "products":
          return <Link to={PRODUCTS_LINK}>/Продукты</Link>;
        case "orders":
          return <Link to={ORDERS_LINK}>/Заказы</Link>;
        case "product":
          return undefined;
        default:
          return <Link to={pathname}>/{path}</Link>;
      }
    });
  }, [pathname]);

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
