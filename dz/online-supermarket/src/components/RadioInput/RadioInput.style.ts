import styled, { css } from "styled-components";

export const InputContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RadioStyled = styled.input`
  width: 16px;
  height: 16px;
`;

export const RadioContainerStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const LabelStyled = styled.label<{ isSelected?: boolean }>`
  font-size: 16px;
  height: 16px;
  padding-left: 12px;

  ${({ isSelected }) =>
    isSelected &&
    css`
      color: royalblue;
    `}
`;
