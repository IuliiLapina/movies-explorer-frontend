import React from "react";
import { useLocation } from 'react-router-dom';

function MoviesCard ({card}) {
  const location = useLocation();
  const classNameCardBtn = `${location.pathname === `/movies` ? `card__like-btn` : `card__delete-btn`}`;

  return (
    <>
    <li className="card card_saved">
      <img className="card__image" src={card.link} alt={card.title}/>
      <div className="card__description">
        <h2 className="card__title">{card.title}</h2>
        <p className="card__duration">{card.duration}</p>
        <button className={classNameCardBtn} type="button"></button>
      </div>
    </li>
  </>
  );
}

export default MoviesCard;

/*
function MoviesCard ({card}) {
  return (
    <li className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
      />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <p className="card__like-quantity">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
*/