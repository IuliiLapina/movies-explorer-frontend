/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import ProtectedRoute from "../ProtectedRoute";
import { DURATION_FILM_IS_SHORT } from "../../utils/constans";

import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer";
import Register from "../Register";
import Login from "../Login";
import Profile from "../Profile";
import Movies from "../Movies";
import SavedMovies from "../SavedMovies";
import InfoTooltip from "../InfoTooltip";
import PageNotFound from "../PageNotFound";

import { MainApi } from "../../utils/MainApi";
import { getMovies } from "../../utils/MoviesApi";
import * as auth from "../../utils/auth.js";

function App() {
  const history = useHistory();

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] =
    React.useState(false);
  const [titleInfoTooltipPopup, setTitleInfoTooltipPopup] = React.useState("");
  const [subtitleInfoTooltipPopup, setSubtitleInfoTooltipPopup] =
    React.useState("");

  const [allFlms, setAllFlms] = React.useState([]);
  const [cardList, setCardList] = React.useState([]);
  const [savedCardList, setSavedCardList] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);

  //Обработчики открытия попапов
  function handleInfoTooltipPopupOpen() {
    setInfoTooltipPopupOpen(true);
  }

  //Обработчик закрытия попапов
  function closeAllPopups() {
    setInfoTooltipPopupOpen(false);
  }

  function handleInfoTooltipContent(title, subtitle) {
    setTitleInfoTooltipPopup(title);
    setSubtitleInfoTooltipPopup(subtitle);
  }

  //регистрация пользователя
  function authRegister(name, email, password) {
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then(() => {
        history.push("/signin");
        authAuthorize(email, password);
        handleInfoTooltipContent("Вы успешно зарегистрировались!");
        handleInfoTooltipPopupOpen();
      })
      .catch((err) => {
        handleInfoTooltipContent(
          "Что-то пошло не так!",
          "Попробуйте ещё раз. " + err
        );
        handleInfoTooltipPopupOpen();
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  //авторизация пользователя
  function authAuthorize(email, password) {
    setIsLoading(true);
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
        }
        localStorage.removeItem("movies");
        localStorage.removeItem("saveMovies");
        setLoggedIn(true);
        setCurrentUser(res.user);
        history.push("/movies");
      })
      .catch((err) => {
        handleInfoTooltipContent(
          "Что-то пошло не так!",
          "Попробуйте ещё раз. " + err
        );
        handleInfoTooltipPopupOpen();
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  //выход из профиля
  function handleExit() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("movies");
    localStorage.removeItem("saveMovies");
    setCurrentUser({ name: "", email: "" });
    setCardList([]);
    setSavedCardList([]);
    history.push("/");
  }

  //обновление данных пользователя
  function onUpdateUserInfo(email, name) {
    setIsLoading(true);
    MainApi.setUserData(email, name)
      .then((res) => {
        setCurrentUser(res);
        handleInfoTooltipContent("Изменения сохранены.");
        handleInfoTooltipPopupOpen();
      })
      .catch((err) => {
        handleInfoTooltipContent(
          "Что-то пошло не так!",
          "Попробуйте ещё раз. " + err
        );
        handleInfoTooltipPopupOpen();
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  //получить фильмы с стороннего api по поисковому запросу
  function getFilmsCardList(searchFilm, isShort) {
    if (searchFilm === "") {
      handleInfoTooltipContent("Нужно ввести ключевое слово");
      handleInfoTooltipPopupOpen();
      setCardList([]);
      localStorage.setItem("movies", JSON.stringify([]));
      return;
    }
    const films = JSON.parse(localStorage.getItem("allApiFilms"));

    if (films) {
      setCardList(searchFilms(searchFilm, isShort, films));
      localStorage.setItem(
        "movies",
        JSON.stringify(searchFilms(searchFilm, isShort, films))
      );
    } else {
      setIsLoading(true);
      getMovies()
        .then((films) => {
          const allApiFilms = films.map((film) => {
            return {
              country: film.country ? film.country : "none",
              director: film.director ? film.director : "none",
              duration: film.duration ? film.duration : 0,
              year: film.year ? film.year : 0,
              description: film.description ? film.description : "none",
              image: `https://api.nomoreparties.co${film.image.url}`,
              trailer: film.trailerLink
                ? film.trailerLink
                : `https://www.youtube.com/`,
              nameRU: film.nameRU ? film.nameRU : film.nameEN,
              nameEN: film.nameEN ? film.nameEN : film.nameRU,
              thumbnail: `https://api.nomoreparties.co${film.image.formats.thumbnail.url}`,
              movieId: film.id,
            };
          });
          setAllFlms(allApiFilms);
          localStorage.setItem("allApiFilms", JSON.stringify(allApiFilms));

          const filteredFilms = searchFilms(searchFilm, isShort, allApiFilms);
          setCardList(filteredFilms);
          localStorage.setItem("movies", JSON.stringify(filteredFilms));
        })
        .catch((err) => {
          handleInfoTooltipContent(
            "Во время запроса произошла ошибка.",
            "Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
          handleInfoTooltipPopupOpen();
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }
  }

  function searchFilms(searchFilm, isShort, films) {
    const filterRegexFilm = new RegExp(searchFilm, "ig");
    const result = films.filter((film) => {
      if (!isShort) {
        return filterRegexFilm.test(film.nameRU);
      } else {
        return (
          film.duration <= DURATION_FILM_IS_SHORT &&
          filterRegexFilm.test(film.nameRU)
        );
      }
    })
    if (result.length === 0) {
      handleInfoTooltipContent("Ничего не найдено");
      handleInfoTooltipPopupOpen();
    }
    return result;
  }

  //поиск по сохраненным фильмам
  function getFilmsSaveCardList(searchFilm, isShort) {
    const films = JSON.parse(localStorage.getItem("saveMovies"));
    console.log(films);

    if (searchFilm === "") {
      handleInfoTooltipContent("Нужно ввести ключевое слово");
      handleInfoTooltipPopupOpen();
      setSavedCardList(films);
    } else {
      const filteredFilms = searchFilms(searchFilm, isShort, films);
      setSavedCardList(filteredFilms);
      console.log(filteredFilms);
    }
  }

  //добавить фильм в сохранённые фильмы
  function handleSaveFilm(film) {
    MainApi.addSaveFilm(film)
      .then((newFilm) => {
        setSavedCardList([newFilm, ...savedCardList]);
        localStorage.setItem(
          "saveMovies",
          JSON.stringify([newFilm, ...savedCardList])
        );
      })
      .catch((err) => {
        handleInfoTooltipContent(
          "Что-то пошло не так!",
          "Попробуйте ещё раз. " + err
        );
        handleInfoTooltipPopupOpen();
        console.log(err);
      });
  }

  //проверить наличие лайка
  function checkLikeFilm(movie) {
    return savedCardList.some((film) => film.movieId === movie.movieId);
  }

  function toggleFilmLike(film, isLiked) {
    isLiked ? handleDeleteFilm(film) : handleSaveFilm(film);
  }

  //удалить фильм из сохраненных
  function handleDeleteFilm(film) {
    const movieId = savedCardList.find((f) => f.movieId === film.movieId)._id;

    MainApi.deleteSaveFilm(movieId)
      .then(() => {
        setSavedCardList(savedCardList.filter((f) => f._id !== movieId));
      })
      .catch((err) => {
        handleInfoTooltipContent(
          "Что-то пошло не так!",
          "Попробуйте ещё раз. " + err
        );
        handleInfoTooltipPopupOpen();
        console.log(err);
      });
  }

  function handleDeleteSaveFilm(film) {
    MainApi.deleteSaveFilm(film._id)
      .then(() => {
        setSavedCardList(savedCardList.filter((f) => f._id !== film._id));
      })
      .catch((err) => {
        handleInfoTooltipContent(
          "Что-то пошло не так!",
          "Попробуйте ещё раз. " + err
        );
        handleInfoTooltipPopupOpen();
        console.log(err);
      });
  }

  //проверка токена
  React.useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
          history.push("/movies");
        })
        .catch((err) => console.log(err));
    }
  }, [history]);

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/movies");
      MainApi.getUserData()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => console.log(err));
    }
  }, [history, loggedIn]);

  //получить фильмы из локального хранилища
  React.useEffect(() => {
    const localStorageCardList = JSON.parse(localStorage.getItem("movies"));

    if (loggedIn) {
      if (localStorageCardList) {
        setCardList(localStorageCardList);
      }
    }
  }, [loggedIn]);

  //получить сохраненные фильмы пользователя
  React.useEffect(() => {
    setIsLoading(true);
    if (loggedIn) {
      MainApi.getSavedMovies()
        .then((res) => {
          localStorage.setItem("saveMovies", JSON.stringify(res));
          setSavedCardList(res);
        })
        .catch((err) => {
          handleInfoTooltipContent(
            "Во время запроса произошла ошибка.",
            "Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
          handleInfoTooltipPopupOpen();
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} />
        <Switch>
          <Route exact path="/">
            <Main />
            <Footer />
          </Route>

          <ProtectedRoute
            exact
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            films={cardList}
            getFilmsCardList={getFilmsCardList}
            isLoading={isLoading}
            checkLikeFilm={checkLikeFilm}
            toggleFilmLike={toggleFilmLike}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            films={savedCardList}
            getFilmsSaveCardList={getFilmsSaveCardList}
            isLoading={isLoading}
            checkLikeFilm={checkLikeFilm}
            handleDeleteFilm={handleDeleteSaveFilm}
          />
          <ProtectedRoute
            exact
            path="/profile"
            isLoading={isLoading}
            loggedIn={loggedIn}
            component={Profile}
            onUpdateUserInfo={onUpdateUserInfo}
            handleExit={handleExit}
          />

          <Route path="/signup">
            <Register
              isLoading={isLoading}
              title="Добро пожаловать!"
              buttonText="Зарегистрироваться"
              authRegister={authRegister}
            />
          </Route>

          <Route path="/signin">
            <Login
              isLoading={isLoading}
              title="Рады видеть!"
              buttonText="Войти"
              authAuthorize={authAuthorize}
            />
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        <InfoTooltip
          title={titleInfoTooltipPopup}
          subtitle={subtitleInfoTooltipPopup}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
