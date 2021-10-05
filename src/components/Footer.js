import React from "react";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__info">
        <p className="footer__copyright">© {new Date().getFullYear()}Movies</p>
        <nav className="footer__column">
          <ul className="footer__column-links">
            <li className="footer__list-item"><Link to="https://practicum.yandex.ru/" target="_blank" className="footer__link">Яндекс.Практикум</Link></li>
            <li className="footer__list-item"><Link to="https://github.com/IuliiLapina/movies-explorer-frontend" target="_blank" className="footer__link">Github</Link></li>
            <li className="footer__list-item"><Link to="https://ru-ru.facebook.com/"  target="_blank" className="footer__link">Facebook</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
