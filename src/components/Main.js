import React from "react";
import Promo from './Promo'
import AboutProject from './AboutProject'
import Techs from './Techs'

function Main() {
  return (
    <main className="content">
      <Promo/>
      <AboutProject/>
      <Techs/>
    </main>
  );
}

export default Main;
