import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo/logo.svg';
import Navigation from './Navigation';

function Header({ loggedIn }) {
  const location = useLocation();
  const classNameHeader = `${location.pathname === `/signin` || location.pathname === `/signup` ? `header header_auth` : `header`}`;

  return (
    <header className={classNameHeader}>
      <Link className="header__logo-link" to="/">
        <img className="header__logo" src={logo} alt="Логотип 'Movies'"/>
      </Link>
      {location.pathname === `/signin` || location.pathname === `/signup` ? ('') : <Navigation loggedIn={ loggedIn }/>}

    </header>
  );
}

export default Header;
