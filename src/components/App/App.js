import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

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
import Preloader from "../Preloader";

import cardData from "../../utils/cardData";
import saveCardData from "../../utils/saveCardData";

import api from '../../utils/api';
import * as auth from '../../utils/auth.js';
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function App() {
  const history = useHistory();

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');

  const [selectedCard, setSelectedCard] = React.useState({});
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false);
  const [titleInfoTooltipPopup, setTitleInfoTooltipPopup] = React.useState('');
  const [subtitleInfoTooltipPopup, setSubtitleInfoTooltipPopup] = React.useState('');

  //Обработчики открытия попапов
  function handleInfoTooltipPopupOpen() {
    setInfoTooltipPopupOpen(true)
  }

  //Обработчик закрытия попапов
  function closeAllPopups() {
    setInfoTooltipPopupOpen(false);

    setSelectedCard({}); //пустой объект для очистки данных карточки
  }

  function handleInfoTooltipContent(title, subtitle) {
    setTitleInfoTooltipPopup(title);
    setSubtitleInfoTooltipPopup(subtitle);
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    // если у пользователя есть токен в localStorage,
    // эта функция проверит, действующий он или нет
    if (jwt){
      auth.getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          setName(res.data.name);

          history.push('/movies');
        })
      .catch((err) => console.log(err));
    }
  }, [history]);

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/movies');
      api
      .getUserData()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  //регистрация пользователя
  function authRegister(name, email, password) {
    auth
    .register(name, email, password)
      .then(() => {
        handleInfoTooltipContent('Вы успешно зарегистрировались!');
        handleInfoTooltipPopupOpen();
        history.push('/signin');
      })
      .catch((err) => {
        handleInfoTooltipContent('Что-то пошло не так! Попробуйте ещё раз.');
        handleInfoTooltipPopupOpen();
        console.log(err);
      })
  }

  //авторизация пользователя
  function authAuthorize(password, email) {
    auth.authorize(password, email)
        .then((res) => {
          if (res) {
            localStorage.setItem('token', res.token)
            setEmail(res.email);
            setCurrentUser(res);
            setLoggedIn(true);
            history.push('/movies');
            handleInfoTooltipContent('Вы успешно авторизовались!');
            handleInfoTooltipPopupOpen();
        }
    })
    .catch((err) => {
      handleInfoTooltipContent('Что-то пошло не так! Попробуйте ещё раз.');
      handleInfoTooltipPopupOpen();
      console.log(err);
    })
  }

  function checkToken() {
    const token = localStorage.getItem('token')

    if (token) {
      auth.getContent(token)
        .then(res => {
          setEmail(res.data.email);
          setLoggedIn(true)
        })
        .catch(e => { console.log(e) })
    }
  }

  //выход из профиля
  function handleExit () {
    setLoggedIn(false);
    setEmail('');
    localStorage.removeItem('token');
    history.push('/signin');
  }

  React.useEffect(() => {
    checkToken();
  })

  return (
    <div className ="page">
        <Header
          loggedIn = {loggedIn}
        />
        <Switch>
          <Route exact path="/">
            <Main/>
            <Footer />
          </Route>

          <Route path="/movies">
            <Movies
              films={cardData}
            />
            <Footer />
          </Route>

          <Route path="/saved-movies">
            <SavedMovies
              films={saveCardData}
            />
            <Footer />
          </Route>

          <Route path="/profile">
            <Profile
              name={name}
              email={email}
              handleExit={handleExit}
            />
          </Route>

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

          <Route path='*'>
            <PageNotFound/>
          </Route>

        </Switch>
        <InfoTooltip
          title={titleInfoTooltipPopup}
          subtitle={subtitleInfoTooltipPopup}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />
    </div>
  );
}

export default App;