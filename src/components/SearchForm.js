import React from "react";

function SearchForm  () {
  return (
    <section className="search">
      <form className="search__form" name="form-search">
        <input className="search__input" id="film-input" type="search" placeholder="Фильм" name="film" required="" value=""></input>
        <button className="search__button" type="submit"  value=""></button>
        <label className="checkbox">
          <input className="checkbox__input" type="checkbox"></input>
          <div className="checkbox__container"></div>
          Короткометражки
        </label>
      </form>
    </section>
  );
}

export default SearchForm;