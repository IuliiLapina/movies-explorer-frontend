import React from "react";
import { useLocation } from 'react-router-dom';
import MoviesCard from "./MoviesCard";

function MoviesCardList ({films}) {
  const location = useLocation();

  return (
    <section className="content-cards">
      <ul className="cards">
        {films.map((film) => (
          <MoviesCard
            film={film}
            key={film.id}
          />
        ))}
      </ul>
      <div className="cards__more-container">
        <button type="button" className="cards__more-btn">Ещё</button>
      </div>
  </section>
  );
}

export default MoviesCardList;