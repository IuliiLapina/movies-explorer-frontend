import React from "react";
import Preloader from "./Preloader";
import SearchForm from "./SearchForm";
import MoviesCardList from "./MoviesCardList";

function SavedMovies({
  films,
  getFilmsSaveCardList,
  isLoading,
  checkLikeFilm,
  toggleFilmLike,
  handleDeleteFilm
}) {
  const [searchFilm, setSearchFilm] = React.useState("");
  const [isShortFilm, setIsShortFilm] = React.useState(false);

  function onSubmitSearchForm() {
    getFilmsSaveCardList(searchFilm, isShortFilm);
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
          handleDeleteFilm={handleDeleteFilm}
          checkLikeFilm={checkLikeFilm}
        />
      )}
    </main>
  );
}

export default SavedMovies;
