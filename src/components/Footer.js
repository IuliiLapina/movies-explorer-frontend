import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__info">
        <p className="footer__copyright">© {new Date().getFullYear()}Movies</p>
        <nav className="footer__column">
          <ul className="footer__column-links">
            <li className="footer__list-item"><a href="https://practicum.yandex.ru/" target="_blank" className="footer__link" rel="noreferrer">Яндекс.Практикум</a></li>
            <li className="footer__list-item"><a href="https://github.com/IuliiLapina/movies-explorer-frontend" target="_blank" className="footer__link" rel="noreferrer">Github</a></li>
            <li className="footer__list-item"><a href="https://ru-ru.facebook.com/"  target="_blank" className="footer__link" rel="noreferrer">Facebook</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
