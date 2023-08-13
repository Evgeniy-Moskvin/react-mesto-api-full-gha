import React from 'react';
import logo from '../images/logo.svg';
import { useLocation, Link } from 'react-router-dom';

const Header = ({ loggedIn, userData, handleLogOut }) => {
  const location = useLocation();

  return (
    <header className="header container">
      <a href="#" className="logo">
        <img src={logo} alt="Логотип сервиса Mesto" className="logo__image"/>
      </a>

      <nav className="user-navigate">
        <ul className="user-navigate__list">
          {!loggedIn && (
            <>
              {location.pathname === '/sign-in' && (
                <li className="user-navigate__item">
                  <Link to="/sign-up" className="user-navigate__link opacity-effect">
                    Регистрация
                  </Link>
                </li>
              )}
              {location.pathname === '/sign-up' && (
                <li className="user-navigate__item">
                  <Link to="/sign-in" className="user-navigate__link opacity-effect">
                    Войти
                  </Link>
                </li>
              )}
            </>
          )}

          {loggedIn && (
            <>
              <li className="user-navigate__item">
                <a href={`mailto:${userData.email}`} className="user-navigate__link opacity-effect">{userData.email}</a>
              </li>

              <li className="user-navigate__item">
                <a href="#" className="user-navigate__link user-navigate__link_logout opacity-effect" onClick={handleLogOut}>Выйти</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
