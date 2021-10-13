import React from "react";
// import Preloader from './Preloader/Preloader'
import SearchForm from './SearchForm'
import MoviesCardList from './MoviesCardList'

function Movies ({films, getMoviesCardList}) {
  const [searchFilm, setSearchfilm] = React.useState('');
  const [isShortFilm, setIsShortFilm] = React.useState('false');

  function onSubmitSearchForm() {
    getMoviesCardList(searchFilm, isShortFilm);
  }

  return (
    <main className="content">
      <SearchForm
        onSubmitSearchForm={onSubmitSearchForm}
        searchFilm={searchFilm}
        setSearchfilm={setSearchfilm}
        setIsShortFilm={setIsShortFilm}
      />
      <MoviesCardList
        films={films}
      />
    </main>
  );
}

export default Movies;
