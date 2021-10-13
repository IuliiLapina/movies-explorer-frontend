import React from "react";
import photo from '../images/photo/photo.png';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="landing__chapter">Студент</h2>
      <div className="about-me__article">
        <div className="about-me__text">
          <h3 className="about-me__title">Виталий</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
            есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно
            начал кодить. С 2015 года работал в компании «СКБ Контур». После того,
            как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и
            ушёл с постоянной работы.
          </p>

          <ul className="about-me__column-links">
            <li className="about-me__list-item"><a href="https://ru-ru.facebook.com/" target="_blank" className="about-me__link" rel="noreferrer" >Facebook</a></li>
            <li className="about-me__list-item"><a href="https://github.com/IuliiLapina" target="_blank" className="about-me__link" rel="noreferrer">Github</a></li>
          </ul>
        </div>
        <img className="about-me__photo" src={photo} alt="Фото фронтенд-разработчика"/>
      </div>
    </section>
  );
}

export default AboutMe;

/*
<h3 className="about-me__title">Юлия</h3>
      <p className="about-me__subtitle">Я родиллась и живу в Санкт-Петербурге, закончила факультет электроэнергетики ГУМРФ им. адм. С.О.Макарова.
       Я люблю слушать музыку, увлекаюсь рисованием. Недавно начала кодить. С 2019 года работала в частной школе. После того, как прошла курс по веб-разработке, ушла с постоянной работы и начала заниматься фрилансом.</p>
*/
