import React from "react";
import { useLocation } from "react-router-dom";

function MoviesCard({ film, toggleFilmLike, checkLikeFilm, handleDeleteFilm }) {
  const location = useLocation();
  const isLiked = checkLikeFilm(film);

  function handleFilmClick() {
window.open(film.trailer)

console.log(film)

  }

  function handleLikeClick() {
    toggleFilmLike(film, isLiked);
  }

  function handleDeleteFilmClick () {
    handleDeleteFilm(film)
  }

  const duration = film.duration % 60 === 0
    ? `${film.duration / 60} ч`
    : film.duration > 60
    ? `${Math.floor(film.duration / 60)} ч ${film.duration % 60} мин`
    : `${film.duration} мин`

  return (
    <>
      <li className="card card_saved">
        <img
          className="card__image"
          src={film.image}
          alt={film.title}
          onClick={handleFilmClick}
        />
        <div className="card__description">
          <h2 className="card__title">{film.nameRU}</h2>
          <p className="card__duration">
            {duration}
          </p>
          {location.pathname === "/movies" ? (
            <button
              className={`card__like-btn ${isLiked && "card__like-btn_active"}`}
              type="button"
              onClick={handleLikeClick}
            ></button>
          ) : (
            <button
              className="card__delete-btn"
              type="button"
              onClick={handleDeleteFilmClick}
            ></button>
          )}
        </div>
      </li>
    </>
  );
}

export default MoviesCard;
