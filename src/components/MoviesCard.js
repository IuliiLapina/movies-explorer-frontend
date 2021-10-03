import React from "react";
import movie from "../images/card.png";

function MoviesCard () {
  return (
    <>
    <li className="card card_saved">
      <img className="card__image" src={movie} alt=''/>
      <div className="card__description">
        <h2 className="card__title">33 слова о дизайне</h2>
        <p className="card__duration"> 1ч 47м</p>
        <button className="card__like-btn" type="button"></button>
      </div>
    </li>
    <li className="card card_saved">
      <img className="card__image" src={movie} alt=''/>
      <div className="card__description">
        <h2 className="card__title">33 слова о дизайне</h2>
        <p className="card__duration"> 1ч 47м</p>
        <button className="card__delete-btn" type="button"></button>
      </div>
    </li>
    <li className="card card_saved">
      <img className="card__image" src={movie} alt=''/>
      <div className="card__description">
        <h2 className="card__title">33 слова о дизайне</h2>
        <p className="card__duration"> 1ч 47м</p>
        <button className="card__delete-btn" type="button"></button>
      </div>
    </li>
    <li className="card card_saved">
      <img className="card__image" src={movie} alt=''/>
      <div className="card__description">
        <h2 className="card__title">33 слова о дизайне</h2>
        <p className="card__duration"> 1ч 47м</p>
        <button className="card__like-btn" type="button"></button>
      </div>
    </li>
    <li className="card card_saved">
      <img className="card__image" src={movie} alt=''/>
      <div className="card__description">
        <h2 className="card__title">33 слова о дизайне</h2>
        <p className="card__duration"> 1ч 47м</p>
        <button className="card__like-btn" type="button"></button>
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