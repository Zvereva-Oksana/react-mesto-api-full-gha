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
                <Link to="/signin" onClick={onSignOut} className="header__link header__link_color">Выйти</Link>}
                {currentPath === '/signup' && <Link to="/signin" className="header__link">Войти</Link>}
                {currentPath === '/signin' && <Link to="/signup" className="header__link">Регистрация</Link>}
            </div>
        </header>
    );
}

export default Header;
