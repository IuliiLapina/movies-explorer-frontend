import React from "react";
import { Link } from 'react-router-dom';

function NavTab() {
  return (
        <nav className="promo__menu">
          <ul className="promo__column-links">
            <li className="promo__list-item"><Link to="/" className="promo__link">О проекте</Link></li>
            <li className="promo__list-item"><Link to="/" className="promo__link">Технологии</Link></li>
            <li className="promo__list-item"><Link to="/" className="promo__link">Студент</Link></li>
          </ul>
        </nav>
  );
}

export default NavTab;
