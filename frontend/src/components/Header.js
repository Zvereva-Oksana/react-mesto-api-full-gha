import React from 'react';
import logo from '../images/logo.svg'
import {Link} from "react-router-dom";


const Header = ({email, onSignOut, isLoggedIn}) => {
    const currentPath = window.location.pathname;
    return (
        <header className='header'>
            <img src={logo} className="logo" alt="Логотип Mesto Russia"/>
            <div className='header__wrapper'>
                {isLoggedIn && <p className='header__email'>{email}</p>}
                {currentPath === '/' &&
                <Link to="/sign-in" onClick={onSignOut} className="header__link header__link_color">Выйти</Link>}
                {currentPath === '/sign-up' && <Link to="/sign-in" className="header__link">Войти</Link>}
                {currentPath === '/sign-in' && <Link to="/sign-up" className="header__link">Регистрация</Link>}
            </div>
        </header>
    );
}

export default Header;
