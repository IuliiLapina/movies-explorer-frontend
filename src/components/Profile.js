import React from 'react';
import { Link } from 'react-router-dom';

function Profile ({handleExit}) {
  return (
    <section className="profile">
      <div className="popup__container popup__container_profile">
        <h2 className="popup__title popup__title_profile">Привет, Виталий!</h2>
        <form className="popup__form popup__form_profile" name='form-register'>
          <div className="profile__input-container">
            <label className="profile__input-heading" htmlFor="edit-name-input">Имя</label>
            <input
              id="edit-name-input"
              className="profile__input"
              type="text"
              placeholder="Виталий"
              name="name"
              required
            />
            <span className="popup__input-error name-input-error"></span>
          </div>

          <div className="profile__input-container">
            <label className="profile__input-heading" htmlFor="edit-email-input">E-mail</label>
            <input
              id="edit-email-input"
              className="profile__input"
              type="email"
              placeholder="pochta@yandex.ru"
              name="email"
              required
            />
            <span className="popup__input-error email-input-error"></span>
          </div>

          <input
            type="button"
            className="profile__button"
            value="Редактировать"
          />
          <Link className="profile__link" to="/" onClick={handleExit}>Выйти из аккаунта</Link>
        </form>
      </div>
    </section>
  );
}

export default Profile;