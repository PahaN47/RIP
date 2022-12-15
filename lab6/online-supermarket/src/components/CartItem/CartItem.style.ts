import styled from "styled-components";

export const CartItemWrapStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CartItemTitleWrapStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  flex-basis: 30%;
`;

export const CartItemTitleStyled = styled.div`
  font-size: 20px;
`;

export const CartItemAvatarStyled = styled.div`
  width: 64px;
  height: 64px;
  border: 1px solid #bbbbff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;

  & > img {
    height: 100%;
  }
`;

export const CartItemInputWrapStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;

export const ItemPriceStyled = styled.div`
  font-size: 16px;
`;

export const ItemCountInputStyled = styled.input`
  width: 64px;
  border: 1px solid #0000301a;
  border-radius: 6px;
  color: #242436;
  font-size: 16px;
  font-weight: 600;
  padding: 8px;

  &:focus-visible {
    outline: none;
  }
`;

export const ItemChangeCountStyled = styled.button`
  border-radius: 50%;
  background: royalblue;
  width: 36px;
  height: 36px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  transition: all 0.5s;

  &::before {
    width: 20px;
    height: 10px;
    border-bottom: 3px solid white;
    border-left: 3px solid white;
    transform: rotate(-45deg) translateY(-8%) translateX(10%);
    content: "";
  }

  &:hover {
    filter: brightness(120%);
  }
`;

export const ItemRemoveStyled = styled.button`
  border-radius: 50%;
  background: crimson;
  width: 36px;
  height: 36px;
  border: none;
  position: relative;
  flex-shrink: 0;
  transition: all 0.5s;

  &::before {
    position: absolute;
    width: 30px;
    height: 0;
    top: 16px;
    left: 3px;
    border-bottom: 3px solid white;
    transform: rotate(-45deg);
    content: "";
  }

  &::after {
    position: absolute;
    width: 30px;
    height: 0;
    top: 16px;
    left: 3px;
    border-bottom: 3px solid white;
    transform: rotate(45deg);
    content: "";
  }

  &:hover {
    filter: brightness(120%);
  }
`;
