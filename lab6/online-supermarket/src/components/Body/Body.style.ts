import { Link } from "react-router-dom";
import styled from "styled-components";

export const ContentWrapStyled = styled.div`
  margin: 32px auto 128px;
  width: 90%;
  height: 100%;
`;

export const MainTitleWrapStyled = styled.div`
  font-size: 28px;
  line-height: 32px;
  padding: 16px;
  border-radius: 16px;
  background: royalblue;
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-shadow: 4px 4px 32px rgba(16, 16, 32, 20%);
`;

export const MainTitleLinkStyled = styled(Link)`
  color: #efefff;
  text-decoration: none;
  transition: all 500ms;

  &:hover {
    color: #d8ffff;
  }
`;

export const OrdersLinkWrapStyled = styled.div`
  margin: 24px 0 0;
  display: flex;
  justify-content: center;
  column-gap: 24px;
`;

export const OrdersLinkStyled = styled(Link)`
  font-size: 20px;
  line-height: 24px;
  color: royalblue;
  text-decoration: none;
  transition: all 500ms;

  &:hover {
    filter: brightness(70%);
  }
`;

export const BreadCrumbsWrapStyled = styled.div`
  margin-bottom: 24px;
`;

export const LinkStyled = styled(Link)`
  text-decoration: none;
  color: royalblue;

  transition: all 0.5s;

  &:hover {
    filter: brightness(70%);
  }
`;
