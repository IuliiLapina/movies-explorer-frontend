class Api {
  constructor({ address, headers }) {
    this._address = address;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  //получить инфо пользователя с сервера
  getUserData() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._checkResponse);
  }

  //обновить инфо пользователя на сервере
  setUserData(email, name) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email,
        name
      })
    })
    .then(this._checkResponse);
  }

  getSavedMovies() {
    return fetch(`${this._address}/movies`, {
      method:'GET',
      headers: this._headers,
      credentials: 'include',
      })
      .then(this._checkResponse);
  }

  addSaveFilm(film) {
    return fetch(`${this._address}/movies`, {
      method:'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        country: film.country,
        director: film.director,
        duration: film.duration,
        year: film.year,
        description: film.description,
        image: `https://api.nomoreparties.co${film.image.url}`,
        trailer: film.trailerLink,
        thumbnail: `https://api.nomoreparties.co${film.image.url}`,
        movieId: film.id,
        nameRU: film.nameRU,
        nameEN: film.nameEN,
      })
    })
      .then(this._checkResponse);
  }

  deleteSaveFilm(movieId) {
    return fetch(`${this._address}/movies/${movieId}`, {
      method:'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  }
}

export const MainApi = new Api({
  address: "https://api.best-movies-explorer.nomoredomains.club",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
});