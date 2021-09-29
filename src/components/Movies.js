import React from "react";
// import Preloader from './Preloader/Preloader'
import SearchForm from './SearchForm'
import MoviesCardList from './MoviesCardList'
import cardData from "../utils/cardData"


function Movies () {
  return (
    <main className="content">
      <SearchForm/>
      <MoviesCardList
      cards={cardData}/>
    </main>
  );
}

export default Movies;
