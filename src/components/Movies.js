import React from "react";
// import Preloader from './Preloader/Preloader'
import SearchForm from "./SearchForm";
import MoviesCardList from "./MoviesCardList";
import Preloader from "./Preloader";

function Movies({ films, getMoviesCardList, isLoading, handleSaveFilm }) {
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
      {isLoading ? <Preloader /> : <MoviesCardList films={films} handleSaveFilm={handleSaveFilm}/>}
    </main>
  );
}

export default Movies;
