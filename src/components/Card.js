import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ cardInfo, onCardClick, onCardLike, onCardClickDelete, onConfirm }) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = cardInfo.owner._id === currentUser._id;
    const isLiked = cardInfo.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `cards__like ${isLiked && 'cards__like_active'}`
    );
    function handleClick() {
        onCardClick(cardInfo);
    }
    function handleLikeClick() {
        onCardLike(cardInfo);
    }
    function handleDeleteClick() {
        onCardClickDelete(cardInfo);
        onConfirm();
    }
    return (
        <li className="cards__item">
            <img src={cardInfo.link} alt={cardInfo.name} className="cards__image" onClick={handleClick} />
            <div className="cards__name">
                <h3 className="cards__title">{cardInfo.name}</h3>
                <div>
                    <button type="button" aria-label="Поставить нравится" className={cardLikeButtonClassName} onClick={handleLikeClick} ></button>
                    <p className="cards__likes-amount">{String(cardInfo.likes.length)}</p>
                </div>
                {isOwn && <button type="button" aria-label="Удалить место" className="button cards__delete" onClick={handleDeleteClick} />}
            </div>
        </li>
    );
};