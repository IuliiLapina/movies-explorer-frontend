const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const getMovies = () => {
  return fetch("https://api.nomoreparties.co/beatfilm-movies", {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    method:'GET',
    })
    .then((res) => checkResponse(res));
}