import { Link } from "react-router-dom";

export default function LogWithForm(props) {
    return (
        <form className="login__form" onSubmit={props.onSubmit}>
            <h3 className="login__heading">{props.title}</h3>
            {props.children}
            <button type="submit" aria-label={props.aria} className="button login__submit-btn" disabled={props.buttonDisabled}>{props.buttonTitle}</button>
            {props.linkTo && ( <Link to={props.linkTo} className="login__link">{props.linkTitle}</Link> )}
        </form>
    );
}