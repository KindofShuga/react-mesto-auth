import LogWithForm from './LogWithForm.js';
import { useState } from 'react';

export default function Register({ handleRegister }) {
    const [userData, setUserData] = useState({ email: "", password: "" });

    function handleChange(e) {
        const { name, value } = e.target;

        setUserData(prevState => ({
            ...prevState,
            [name]: value
        })
        );
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleRegister({
            email: userData.email,
            password: userData.password
        })
    }

    return (
        <section className="login">
            <LogWithForm
                title="Регистрация"
                aria="Зарегистрироваться"
                buttonTitle="Зарегистрироваться"
                onSubmit={handleSubmit}
                linkTo="/sign-in"
                linkTitle="Уже зарегистрированы? Войти"
            >
                <label className="login__field">
                    <input
                        type="text"
                        id="email-input"
                        name="email"
                        className="login__input login__input_el_email"
                        onChange={handleChange}
                        placeholder="Email" minLength="2" maxLength="40" required
                    />
                    <span className="email-input-error"></span>
                </label>
                <label className="login__field">
                    <input
                        type="password"
                        id="password-input"
                        name="password"
                        className="login__input login__input_el_password"
                        onChange={handleChange}
                        placeholder="Пароль" minLength="2" maxLength="200" required
                    />
                    <span className="password-input-error"></span>
                </label>
            </LogWithForm>
        </section>
    );
}
