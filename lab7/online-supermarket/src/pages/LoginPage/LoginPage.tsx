import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS_LINK } from "../../constant/links";
import { useAppDispatch, useAppSelector } from "../../store";
import { authLogin, authRegister } from "../../store/order/order.actions";
import {
  ChangeLoginButtonStyled,
  LoginButtonStyled,
  LoginInputStyled,
  LoginInputWrapStyled,
  LoginPageStyled,
  LoginWrapStyled,
} from "./LoginPage.style";

import "./LoginPage.style.ts";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, authError } = useAppSelector((state) => state.order);
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value ?? "");
    },
    []
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value ?? "");
    },
    []
  );

  const handleLoginClick = useCallback(
    () => void dispatch(authLogin({ username, password })),
    [dispatch, password, username]
  );

  const handleChangeLogin = useCallback(
    () => setIsRegister((prev) => !prev),
    []
  );

  const handleRegisterClick = useCallback(
    () => void dispatch(authRegister({ username, password })),
    [dispatch, password, username]
  );

  useEffect(() => {
    if (user) navigate(PRODUCTS_LINK);
  }, [navigate, user]);

  return (
    <LoginPageStyled>
      <LoginWrapStyled>
        <LoginInputWrapStyled>
          Логин
          <LoginInputStyled
            type="text"
            value={username}
            onChange={handleUsernameChange}
            error={authError}
          />
        </LoginInputWrapStyled>
        <LoginInputWrapStyled>
          Пароль
          <LoginInputStyled
            type="password"
            value={password}
            onChange={handlePasswordChange}
            error={authError}
          />
        </LoginInputWrapStyled>
        <LoginButtonStyled
          onClick={isRegister ? handleRegisterClick : handleLoginClick}
        >
          {isRegister ? "Зарегистрироваться" : "Войти"}
        </LoginButtonStyled>
        <ChangeLoginButtonStyled onClick={handleChangeLogin}>
          {isRegister
            ? "Есть аккаунт? Войти"
            : "Нет аккаунта? Зарегистрироваться"}
        </ChangeLoginButtonStyled>
      </LoginWrapStyled>
    </LoginPageStyled>
  );
};
