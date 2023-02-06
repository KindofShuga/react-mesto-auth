import PopupWithForm from './PopupWithForm.js';
import { useRef, useState } from 'react';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const imgRef = useRef();
    const [buttonTitle, setButtonTitle] = useState("Обновить аватар");

    function handleSubmit(e) {
        e.preventDefault();
        setButtonTitle("Сохранение...");
        onUpdateAvatar({
            avatar: imgRef.current.value
        });
    }

    return (
        <PopupWithForm
            name="avatar"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={buttonTitle}
            buttonTitle="Сохранить"
            ariaLabel="Сохранить изменения">
            <label className="popup__field">
                <input type="url" id="avatar-input" name="link" className="popup__input popup__input_el_img" ref={imgRef} placeholder="Ссылка на картинку" required />
                <span className="avatar-input-error"></span>
            </label>
        </PopupWithForm>
    );
}