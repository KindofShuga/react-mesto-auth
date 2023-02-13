import PopupWithForm from './PopupWithForm.js';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);
    const [buttonTitle, setButtonTitle] = useState("Сохранить");
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleJobChange(e) {
        setJob(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        setButtonTitle("Сохранение...");
        onUpdateUser({
            name: name,
            job: job,
        });
    }

    useEffect(() => {
        setName(currentUser.name);
        setJob(currentUser.about);
    }, [currentUser]);
    return (
        <PopupWithForm
            name="profile"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title="Редактировать профиль"
            buttonTitle={buttonTitle}
            ariaLabel="Сохранить изменения">
            <label className="popup__field">
                <input
                    type="text"
                    id="name-input"
                    name="name"
                    className="popup__input popup__input_el_name"
                    value={name || ''}
                    onChange={handleNameChange}
                    placeholder="Имя" minLength="2" maxLength="40" required
                />
                <span className="name-input-error"></span>
            </label>
            <label className="popup__field">
                <input
                    type="text"
                    id="job-input"
                    name="job"
                    className="popup__input popup__input_el_job"
                    value={job || ''}
                    onChange={handleJobChange}
                    placeholder="О себе" minLength="2" maxLength="200" required
                />
                <span className="job-input-error"></span>
            </label>
        </PopupWithForm>
    );
}