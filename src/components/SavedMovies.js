import React from "react";
import Preloader from "./Preloader";
import SearchForm from "./SearchForm";
import MoviesCardList from "./MoviesCardList";

function SavedMovies({
  films,
  getMoviesCardList,
  isLoading,
  checkLikeFilm,
  toggleFilmLike
}) {
  const [searchFilm, setSearchFilm] = React.useState("");
  const [isShortFilm, setIsShortFilm] = React.useState("false");

  function onSubmitSearchForm() {
    getMoviesCardList(searchFilm, isShortFilm);
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
          films={films}
          checkLikeFilm={checkLikeFilm}
          toggleFilmLike={toggleFilmLike}
        />
      )}
    </main>
  );
}

export default SavedMovies;
