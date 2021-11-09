import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navigation({ loggedIn }) {
  const windowWidtn = window.innerWidth;
  const location = useLocation();

  return (
    <div className="header__menu">
      <input id="header__menu-toggle" type="checkbox" />
      <label className="header__menu-btn" htmlFor="header__menu-toggle">
        <span className="header__menu-btn-before"></span>
      </label>


      <ul className="header__menu-link">
        {loggedIn ? (
          <>
            <ul className="header__menu-link_films">

              { windowWidtn <= 768 && location.pathname !== `/` ? (
                <li className="header__list-item">
                <Link to="/" className={`header__menu-link-item ${location.pathname === "/" ? `header__menu-link-item_active` : ''}`}>
                  Главная
                </Link>
              </li>
              ) : ('')}

              <li className="header__list-item">
                <Link to="/movies" className={`header__menu-link-item ${location.pathname === "/movies" ? `header__menu-link-item_active` : ''}`}>
                  Фильмы
                </Link>
              </li>
              <li className="header__list-item">
                <Link to="/saved-movies" className={`header__menu-link-item ${location.pathname === "/saved-movies" ? `header__menu-link-item_active` : ''}`}>
                  Сохранённые фильмы
                </Link>
              </li>
            </ul>

            <li className="header__list-item">
              <Link to="/profile" className="header__menu-link-item header__menu-link-item_profile">
                Аккаунт
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="header__list-item">
              <Link to="/signup" className="header__menu-link-item header__menu-link-item_register"             >
                Регистрация
              </Link>
            </li>
            <li className="header__list-item">
              <Link to="/signin" className="header__menu-link-item header__menu-link-item_login">
                Войти
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
