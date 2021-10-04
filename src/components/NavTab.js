import React from "react";
import { HashLink as Link } from 'react-router-hash-link';

function NavTab() {
  return (
        <nav className="promo__menu">
          <ul className="promo__column-links">
            <li className="promo__list-item"><Link to="#about-project" className="promo__link">О проекте</Link></li>
            <li className="promo__list-item"><Link to="#techs" className="promo__link">Технологии</Link></li>
            <li className="promo__list-item"><Link to="#about-me" className="promo__link">Студент</Link></li>
          </ul>
        </nav>
  );
}

export default NavTab;
