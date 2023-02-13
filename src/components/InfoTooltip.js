import failIcon from '../images/fail-icon.svg';
import successIcon from '../images/success-icon.svg';

export default function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup__opened' : ''}`}>
            <div className="popup__container popup__container_center">
                <button type="button" aria-label="Закрыть" className="button popup__close-btn" onClick={props.onClose} />
                <img
                    src={props.isSuccessInfoTooltip ? successIcon : failIcon}
                    alt={props.isSuccessInfoTooltip ? "Успешно" : "Ошибка"}
                />
                <h2 className="popup__heading popup__heading_center">
                    {props.isSuccessInfoTooltip
                        ? "Вы успешно зарегистрировались!"
                        : "Что-то пошло не так! Попробуйте ещё раз."}
                </h2>
            </div>
        </div>
    );
}