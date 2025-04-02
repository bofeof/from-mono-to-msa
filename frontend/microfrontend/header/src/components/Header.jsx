import React from "react";
import { Route, Link } from 'react-router-dom';
import { CurrentUserContext } from '../../../shared/contexts/CurrentUserContext';

import logoPath from '../../../shared/styles/images/logo.svg';

import "./index.css";



// В корневом компоненте App описаны обработчики: onRegister, onLogin и onSignOut. Эти обработчики переданы в соответствующие компоненты: Register.js, Login.js, Header.js
export default function Header ({onSignOut}) {
  
  function handleSignOut(){
    onSignOut();
  }
  
  return (
    <header className="header page__section">
      <img src={logoPath} alt="Логотип проекта Mesto" className="logo header__logo" />
      <Route exact path="/">
        <div className="header__wrapper">
          <p className="header__user">{ CurrentUserContext.email || 'test@test.ru' }</p>
          <button className="header__logout" onClick={handleSignOut}>Выйти</button>
        </div>
      </Route>
      <Route path="/signup">
        <Link className="header__auth-link" to="signin">Войти</Link>
      </Route>
      <Route path="/signin">
        <Link className="header__auth-link" to="signup">Регистрация</Link>
      </Route>
    </header>
  )
}

