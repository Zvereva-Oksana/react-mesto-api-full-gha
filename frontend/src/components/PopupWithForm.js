import React from "react";

const PopupWithForm = ({name, isOpen, onClose, onSubmit, title, buttonName, children, nameForm}) => {
    return (
        <div className={`popup popup_${name} ${
            isOpen ? `popup_opened` : `popup_close`}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-icon" onClick={onClose}/>
                <h2 className="popup__heading">{title}</h2>
                <form name={nameForm} className={`popup__form popup__form_${name}`} autoComplete="off"
                      onSubmit={onSubmit}>
                    <fieldset className="popup__input-container">
                        {children}
                    </fieldset>
                    <button type="submit" className="popup__button">{buttonName}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;



