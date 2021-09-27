import React from "react";

function AboutProject () {
  return (
    <section className="about-project">
      <h2 className="landing__chapter">О проекте</h2>
      <div className="about-project__content">
        <div className="about-project__article">
          <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__article">
          <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__duration">
        <p className="about-project__duration-time about-project__duration-time_green">1 неделя</p>
        <p className="about-project__duration-time">4 недели</p>
        <p className="about-project__duration-subtitle">Back-end</p>
        <p className="about-project__duration-subtitle">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject ;
