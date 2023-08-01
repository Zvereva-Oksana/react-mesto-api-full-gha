import React from 'react';
import Card from "./Card";
import {CurrentUserContext} from '../contexts/CurrentUserContext'

const Main = ({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) => {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile" aria-label="Профиль">
                <div className="profile__info">
                    <img onClick={onEditAvatar} src={currentUser.avatar} className="profile__avatar" alt="Ваше фото"/>
                    <div className="profile__wrapper">
                        <div className="profile__name-wrapper">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button onClick={onEditProfile} type="button" className="profile__button-edit"/>
                        </div>
                        <p className="profile__job">{currentUser.about}</p>
                    </div>
                </div>
                <button onClick={onAddPlace} type="button" className="profile__button-add"/>
            </section>
            <section className="element" aria-label="Коллекция карточек">
                {cards.map((card) => (
                    <Card
                        key={card['_id']}
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />)
                )}
            </section>
        </main>
    );
}

export default Main;