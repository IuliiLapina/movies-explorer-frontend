import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer";
import Movies from "../Movies";
import SavedMovies from "../SavedMovies";
import Register from "../Register";
import Login from "../Login";
import Profile from "../Profile";
import InfoTooltip from "../InfoTooltip";
import PageNotFound from "../PageNotFound";
import Preloader from "../Preloader";


function App() {
  const loggedIn = true;

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
            <Movies/>
            <Footer />
          </Route>

          <Route path="/saved-movies">
            <SavedMovies/>
            <Footer />
          </Route>

          <Route path="/profile">
            <Profile/>
          </Route>

          <Route path="/signup">
            <Register
              title="Добро пожаловать!"
              buttonText="Зарегистрироваться"
            />
          </Route>

          <Route path="/signin">
            <Login
              title="Рады видеть!"
              buttonText="Войти"
            />
          </Route>

          <Route path='*'>
            <PageNotFound/>
          </Route>

        </Switch>
        <InfoTooltip/>
    </div>
  );
}

export default App;