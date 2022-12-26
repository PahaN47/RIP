import { Link } from "react-router-dom";
import styled from "styled-components";

export const ProductsWrapStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin: 48px 0 0;
  row-gap: 20px;
`;

export const CreateProductButton = styled(Link)`
  font-size: 24px;
  line-height: 32px;
  padding: 12px;
  border-radius: 16px;
  background: royalblue;
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-shadow: 4px 4px 32px rgba(16, 16, 32, 20%);
  color: #efefff;
  text-decoration: none;
  transition: all 500ms;
  width: 100%;

  &:hover {
    color: #d8ffff;
  }
`;
