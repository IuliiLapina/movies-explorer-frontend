import React from 'react';
//import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Header from "../Header/Header";
import Main from "../Main";
import Footer from "../Footer"

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);


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
