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
    return fetch(`${this._address}/`, {
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._checkResponse);
  }

}

const api = new Api({
  address: "https://api.best-movies-explorer.nomoredomains.club",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
});

export default api;
