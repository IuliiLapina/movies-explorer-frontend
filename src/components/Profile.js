/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from "../utils/formValidator";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Preloader from './Preloader';

function Profile ({handleExit, onUpdateUserInfo, isLoading}) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setIsValid } = useFormWithValidation();

  React.useEffect(() => {
    if (values["name"] === currentUser.name && values["email"] === currentUser.email) {
      setIsValid(false);
    }
  }, [values])

  React.useEffect(() => {
    values["name"] = currentUser.name;
    values["email"] = currentUser.email;
  }, [currentUser])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUserInfo( values["email"], values["name"]);
  }

  return (
    <section className="profile">
      {isLoading ? <Preloader/> : (
      <div className="popup__container popup__container_profile">
        <h2 className="popup__title popup__title_profile">Привет, {currentUser.name}!</h2>
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
              placeholder={currentUser.name}
              name="name"
              pattern='^[А-Яа-я\s\w\S]{1,}$'
              minLength="2"
              maxLength="30"
              value={ values["name"] }
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
              placeholder={currentUser.email}
              name="email"
              pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              minLength="2"
              value={ values["email"] }
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
            type="submit"
            className={`profile__button ${!isValid && `popup__button_disabled`}`}
            disabled={!isValid}
            value="Редактировать"
          />
          <Link className="profile__link" to="/" onClick={handleExit}>Выйти из аккаунта</Link>
        </form>
      </div>
      )}
    </section>
  );
}

export default Profile;