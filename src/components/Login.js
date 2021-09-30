import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo/logo.svg';

function Login () {
  return (
    <div className="form-auth">
      <img className="form-auth__logo" src={logo} alt="Логотип 'Movies'" />
      <div className="popup__container">
        <h2 className="popup__title">Рады видеть!</h2>
        <form className="popup__form" name='form-register'>
          <label className="popup__input-heading" for="email-input">Email</label>
          <input
            id="email-input"
            className="popup__input popup__input-text popup__input-text_type_link-email"
            type="email"
            placeholder="pochta@yandex.ru|"
            name="email"
            required
          />
          <span className="popup__input-error email-input-error"></span>

          <label className="popup__input-heading" for="password-input">Пароль</label>
          <input
            id="password-input"
            className="popup__input popup__input-text popup__input-text_type_link-password"
            type="password"
            name="password"
            required
          />
          <span className="popup__input-error password-input-error popup__input-error_type_active"></span>

          <input
            type="submit"
            className="popup__button popup__button_login"
            value="Войти"
          />
        </form>
      </div>
      <div className="form-auth__text-container">
        <p className="form-auth__text">Ещё не зарегистрированы?</p>
        <Link className="form-auth__link" to="/">Регистрация</Link>
      </div>
    </div>
  );
}

export default Login;