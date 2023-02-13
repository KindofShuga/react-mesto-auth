export default function ImagePopup(props) {
    return (
        <div className={`popup popup-image ${props.card ? 'popup__opened' : ''}`}>
            <div className="popup-image__container">
                <button type="button" aria-label="Закрыть" className="button popup-image__close-btn" onClick={props.onClose}></button>
                <img src={props.card?.link} alt={props.card?.name} className="popup-image__image" />
                <h3 className="popup-image__heading">{props.card?.name}</h3>
            </div>
        </div>
    );
}