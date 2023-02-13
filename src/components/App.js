import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
import InfoTooltip from './InfoTooltip'
import api from '../utils/api';
import * as auth from '../utils/auth'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import failIcon from '../images/fail-icon.svg';
import successIcon from '../images/success-icon.svg';

export default function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isFailInfoTooltip, setIsFailInfoTooltip] = useState(false);
  const [isSuccessInfoTooltip, setIsSuccessInfoTooltip] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedDeletedCard, setSelectedDeletedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  function handleLogin({ email, password }) {
    return auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          setUserEmail(email);
          navigate("/");
        }
      })
      .catch(() => {
        setIsFailInfoTooltip(true);
      });
  }

  function handleRegister({ email, password }) {
    return auth.register(email, password)
      .then(() => {
        setIsSuccessInfoTooltip(true);
        navigate("/sign-in");
      })
      .catch(() => {
        setIsFailInfoTooltip(true);
      });
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            navigate("/");
          }
        })
        .catch(err => console.log(`Ошибка: ${err}`));
    }
  }

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
    setIsFailInfoTooltip(false);
    setIsSuccessInfoTooltip(false);
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
    tokenCheck();
    if (loggedIn) {
      api.getUserAndCard()
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch(err => console.log(`Ошибка: ${err}`));
    }
  }, [loggedIn]);
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header userEmail={userEmail} />
        <main>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onConfirm={handleConfirmPopupClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardClickDelete={handleDeletedCardClick}
                cards={cards}
              />
            }
            />
            <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
            <Route path="/sign-up" element={<Register handleRegister={handleRegister} />} />
            <Route path="*" element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <Navigate to="/sign-in" />
              )
            }
            />
          </Routes>
        </main>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          deletedCard={selectedDeletedCard}
        />
        <InfoTooltip
          isOpen={isSuccessInfoTooltip || isFailInfoTooltip}
          onClose={closeAllPopups}
          isSuccessInfoTooltip={isSuccessInfoTooltip}
        />
      </CurrentUserContext.Provider>
    </>
  );
};
