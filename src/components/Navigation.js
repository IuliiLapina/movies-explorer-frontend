import React from 'react';
import { Link } from 'react-router-dom';

function Navigation ({ loggedIn }) {
  return (
        <div className="header__menu">


          <ul className="header__menu-link">
            {loggedIn ? (
                <>
                  <li className="header__list-item"><Link to="/" className="header__menu-link-item header__menu-link-item_active">Фильмы</Link></li>
                  <li className="header__list-item"><Link to="/" className="header__menu-link-item">Сохранённые фильмы</Link></li>
                  <li className="header__list-item"><Link to="/" className="header__menu-link-item header__menu-link-item_profile">Аккаунт</Link></li>
                </>
              ) : (
                <>
                  <li className="header__list-item"><Link to="/" className="header__menu-link-item header__menu-link-item_register">Регистрация</Link></li>
                  <li className="header__list-item"><Link to="/" className="header__menu-link-item header__menu-link-item_login">Войти</Link></li>
                </>
              )}
          </ul>
        </div>
  );
}

export default Navigation;

/*
          <input id="menu__toggle" type="checkbox" />
          <label class="menu__btn" for="menu__toggle">
            <span></span>
          </label>
*/