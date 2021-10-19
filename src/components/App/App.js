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

  const [cardList, setCardList] = React.useState([]);
  const [savedCardList, setSavedCardList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

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

  function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          setLoggedIn(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  React.useEffect(() => {
    checkToken();
  });

  //выход из профиля
  function handleExit() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("movies");
    localStorage.removeItem("saveMovies");
    setCurrentUser({});
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
    setIsLoading(true);
    getMovies()
      .then((films) => {
        const filteredFilms = searchFilms(searchFilm, isShort, films);
        setCardList(filteredFilms);
        localStorage.setItem("movies", JSON.stringify(filteredFilms));
        if (filteredFilms.length === 0) {
          handleInfoTooltipContent("Ничего не найдено");
          handleInfoTooltipPopupOpen();
        }
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

  function searchFilms(searchFilm, isShort, films) {
    const filterRegexFilm = new RegExp(searchFilm, "ig");
    return films.filter((film) => {
      if (!isShort) {
        return filterRegexFilm.test(film.nameRU);
      } else {
        return (
          film.duration <= DURATION_FILM_IS_SHORT &&
          filterRegexFilm.test(film.nameRU)
        );
      }
    });
  }

  //получить сохраненные фильмы пользователя
  React.useEffect(() => {
    setIsLoading(true);
    if (loggedIn) {
      MainApi.getSavedMovies()
        .then((res) => {
          const savefilm = res.filter((film) => film.owner === currentUser._id)
          localStorage.setItem("saveMovies", JSON.stringify(savefilm));
          setSavedCardList(savefilm);
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

  //поиск по сохраненным фильмам
  function getFilmsSaveCardList(searchFilm, isShort) {
    const films = JSON.parse(localStorage.getItem("saveMovies"));

    if (searchFilm === "") {
      handleInfoTooltipContent("Нужно ввести ключевое слово");
      handleInfoTooltipPopupOpen();
      setSavedCardList(films);
      return;
    }
    setIsLoading(true);
    console.log(films);

    MainApi.getSavedMovies()
      .then((films) => {
        const filteredFilms = searchFilms(searchFilm, isShort, films);
        setSavedCardList(filteredFilms);
        if (filteredFilms.length === 0) {
          handleInfoTooltipContent("Ничего не найдено");
          handleInfoTooltipPopupOpen();
        }
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

  //получить фильмы из локального хранилища
  React.useEffect(() => {
    const localStorageCardList = JSON.parse(localStorage.getItem("movies"));

    if (loggedIn) {
      if (localStorageCardList) {
        setCardList(localStorageCardList);
      }
    }
  }, [loggedIn]);

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
    return savedCardList.some((film) => film.movieId === movie.id);
  }

  function toggleFilmLike(film, isLiked) {
    isLiked ? handleDeleteFilm(film) : handleSaveFilm(film);
  }

  //удалить фильм из сохраненных
  function handleDeleteFilm(film) {
    const movieId = savedCardList.find((f) => f.id === film.movieId)._id;

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
