import React from "react";

const FormRegisterAndLogin = ({
                                  header, handleSubmitForm, nameForm,
                                  autoComplete, nameButton, setEmail, setPassword, email, password, children
                              }) => {
    return (
        <div className="register">
            <div className='register__wrapper'>
                <p className="register__welcome">
                    {header}
                </p>
                <form onSubmit={handleSubmitForm} className="register__form" name={nameForm}>
                    <input
                        className='register__input'
                        placeholder="Email"
                        id="useremail"
                        name="useremail"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete={autoComplete}
                        required/>
                    <input
                        className='register__input'
                        placeholder="Пароль"
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        autoComplete={autoComplete}
                        onChange={(event) => setPassword(event.target.value)}
                        required/>
                    <button
                        type="submit"
                        className="register__button">
                        {nameButton}
                    </button>
                </form>
                {children}
            </div>
        </div>
    );
}

export default FormRegisterAndLogin;