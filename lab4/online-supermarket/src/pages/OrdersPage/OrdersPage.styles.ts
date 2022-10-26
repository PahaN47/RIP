import styled from "styled-components";

export const OrdersWrapStyled = styled.div`
  padding: 32px 32px 64px;
  border-radius: 32px;
  background: white;
  margin-top: 48px;
  box-shadow: 4px 4px 32px rgba(16, 16, 32, 20%);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const OrdersHeadStyled = styled.span`
  font-size: 32px;
  line-height: 36px;
  color: #242436;
`;

export const OrderElementStyled = styled.li`
  font-size: 20px;
  line-height: 24px;
  padding-bottom: 12px;
  margin-bottom: 12px;
  color: #242436;

  &:not(:last-child) {
    border-bottom: 1px solid #e0e5ff;
  }
`;

export const ProductLinkStyled = styled.a`
  color: royalblue;
  text-decoration: none;
  transition: all 500ms;

  &:hover {
    filter: brightness(70%);
  }
`;
