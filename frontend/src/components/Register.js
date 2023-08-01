import React from 'react';
import {Link} from 'react-router-dom';
import * as userAuth from '../utils/userAuth'
import FormRegisterAndLogin from "./FormRegisterAndLogin";

const Register = ({addInfoTooltipFalse, addInfoTooltipSucces, setEmail, setPassword, email, password, navigate}) => {

    const handleSubmitRegisterForm = (event) => {
        event.preventDefault();
        userAuth.register(password, email).then(() => {
            addInfoTooltipSucces();
            navigate('/sign-in');
        }).catch(() => addInfoTooltipFalse())
    }

    return (
        <FormRegisterAndLogin
            header='Регистрация'
            handleSubmitForm={handleSubmitRegisterForm}
            nameForm='register'
            autoComplete='off'
            nameButton='Зарегистрироваться'
            setEmail={setEmail}
            setPassword={setPassword}
            email={email}
            password={password}>
            <div className="register__signin">
                <p className='register__question'>Уже зарегистрированы?</p>
                <Link to="/sign-in" className="register__login-link">Войти</Link>
            </div>
        </FormRegisterAndLogin>
    )
}

export default Register;
