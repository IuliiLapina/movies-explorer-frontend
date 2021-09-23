import React from 'react';
import logo from '../../images/logo/logo.svg';
import Navigation from '../Navigation'
function Header({ loggedIn }) {
  return (
    <header className="header">
        <img className="header__logo" src={logo} alt="Логотип 'Movies'" />
        <Navigation
          loggedIn={ loggedIn }
        />
    </header>
  );
}

export default Header;
