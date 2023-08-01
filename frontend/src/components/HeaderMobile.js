import {Link} from "react-router-dom";
import logo from "../images/logo.svg";
import React from "react";

const HeaderMobile = ({email, onSignOut}) => {
    const [isOpen, setOpen] = React.useState(false);
    const toggleMenu = () => {
        setOpen(!isOpen)
    }

    return (
        <header className='header header_mobile'>
            {isOpen && <div className='header__wrapper header__wrapper-mail'>
                <p className='header__email'>{email}</p>
                <Link to="/sign-in" onClick={onSignOut}
                      className="header__link header__link_mobile header__link_color">Выйти</Link>
            </div>}
            <div className='header__wrapper-logo'>
                <img src={logo} className="logo" alt="Логотип Mesto Russia"/>
                {isOpen
                    ? <button type="button" className="header__close-icon" onClick={toggleMenu}/>
                    : <button className="header__burger-icon" onClick={toggleMenu}>
                        <div className="container">
                            <div className="container__line"/>
                            <div className="container__line"/>
                            <div className="container__line"/>
                            </div>
                    </button>
                    }
                    </div>
                    </header>
                    )
                }

                export default HeaderMobile