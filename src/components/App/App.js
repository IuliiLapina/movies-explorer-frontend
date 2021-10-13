import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import ProtectedRoute from "../ProtectedRoute";

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
  const [isLoading, setIsLoading] = React.useState(false);

  //проверка токена
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
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
      });
  }

  //авторизация пользователя
  function authAuthorize(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.token);
          setCurrentUser(res);
          console.log("авторизация" + res.email);

          setLoggedIn(true);
          history.push("/movies");
        }
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

  //выход из профиля
  function handleExit() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    history.push("/signin");
  }

  React.useEffect(() => {
    checkToken();
  });

  //обновление данных пользователя
  function onUpdateUserInfo(email, name) {
    MainApi.setUserData(email, name)
      .then((res) => {
        setCurrentUser(res);
        console.log(res);
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
      });
  }

  //получить фильмы с стороннего api по поисковому запросу
  function getMoviesCardList(searchFilm, isShort) {
    if (searchFilm === "") {
      handleInfoTooltipContent("Нужно ввести ключевое слово");
      handleInfoTooltipPopupOpen();
      setCardList([]);
      localStorage.setItem("films", JSON.stringify([]));
      return;
    }
    setIsLoading(true);
    getMovies()
      .then((films) =>{
        const filteredFilms = films.filter((film) => {
          const filterRegexFilm = new RegExp(searchFilm, 'ig');
          if (!isShort) {
            return filterRegexFilm.test(film.nameRU)
          } else {
            return film.duration <= 40 && filterRegexFilm.test(film.nameRU)
          }
        })
        setCardList(filteredFilms);
        localStorage.setItem("films", JSON.stringify(filteredFilms));
        if (filteredFilms.length === 0) {
          handleInfoTooltipContent("Ничего не найдено");
          handleInfoTooltipPopupOpen();
        }
      })
      .catch((err) => {
        handleInfoTooltipContent(
          "Во время запроса произошла ошибка.", "Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
        handleInfoTooltipPopupOpen();
        console.log(err);
      })
      .finally(() => setIsLoading(false))
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
            getMoviesCardList={getMoviesCardList}
            isLoading={isLoading}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            films={cardList}
          />
          <ProtectedRoute
            exact
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onUpdateUserInfo={onUpdateUserInfo}
            handleExit={handleExit}
          />

          <Route path="/signup">
            <Register
              title="Добро пожаловать!"
              buttonText="Зарегистрироваться"
              authRegister={authRegister}
            />
          </Route>

          <Route path="/signin">
            <Login
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
