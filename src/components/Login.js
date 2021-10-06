import React from 'react';
import { Link } from 'react-router-dom';

function Login ({title, buttonText, authAuthorize}) {
  const [emailInputValue, setEmailInputValue] = React.useState('');
  const [passwordInputValue, setPasswordInputValue] = React.useState('');

  function handleChangeEmail(e) {
    setEmailInputValue(e.target.value)
  }

  function handleChangePassword(e) {
    setPasswordInputValue(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    const email = emailInputValue;
    const password = passwordInputValue;

    authAuthorize(email, password);
    setPasswordInputValue('');
    setEmailInputValue('');
  }
  return (
    <div className="form-auth">
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name="form-register" onSubmit={handleSubmit}>
          <label className="popup__input-heading" htmlFor="email-input">E-mail</label>
          <input
            value={emailInputValue}
            onChange={handleChangeEmail}
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
            value={passwordInputValue}
            onChange={handleChangePassword}
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