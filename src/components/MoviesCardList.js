import React from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "./MoviesCard";
import { WINDOW_WIDTH_BIG, WINDOW_WIDTH_MEDIUM } from "../utils/constans";

function MoviesCardList({
  films,
  checkLikeFilm,
  toggleFilmLike,
  handleDeleteFilm
}) {
  const location = useLocation();
  const windowWidtn = window.innerWidth;

  const [showСards, setShowСards] = React.useState(
    windowWidtn >= WINDOW_WIDTH_BIG
      ? 12
      : windowWidtn >= WINDOW_WIDTH_MEDIUM
      ? 8
      : 5
  );
  const [stepOfShowingCards, setStepOfShowingCards] = React.useState(
    windowWidtn >= WINDOW_WIDTH_BIG ? 3 : 2
  );
/*
  window.onresize = () => {
    setTimeout(
      setStepOfShowingCards(windowWidtn > WINDOW_WIDTH_BIG ? 3 : 2),
      500
    );
  };
*/
  function handleClickMoreBtn() {
    setShowСards(showСards + stepOfShowingCards);
  }

  return (
    <section className="content-cards">
      <ul className="cards">
        {location.pathname === "/movies"
          ? films
              .slice(0, showСards)
              .map((film) => (
                <MoviesCard
                  film={film}
                  key={film.id}
                  checkLikeFilm={checkLikeFilm}
                  toggleFilmLike={toggleFilmLike}
                />
              ))
          : films.map((film) => (
            <MoviesCard
              film={film}
              key={film.movieId}
              handleDeleteFilm={handleDeleteFilm}
              checkLikeFilm={checkLikeFilm}
              toggleFilmLike={toggleFilmLike}
            />
          ))
        }
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
