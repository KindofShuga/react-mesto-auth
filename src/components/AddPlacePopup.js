import PopupWithForm from './PopupWithForm.js';
import { useState } from 'react';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [formValues, setFormValues] = useState({ name: "", link: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({ ...prevState, [name]: value }));
    }
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: formValues.name,
            link: formValues.link
        });
    }

    return (
        <PopupWithForm
            name="place"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title="Новое место"
            buttonTitle="Создать"
            ariaLabel="Добавить место">
            <label className="popup__field">
                <input
                    type="text"
                    id="title-input"
                    name="name"
                    className="popup__input popup__input_el_title"
                    onChange={handleChange}
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    required
                />

            </label>
            <label className="popup__field">
                <input
                    type="url"
                    id="img-input"
                    name="link"
                    className="popup__input popup__input_el_img"
                    onChange={handleChange}
                    placeholder="Ссылка на картинку"
                    required
                />

            </label>
        </PopupWithForm>
    );
}