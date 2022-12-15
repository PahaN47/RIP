import { Link } from "react-router-dom";
import styled from "styled-components";

export const ProductItemWrapStyled = styled.div`
  padding: 24px;
  border-radius: 32px;
  background: transparent;
  transition: all 500ms;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  position: relative;

  &:hover {
    background: white;
    box-shadow: 4px 4px 32px rgba(16, 16, 32, 20%);
  }
`;

export const ProductItemLinkStyled = styled(Link)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const ProductItemImageWrapStyled = styled.div`
  width: 256px;
  height: 256px;
  margin-right: 48px;
  background: #efefff;
  border-radius: 32px;
  overflow: hidden;
  display: flex;
  justify-content: center;

  & > img {
    width: auto;
    height: 100%;
  }
`;

export const ProductItemNameWrapStyled = styled.div`
  font-size: 36px;
  line-height: 40px;
  margin-top: 16px;
  width: fit-content;
  color: #242436;
`;

export const ProductItemPriceTag = styled.div`
  margin-top: 16px;
  font-size: 20px;
  line-height: 24px;
  padding: 8px 16px;
  border-radius: 40px;
  background: royalblue;
  width: fit-content;
  color: #efefff;
`;
