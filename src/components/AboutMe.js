import React from "react";
import photo from "../images/photo/photo.png";

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="landing__chapter">Студент</h2>
      <div className="about-me__article">
        <div className="about-me__text">
          <h3 className="about-me__title">Юлия</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 24 года</p>
          <p className="about-me__description">
            Еще с университета поняла, что хочу в IT. Сердце ёкнуло на frontend -
            обожаю сразу видеть результат своей работы. Зачитываюсь блогами о
            веб-стандартах и интересных решениях нестандартных задач. Упорство и
            жажда знаний не позволяют мне опускать руки на пути к мечте делать
            жизнь людей лучше, создавая качественный web-продукт. В свободное
            время хожу по лесам и занимаюсь медитацией.
          </p>

          <ul className="about-me__column-links">
            <li className="about-me__list-item">
              <a
                href="https://ru-ru.facebook.com/"
                target="_blank"
                className="about-me__link"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
            <li className="about-me__list-item">
              <a
                href="https://github.com/IuliiLapina"
                target="_blank"
                className="about-me__link"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <img
          className="about-me__photo"
          src={photo}
          alt="Фото фронтенд-разработчика"
        />
      </div>
    </section>
  );
}

export default AboutMe;
