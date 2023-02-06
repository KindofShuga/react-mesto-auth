import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({ cards, onEditProfile, onAddPlace, onConfirm, onEditAvatar, onCardClick, onCardClickDelete, onCardLike }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-container">
                    <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
                    <button type="button" aria-label="Редактировать аватар" className="button profile__avatar-edit-btn" onClick={onEditAvatar} />
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <button type="button" aria-label="Редактировать профиль" className="button profile__edit-btn" onClick={onEditProfile} />
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button type="button" aria-label="Добавить место" className="button profile__add-btn" onClick={onAddPlace} />
            </section>
            <section>
                <ul className="cards">
                    {cards.map((card) => {
                        return <Card
                            cardInfo={card}
                            key={card._id}
                            onCardClick={onCardClick}
                            onCardClickDelete={onCardClickDelete}
                            onCardLike={onCardLike}
                            onConfirm={onConfirm}
                        />
                    })}
                </ul>
            </section>
        </main>
    );
};