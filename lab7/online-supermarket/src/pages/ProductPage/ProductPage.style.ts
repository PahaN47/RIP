import styled, { css } from "styled-components";

export const ProductWrapStyled = styled.div`
  padding: 32px 32px 64px;
  border-radius: 32px;
  background: white;
  margin-top: 48px;
  box-shadow: 4px 4px 32px rgba(16, 16, 32, 20%);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const ProductImageWrapStyled = styled.div`
  width: 320px;
  height: 320px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  border-radius: 24px;
  margin-right: 48px;
  background: #efefff;
  flex-shrink: 0;

  & > img {
    width: auto;
    height: 100%;
  }
`;

export const ProductDescWrapStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  min-height: 406px;
`;

export const FlexWrapStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductTitleWrapStyled = styled.div`
  margin-top: 16px;
  font-size: 48px;
  line-height: 52px;
  color: royalblue;
`;

export const ProductRatingWrapStyled = styled.div`
  font-size: 28px;
  line-height: 32px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  column-gap: 12px;
  margin-top: 24px;
`;

export const StarStyled = styled.img<{ fade?: boolean }>`
  width: 48px;
  height: 48px;

  ${({ fade }) =>
    fade &&
    css`
      opacity: 40%;
    `}
`;

export const ProductPriceTag = styled.div`
  font-size: 32px;
  line-height: 36px;
  padding: 8px 32px;
  border-radius: 40px;
  background: royalblue;
  width: fit-content;
  color: #efefff;
`;

export const AddProductButton = styled.button`
  margin-top: 24px;
  padding: 16px 32px;
  font-size: 24px;
  line-height: 28px;
  border-radius: 60px;
  color: royalblue;
  border: 1px solid royalblue;
  cursor: pointer;
  transition: all 500ms;
  background: none;

  &:not(:disabled):hover {
    background: #e0e5ff;
  }

  &:disabled {
    opacity: 0.7;
  }
`;
