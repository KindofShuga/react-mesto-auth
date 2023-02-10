import { Link } from "react-router-dom";
import headerLogo from '../images/logo-icon.svg';

function HeaderLink({linkTo, textLink, userEmail, signOut}) {
    return (
        <nav className="header__nav">
            {!userEmail &&
                <>
                    <img src={headerLogo} alt="Логотип Место" className="header__logo" />
                    <Link to={linkTo} className="header__link">{textLink}</Link>
                </>
            }
            {userEmail &&
                <>
                    <input type="checkbox" id="check" />
                    <img src={headerLogo} alt="Логотип Место" className="header__logo" />
                    <label htmlFor="check" className="header__fa-bars" />
                    <ul className="header__links-container">
                        <li className="header__email">{userEmail}</li>
                        <li className="header__link-exit" onClick={signOut}>Выйти</li>
                    </ul>
                </>
            }
        </nav>
    )
}

export default HeaderLink;