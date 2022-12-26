import styled, { css } from "styled-components";

export const LoginPageStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const LoginWrapStyled = styled.div`
  padding: 48px;
  border-radius: 32px;
  background: white;
  margin-top: 96px;
  box-shadow: 4px 4px 32px rgb(16 16 32 / 20%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;
  width: 400px;
`;

export const LoginInputStyled = styled.input<{ error?: boolean }>`
  border: 1px solid #0000301a;
  color: #242436;
  font-size: 16px;
  font-weight: 600;
  width: 256px;
  padding: 12px;
  border-radius: 12px;

  &:focus-visible {
    outline: none;
  }

  ${({ error }) =>
    error &&
    css`
      border-color: red;
    `}
`;

export const LoginInputWrapStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;

export const LoginButtonStyled = styled.button`
  font-size: 20px;
  line-height: 24px;
  padding: 8px 16px;
  border-radius: 40px;
  background: royalblue;
  width: fit-content;
  color: #efefff;
  border: none;
  width: 100%;
`;

export const ChangeLoginButtonStyled = styled.button`
  font-size: 16px;
  color: royalblue;
  border: none;
  background: none;
`;
