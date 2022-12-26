import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { SearchInputStyled } from "../../components/ProductsFilters/ProductsFilters.style";

export const OrdersWrapStyled = styled.div`
  padding: 32px 32px 64px;
  border-radius: 32px;
  background: white;
  margin-top: 48px;
  box-shadow: 4px 4px 32px rgba(16, 16, 32, 20%);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  & > div {
    width: 100%;
  }
`;

export const OrdersHeadStyled = styled.span`
  font-size: 32px;
  line-height: 36px;
  color: #242436;
`;

export const ListStyled = styled.ul`
  width: 100%;
`;

export const OrderElementStyled = styled.li<{ isConfirm: boolean }>`
  font-size: 20px;
  line-height: 24px;
  padding-bottom: 12px;
  margin-bottom: 12px;
  color: #242436;
  padding: 16px;
  width: calc(100% - 72px);

  &:not(:last-child) {
    border-bottom: 1px solid #e0e5ff;
  }

  ${({ isConfirm }) =>
    isConfirm
      ? css`
          outline: 1px solid royalblue;
          border-radius: 16px;
        `
      : css`
          ${UserTitleStyled} {
            opacity: 0.6;
          }
        `}
`;

export const UserTitleStyled = styled.div`
  font-size: 24px;
  margin-bottom: 12px;
  color: royalblue;
  filter: brightness(50%);
`;

export const ProductLinkStyled = styled(Link)`
  color: royalblue;
  text-decoration: none;
  transition: all 500ms;

  &:hover {
    filter: brightness(70%);
  }
`;

export const ButtonContainerStyled = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 16px;
`;

export const ConfirmButtonStyled = styled.button`
  font-size: 20px;
  line-height: 24px;
  padding: 8px 16px;
  border-radius: 40px;
  background: royalblue;
  width: fit-content;
  color: #efefff;
  border: none;
`;

export const RejectButtonStyled = styled.button`
  font-size: 20px;
  line-height: 24px;
  padding: 8px 16px;
  border-radius: 40px;
  background: crimson;
  width: fit-content;
  color: #efefff;
  border: none;
`;

export const FilterContainerStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 24px 0 48px;
  margin-top: 24px;
  border-bottom: 1px solid #e0e5ff;
  border-top: 1px solid #e0e5ff;
`;

export const DateInputStyled = styled(SearchInputStyled)`
  width: 128px;
`;

export const FilterButtonContainerStyled = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
`;
