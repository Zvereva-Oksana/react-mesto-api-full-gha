import React from "react";
import Fail from '../images/Fail.svg'
import Success from '../images/Success.svg'

const InfoTooltip = ({isOpen, onClose, isError}) => {
    return (
        <div className={`popup ${
            isOpen ? `popup_opened` : `popup_close`}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-icon" onClick={onClose}/>
                <img className="info-tooltip__img" src={isError ? Fail : Success} alt='Massage image'/>
                <p className="info-tooltip__figcaption">{isError
                    ? "Что-то пошло не так!\n" +
                    "Попробуйте ещё раз."
                    : "Вы успешно зарегистрировались!"}</p>
            </div>
        </div>
    )
}

export default InfoTooltip;