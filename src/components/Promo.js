import React from "react";
import NavTab from './NavTab'

function Promo() {
  return (
    <section className="promo">
      <div className="promo__bakground">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <NavTab/>
      </div>
    </section>
  );
}

export default Promo;
