import React from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "./MoviesCard";

function MoviesCardList({ films, handleSaveFilm }) {
  const location = useLocation();
  const windowWidtn = window.innerWidth;
  const windowWidtnBig = 1280;
  const windowWidtnMedium = 768;

  const [showСards, setShowСards] = React.useState(
    windowWidtn >= windowWidtnBig
      ? 12
      : windowWidtn >= windowWidtnMedium
      ? 8
      : 5
  );
  const [stepOfShowingCards, setStepOfShowingCards] = React.useState(
    windowWidtn >= windowWidtnBig ? 3 : 2
  );

  window.onresize = () => {
    setTimeout(
      setStepOfShowingCards(windowWidtn > windowWidtnBig ? 3 : 2),
      500
    );
  };

  function handleClickMoreBtn() {
    setShowСards(showСards + stepOfShowingCards);
  }

  return (
    <section className="content-cards">
      <ul className="cards">
        {films.slice(0, showСards).map((film) => (
          <MoviesCard
            film={film}
            key={film.id}
            onFilmLike={handleSaveFilm}
          />
        ))}
      </ul>
      {location.pathname === "/movies" ? (
        <div className="cards__more-container">
          <button
            type="button"
            className={`cards__more-btn ${
              showСards >= films.length && `cards__more-btn_disabled`
            } }`}
            onClick={handleClickMoreBtn}
          >
            Ещё
          </button>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}

export default MoviesCardList;
