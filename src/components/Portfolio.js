import React from "react";
import { Link } from 'react-router-dom';
import arrow from '../images/icon/arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__list-item">
          <Link to="/" className="portfolio__link">Статичный сайт
          <img className="portfolio__image-link" src={arrow} alt="Ссылка стрелка"/>
          </Link>
        </li>
        <li className="portfolio__list-item">
          <Link to="/" className="portfolio__link">Адаптивный сайт
          <img className="portfolio__image-link" src={arrow} alt="Ссылка стрелка"/>
          </Link>
        </li>
        <li className="portfolio__list-item">
          <Link to="/" className="portfolio__link">Одностраничное приложение
          <img className="portfolio__image-link" src={arrow} alt="Ссылка стрелка"/>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
