import React from 'react';
import { Routes, Route, Switch } from 'react-router-dom';
import Header from './Header.js';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmPopup from './ConfirmPopup.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedDeletedCard, setSelectedDeletedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleUpdateUser(data) {
    api.addProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleUpdateAvatar(data) {
    api.addAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }
  function handleConfirmPopupClick() {
    setIsConfirmPopupOpen(true);
  }
  function handleDeletedCardClick(card) {
    setSelectedDeletedCard(card);
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cardsArray) => cardsArray.filter((oneCard) => oneCard._id !== card._id))
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
  }


  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.toggleLike(card._id, !isLiked)
      .then((likedCard) => {
        setCards((cardsArray) => cardsArray.map((oneCard) => oneCard._id === card._id ? likedCard : oneCard));
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }

  useEffect(() => {
    api.getUserAndCard()
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }, []);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <main>
          <Routes>
            {/* <Route path="mesto-react-auth/" element={
              <ProtectedRoute element={
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onConfirm={handleConfirmPopupClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardClickDelete={handleDeletedCardClick}
                  cards={cards}
                />
              } loggedIn={this.state.loggedIn}
              />
            }
            /> */}
            <Route path="mesto-react-auth/sign-up" element={<Register />} />
            <Route path="mesto-react-auth/sign-in" element={<Login />} />
          </Routes>
        </main>
        <Footer />
        {isEditProfilePopupOpen &&
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />}
        {isAddPlacePopupOpen &&
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />}
        {isEditAvatarPopupOpen &&
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />}
        {selectedCard &&
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />}
        {isConfirmPopupOpen &&
          <ConfirmPopup
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            deletedCard={selectedDeletedCard}
          />}
      </CurrentUserContext.Provider>
    </>
  );
};
