import React from "react";
// import Preloader from './Preloader/Preloader'
import SearchForm from "./SearchForm";
import MoviesCardList from "./MoviesCardList";
import Preloader from "./Preloader";

function Movies({
  films,
  getFilmsCardList,
  isLoading,
  checkLikeFilm,
  toggleFilmLike
}) {
  const [searchFilm, setSearchFilm] = React.useState("");
  const [isShortFilm, setIsShortFilm] = React.useState("false");

  function onSubmitSearchForm() {
    getFilmsCardList(searchFilm, isShortFilm);
  }

  return (
    <main className="content">
      <SearchForm
        onSubmitSearchForm={onSubmitSearchForm}
        searchFilm={searchFilm}
        setSearchFilm={setSearchFilm}
        setIsShortFilm={setIsShortFilm}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          toggleFilmLike={toggleFilmLike}
          films={films}
          checkLikeFilm={checkLikeFilm}
        />
      )}
    </main>
  );
}

export default Movies;
