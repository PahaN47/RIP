import React from "react";
import {
  LoginButtonStyled,
  LoginInputStyled,
  LoginInputWrapStyled,
  LoginPageStyled,
  LoginWrapStyled,
} from "./LoginPage.style";

import "./LoginPage.style.ts";

export const LoginPage = () => {
  return (
    <LoginPageStyled>
      <LoginWrapStyled>
        <LoginInputWrapStyled>
          Логин
          <LoginInputStyled type="text" />
        </LoginInputWrapStyled>
        <LoginInputWrapStyled>
          Пароль
          <LoginInputStyled type="password" />
        </LoginInputWrapStyled>
        <LoginButtonStyled>Войти</LoginButtonStyled>
      </LoginWrapStyled>
    </LoginPageStyled>
  );
};
