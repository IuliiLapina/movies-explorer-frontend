import React from "react";
import { Link } from 'react-router-dom';
import arrow from '../images/arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__list-item">
          <Link to="/" className="portfolio__link">Статичный сайт</Link>
          <img className="portfolio__image-link" src={arrow} alt="Ссылка стрелка"/>
        </li>
        <li className="portfolio__list-item">
          <Link to="/" className="portfolio__link">Адаптивный сайт</Link>
          <img className="portfolio__image-link" src={arrow} alt="Ссылка стрелка"/>
        </li>
        <li className="portfolio__list-item">
          <Link to="/" className="portfolio__link">Одностраничное приложение</Link>
          <img className="portfolio__image-link" src={arrow} alt="Ссылка стрелка"/>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
