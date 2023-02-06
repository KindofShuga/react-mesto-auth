export default function LogWithForm(props) {
    return (
        <form className="login__form" onSubmit={props.onSubmit} noValidate>
            <h3 className="login__heading">{props.title}</h3>
            {props.children}
            <button type="submit" aria-label={props.aria} className="button login__submit-btn">{props.buttonTitle}</button>
        </form>
    );
}