import LogWithForm from './LogWithForm.js';
import { useState, useEffect, useContext } from 'react';

export default function Login() {
    const [buttonTitle, setButtonTitle] = useState("Войти");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }
    function handleSubmit(e) {
        // e.preventDefault();
        // setButtonTitle("Войти...");
        // onUpdateUser({
        //     email: email,
        //     password: password,
        // });
    }
    return (
        <section className="login">
            <LogWithForm
                title="Вход"
                aria="Войти"
                buttonTitle={buttonTitle}
                onSubmit={handleSubmit}
            >
                <label className="login__field">
                    <input
                        type="text"
                        id="email-input"
                        name="email"
                        className="login__input login__input_el_email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Email" minLength="2" maxLength="40" required
                    />
                    <span className="email-input-error"></span>
                </label>
                <label className="login__field">
                    <input
                        type="text"
                        id="password-input"
                        name="password"
                        className="login__input login__input_el_password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Пароль" minLength="2" maxLength="200" required
                    />
                    <span className="password-input-error"></span>
                </label>
            </LogWithForm>
        </section>
    );
}
