import React from 'react';
//import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Header from "../Header/Header";
import Main from "../Main";
import Footer from "../Footer";
import Movies from "../Movies";
import SavedMovies from "../SavedMovies";
import PageNotFound from "../PageNotFound";
import Register from "../Register";
import Login from "../Login";
import Profile from "../Profile";
import InfoTooltip from "../InfoTooltip";

function App() {
  const loggedIn = false;

  return (
    <div className ="page">
      <Header
        loggedIn = {loggedIn}
      />
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
/*
      <Header
        loggedIn = {loggedIn}
      />
      <Footer/>
      */