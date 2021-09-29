import React from "react";
import MoviesCard from "./MoviesCard"

function MoviesCardList () {
  return (
    <section className="content-cards">
      <ul className="cards">
       <MoviesCard/>
      </ul>
      <div className="cards__more-container">
        <button type="button" className="cards__more-btn">Ещё</button>
      </div>
  </section>
  );
}

export default MoviesCardList;

/*function MoviesCardList ({cards}) {
  return (
    <section className="content-cards">
    <ul className="cards">
      {cards.map((card) => (
        <MoviesCard
          card={card}
          key={card._id}
        />
      ))}
    </ul>
  </section>
  );
}
*/