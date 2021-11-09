import React from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from "../utils/formValidator";

function Login ({title, buttonText, authAuthorize, isLoading}) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    authAuthorize(values["email"], values["password"]);
  }

  return (
    <div className="form-auth">
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name="form-register" onSubmit={handleSubmit} noValidate>
          <label className="popup__input-heading" htmlFor="email-input">E-mail</label>
          <input
             className={`popup__input popup__input-text ${
              errors["email"] &&
              errors["email"] !== "" &&
              `popup__input_type_error`
            }`}
            onChange={handleChange}
            id="email-input"
            type="email"
            placeholder="pochta@yandex.ru|"
            name="email"
            pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
            minLength="2"
            required
          />
          <span
            className={`popup__input-error ${
              errors["email"] &&
              errors["email"] !== "" &&
              `popup__input-error_type_active`
            }`}
          >
            {errors["email"]}
          </span>

          <label className="popup__input-heading" htmlFor="password-input">Пароль</label>
          <input
            className={`popup__input popup__input-text ${
              errors["password"] &&
              errors["password"] !== "" &&
              `popup__input_type_error`
            }`}
            onChange={handleChange}
            id="password-input"
            type="password"
            name="password"
            minLength="8"
            required
          />
          <span
            className={`popup__input-error ${
              errors["password"] &&
              errors["password"] !== "" &&
              `popup__input-error_type_active`
            }`}
          >
            {errors["password"]}
          </span>

          <input
            type="submit"
            className={`popup__button ${!isValid && `popup__button_disabled`}`}
            disabled={!isValid}
            value={buttonText}
          />
        </form>
      </div>
      <div className="form-auth__text-container">
        <p className="form-auth__text">Ещё не зарегистрированы?</p>
        <Link className="form-auth__link" to="/signup">Регистрация</Link>
      </div>
    </div>
  );
}

export default Login;