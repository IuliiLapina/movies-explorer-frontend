import React from "react";
import arrow from '../images/icon/arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__list-item">
          <a href="https://github.com/IuliiLapina/how-to-learn" target="_blank" className="portfolio__link" rel="noreferrer">Статичный сайт
          <img className="portfolio__image-link" src={arrow} alt="Ссылка стрелка"/>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a href="https://github.com/IuliiLapina/russian-travel" target="_blank" className="portfolio__link" rel="noreferrer">Адаптивный сайт
          <img className="portfolio__image-link" src={arrow} alt="Ссылка стрелка"/>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a href="https://github.com/IuliiLapina/react-mesto-api-full" target="_blank" className="portfolio__link" rel="noreferrer">Одностраничное приложение
          <img className="portfolio__image-link" src={arrow} alt="Ссылка стрелка"/>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
