import React from "react";
// import Preloader from './Preloader/Preloader'
import SearchForm from './SearchForm'
import MoviesCardList from './MoviesCardList'

function Movies ({films}) {
  return (
    <main className="content">
      <SearchForm/>
      <MoviesCardList
      films={films}/>
    </main>
  );
}

export default Movies;
