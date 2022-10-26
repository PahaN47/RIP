import React from "react";
import { ORDERS_LINK, PRODUCTS_LINK } from "../../constant/links";
import {
  ContentWrapStyled,
  MainTitleLinkStyled,
  MainTitleWrapStyled,
  OrdersLinkStyled,
  OrdersLinkWrapStyled,
} from "./Body.styles";
import { BodyProps } from "./Body.types";

export const Body = ({ children }: BodyProps) => {
  return (
    <ContentWrapStyled>
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
