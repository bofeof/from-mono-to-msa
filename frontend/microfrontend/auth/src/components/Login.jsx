import React from "react";
import { useHistory } from "react-router-dom";
import "./login/login.css";
import "./auth-form/auth-form.css";
import { login } from "./utils/auth";

export default function Login() {
  const history = useHistory();

  // Добавили onLogin в UserLogin и отправляем полученный jwt с помощью события
  // TODO:дописать попап и информированием
  function onLogin(email, password) {
    const token = login(email, password)
      .then((res) => res)
      .catch((err) => {
        console.log(err)
        // setTooltipStatus("fail");
        // setIsInfoToolTipOpen(true);
      });

    dispatchEvent(
      new CustomEvent("jwt-change", {
        detail: token,
      })
    );

    history.push("/");
  }

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e) {
    console.log(email, password);
    e.preventDefault();
    onLogin(email, password);
  }
  return (
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__wrapper">
          <h3 className="auth-form__title">Вход</h3>
          <label className="auth-form__input">
            <input
              type="text"
              name="name"
              id="email"
              className="auth-form__textfield"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="auth-form__input">
            <input
              type="password"
              name="password"
              id="password"
              className="auth-form__textfield"
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button className="auth-form__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
