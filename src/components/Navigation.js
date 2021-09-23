import React from 'react';
import { Link } from 'react-router-dom';

function Navigation ({ loggedIn }) {
  return (
        <nav className="header__menu">
          <ul className="header__menu-link">
            {loggedIn ? (
                <>
                  <li className="header__list-item"><Link to="/" className="header__menu-link-item header__menu-link-item_film">Фильмы</Link></li>
                  <li className="header__list-item"><Link to="/" className="header__menu-link-item header__menu-link-item_save-film">Сохранённые фильмы</Link></li>
                  <li className="header__list-item"><Link to="/" className="header__menu-link-item header__menu-link-item_profile">Аккаунт</Link></li>
                </>
              ) : (
                <>
                  <li className="header__list-item"><Link to="/" className="header__menu-link-item header__menu-link-item_register">Регистрация</Link></li>
                  <li className="header__list-item"><Link to="/" className="header__menu-link-item header__menu-link-item_login">Войти</Link></li>
                </>
              )}
          </ul>
        </nav>
  );
}

export default Navigation;
