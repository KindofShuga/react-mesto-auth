import PopupWithForm from './PopupWithForm.js';
import { useState } from 'react';
export default function ConfirmPopup({ isOpen, onClose, onCardDelete, deletedCard }) {
    const [buttonTitle, setButtonTitle] = useState("Да");
    function handleSubmit(e) {
        e.preventDefault();
        setButtonTitle("Удаление...")
        onCardDelete(deletedCard);
    }
    return (
        <PopupWithForm
            name="confirm"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title="Вы уверены?"
            buttonTitle={buttonTitle}
            ariaLabel="Удалить карточку"
        >
        </PopupWithForm>
    );
}