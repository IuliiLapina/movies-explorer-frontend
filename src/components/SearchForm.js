import React from "react";

function SearchForm({ onSubmitSearchForm, searchFilm, setSearchFilm, setIsShortFilm }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmitSearchForm();
  }

  function handleChangeSearchInput(e) {
    setSearchFilm(e.target.value)
  }

  function handleChangeChekxbox(e) {
      if (e.target.checked) {
        setIsShortFilm(true);
      } else {
        setIsShortFilm(false);
      }
  }

  return (
    <section className="search">
      <form
        className="search__form"
        name="form-search"
        onSubmit={handleSubmit}
      >
        <input
          className="search__input"
          id="film-input"
          type="search"
          placeholder="Фильм"
          name="film"
          onChange={handleChangeSearchInput}
          value={searchFilm}
        />

        <button
          className="search__button"
          type="submit"
          value="">
        </button>
        <label className="checkbox">
          <input
            className="checkbox__input"
            type="checkbox"
            onChange={handleChangeChekxbox}
          />
          <div className="checkbox__container"></div>
          Короткометражки
        </label>
      </form>
    </section>
  );
}

export default SearchForm;
