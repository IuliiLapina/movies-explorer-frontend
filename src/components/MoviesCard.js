import React from "react";
import { useLocation } from "react-router-dom";

function MoviesCard({ film }) {
  const location = useLocation();
  const classNameCardBtn = `${
    location.pathname === `/movies` ? `card__like-btn` : `card__delete-btn`
  }`;

  return (
    <>
      <li className="card card_saved">
        <img
          className="card__image"
          src={`https://api.nomoreparties.co${film.image.url}`}
          alt={film.title}
        />
        <div className="card__description">
          <h2 className="card__title">{film.nameRU}</h2>
          <p className="card__duration">
            {film.duration % 60 === 0
              ? `${film.duration / 60} ч`
              : film.duration > 60
              ? `${Math.floor(film.duration / 60)} ч ${film.duration % 60} мин`
              : `${film.duration} мин`}
          </p>
          <button className={classNameCardBtn} type="button"></button>
        </div>
      </li>
    </>
  );
}

export default MoviesCard;
