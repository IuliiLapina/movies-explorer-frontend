import React from 'react';
import { Link } from 'react-router-dom';

function Register({title, buttonText}) {
  return (
    <div className="form-auth">
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name='form-register'>
          <label className="popup__input-heading" htmlFor="name-input">Имя</label>
          <input
            id="name-input"
            className="popup__input popup__input-text popup__input-text_type_link-name"
            type="text"
            placeholder="Виталий"
            name="name"
            required
          />
          <span className="popup__input-error name-input-error"></span>

          <label className="popup__input-heading" htmlFor="email-input">E-mail</label>
          <input
            id="email-input"
            className="popup__input popup__input-text popup__input-text_type_link-email"
            type="email"
            placeholder="pochta@yandex.ru|"
            name="email"
            required
          />
          <span className="popup__input-error email-input-error"></span>

          <label className="popup__input-heading" htmlFor="password-input">Пароль</label>
          <input
            id="password-input"
            className="popup__input popup__input-text popup__input-text_type_link-password"
            type="password"
            name="password"
            required
          />
          <span className="popup__input-error password-input-error popup__input-error_type_active">Что-то пошло не так...</span>

          <input
            type="submit"
            className="popup__button"
            value={buttonText}
          />
        </form>
      </div>
      <div className="form-auth__text-container">
        <p className="form-auth__text">Уже зарегистрированы?</p>
        <Link className="form-auth__link" to="/signin">Войти</Link>
      </div>
    </div>
  );
}

export default Register;