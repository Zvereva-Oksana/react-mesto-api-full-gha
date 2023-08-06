import React from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext'

const Card = ({onCardClick, card, onCardLike, onCardDelete}) => {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser['_id'];
    console.log(card.owner, 'card.owner');
    console.log(currentUser['_id'], 'currentUser[\'_id\']');
    console.log(isOwn, 'isOwn')
    const isLiked = card.likes.includes(currentUser['_id']);
    const cardLikeButtonClassName = (
        `card__vector ${isLiked && 'card__vector_active'}`
    );

    const handleImageClick = () => {
        onCardClick(card)
    }

    const handleCardLike = () => {
        onCardLike(card)
    }

    const handleDeleteClick = () => {
        onCardDelete(card)
    }

    return (
        <div id={card.id} className="card">
            {isOwn && <button className="card__delete" onClick={() => handleDeleteClick()}/>}
            <img className="card__mask" src={card.link} alt={card.name} onClick={() => handleImageClick()}/>
            <div className="card__wrapper">
                <h2 className="card__name">{card.name}</h2>
                <div className="card__like-wrapper">
                    <button type="button" className={cardLikeButtonClassName} onClick={() => handleCardLike()}/>
                    <span className="card__count-likes">{card.likes.length}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;