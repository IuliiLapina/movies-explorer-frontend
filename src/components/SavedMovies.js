import React from "react";
// import Preloader from './Preloader/Preloader'
import SearchForm from './SearchForm'
import MoviesCardList from './MoviesCardList'
import saveCardData from "../utils/saveCardData"

function Movies () {
  return (
    <main className="content">
      <SearchForm/>
      <MoviesCardList
      cards={saveCardData}/>
    </main>
  );
}

export default Movies;
