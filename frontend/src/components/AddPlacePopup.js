import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [placeName, setPlaceName] = React.useState('');
    const [placeUrl, setPlaceUrl] = React.useState('');

    const handleAddPlaceName = (event) => {
        setPlaceName(event.target.value);
    }

    const handleAddUrlPlace = (event) => {
        setPlaceUrl(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddPlace({name: placeName, link: placeUrl});
    }

    React.useEffect(() => {
        if (isOpen) {
            setPlaceName('');
            setPlaceUrl('')
        }
    }, [isOpen]);

    return (
        <PopupWithForm
            name='add-card'
            isOpen={isOpen}
            title='Новое место'
            buttonName='Создать'
            onClose={onClose}
            nameForm='addPlaceForm'
            onSubmit={handleSubmit}>
            <input type="text"
                   className="popup__input popup__input_type_place"
                   id="place"
                   name="place"
                   placeholder="Название"
                   required
                   minLength="2"
                   maxLength="30"
                   value={placeName}
                   onChange={handleAddPlaceName}/>
            <span className="popup__input-error popup__input-error_type_place"/>
            <input type="url"
                   className="popup__input popup__input_type_link"
                   id="link"
                   name="link"
                   placeholder="Ссылка на картинку"
                   required
                   value={placeUrl}
                   onChange={handleAddUrlPlace}/>
            <span className="popup__input-error popup__input-error_type_link"/>
        </PopupWithForm>
    )
}