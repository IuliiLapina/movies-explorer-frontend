import React from 'react';
//import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Header from "../Header/Header";
//import Main from "../Main";
import Footer from "../Footer"
import Movies from "../Movies"

function App() {
  const loggedIn = true;

  return (
    <div className ="page">
      <Header
        loggedIn = {loggedIn}
      />
      <Movies/>
      <Footer/>
    </div>
  );
}

export default App;
