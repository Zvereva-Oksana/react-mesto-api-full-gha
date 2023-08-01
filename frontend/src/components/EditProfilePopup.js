import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext'

const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
    }, [currentUser]);

    React.useEffect(() => {
        if (isOpen) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [isOpen]);

    function handleChangeName(event) {
        setName(event.target.value);
    }

    function handleChangeDescription(event) {
        setDescription(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name='edit-profile'
            isOpen={isOpen}
            title='Редактировать профиль'
            buttonName='Сохранить'
            onClose={onClose}
            nameForm='editProfileForm'
            onSubmit={handleSubmit}>
            <input required
                   type="text"
                   className="popup__input popup__input_type_name"
                   id="name"
                   name="name"
                   placeholder="Имя"
                   minLength="2"
                   maxLength="40"
                   value={name}
                   onChange={handleChangeName}
            />
            <span className="popup__input-error popup__input-error_type_name"/>
            <input required
                   type="text"
                   className="popup__input popup__input_type_job"
                   id="job"
                   name="job"
                   placeholder="Вид деятельности"
                   minLength="2"
                   maxLength="200"
                   value={description}
                   onChange={handleChangeDescription}
            />
            <span className="popup__input-error popup__input-error_type_job"/>
        </PopupWithForm>
    )
}

export default EditProfilePopup;