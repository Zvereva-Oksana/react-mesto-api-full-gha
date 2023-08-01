import React from "react";

const ImagePopup = ({selectedCard, onClose}) => {
    return (
        <div className={`popup picture-popup ${
            selectedCard ? `popup_opened` : `popup_close`}`}>
            {selectedCard && (<div className="picture-popup__figure">
                <div className="picture-popup__wrapper">
                    <img className="picture-popup__img" src={selectedCard.link} alt={selectedCard.name}/>
                    <p className="picture-popup__figcaption">{selectedCard.name}</p>
                    <button className="popup__close-icon" onClick={onClose}/>
                </div>
            </div>)}
        </div>
    )
}

export default ImagePopup;