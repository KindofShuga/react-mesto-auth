import { Link } from "react-router-dom";
import failIcon from '../images/fail-icon.svg';
import successIcon from '../images/success-icon.svg';

export default function InfoTooltip(props) {
    return (
        <div className="popup popup__opened">
            <div className="popup__container popup__container_center">
                {props.isFailInfoTooltip &&
                    <>
                        <button type="button" aria-label="Закрыть" className="button popup__close-btn" onClick={props.onClose} />
                        <img src={failIcon} alt="Ошибка" />
                        <h3 className="popup__heading popup__heading_center">Что-то пошло не так! Попробуйте ещё раз.</h3>
                    </>
                }
                {props.isSuccessInfoTooltip &&
                    <>
                        <button type="button" aria-label="Закрыть" className="button popup__close-btn" onClick={props.onClose} />
                        <img src={successIcon} alt="Успешно" />
                        <h3 className="popup__heading popup__heading_center">Вы успешно зарегистрировались!</h3>
                    </>
                }
            </div>
        </div>
    );
}