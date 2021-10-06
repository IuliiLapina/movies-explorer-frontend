import React from 'react';
import { Link } from 'react-router-dom';

function Register({title, buttonText, authRegister}) {
  const [nameInputValue, setNameInputValue] = React.useState('');
  const [emailInputValue, setEmailInputValue] = React.useState('');
  const [passwordInputValue, setPasswordInputValue] = React.useState('');

  function handleChangeName(e) {
    setNameInputValue(e.target.value)
  }

  function handleChangeEmail(e) {
    setEmailInputValue(e.target.value)
  }

  function handleChangePassword(e) {
    setPasswordInputValue(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    const name = nameInputValue;
    const email = emailInputValue;
    const password = passwordInputValue;

    authRegister(name, email, password);
    setPasswordInputValue('');
  }
  return (
    <div className="form-auth">
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name="form-register" onSubmit={handleSubmit}>
          <label className="popup__input-heading" htmlFor="name-input">Имя</label>
          <input
            value={nameInputValue}
            onChange={handleChangeName}
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