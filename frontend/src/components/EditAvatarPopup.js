import React from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {
    const avatarRef = React.useRef();

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    React.useEffect(() => {
        if (isOpen) {
            avatarRef.current.value = '';
        }
    }, [isOpen]);

    return (
        <PopupWithForm
            name='edit-avatar'
            isOpen={isOpen}
            title='Обновить аватар'
            buttonName='Сохранить'
            onClose={onClose}
            nameForm='editAvatarForm'
            onSubmit={handleSubmit}>
            <input type="url"
                   className="popup__input popup__input_type_avatar"
                   id="avatar"
                   name="avatar"
                   placeholder="Ссылка на новый аватар"
                   required
                   ref={avatarRef}
            />
            <span className="popup__input-error popup__input-error_type_avatar"/>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;