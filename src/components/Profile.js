import React from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from "../utils/formValidator";

function Profile ({handleExit, editProfile}) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    editProfile(values["email"], values["password"]);
  }

  return (
    <section className="profile">
      <div className="popup__container popup__container_profile">
        <h2 className="popup__title popup__title_profile">Привет, Виталий!</h2>
        <form className="popup__form popup__form_profile" name="form-register" onSubmit={handleSubmit} noValidate>
          <div className="profile__input-container">
            <label className="profile__input-heading" htmlFor="edit-name-input">Имя</label>
            <input
              className={`profile__input ${
                errors["name"] &&
                errors["name"] !== "" &&
                `popup__input_type_error`
              }`}
              onChange={handleChange}
              id="edit-name-input"
              type="text"
              placeholder="Виталий"
              name="name"
              pattern='^[A-Za-zА-Яа-я\s]{-}$'
              minLength="2"
              maxLength="30"
              required
            />

          </div>
          <span
              className={`popup__input-error ${
                errors["name"] &&
                errors["name"] !== "" &&
                `popup__input-error_type_active`
              }`}
            >
              {errors["name"]}
            </span>

          <div className="profile__input-container">
            <label className="profile__input-heading" htmlFor="edit-email-input">E-mail</label>
            <input
              className={`profile__input ${
                errors["email"] &&
                errors["email"] !== "" &&
                `popup__input_type_error`
              }`}
              onChange={handleChange}
              id="edit-email-input"
              type="email"
              placeholder="pochta@yandex.ru"
              name="email"
              pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              minLength="2"
              required
            />
          </div>
          <span
            className={`popup__input-error ${
              errors["email"] &&
              errors["email"] !== "" &&
              `popup__input-error_type_active`
            }`}
          >
            {errors["email"]}
          </span>
          <input
            className={`profile__button ${!isValid && `popup__button_disabled`}`}
            disabled={!isValid}
            type="button"
            value="Редактировать"
          />
          <Link className="profile__link" to="/" onClick={handleExit}>Выйти из аккаунта</Link>
        </form>
      </div>
    </section>
  );
}

export default Profile;