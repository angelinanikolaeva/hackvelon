import { Link } from "react-router-dom";
import BotAvatar from "./BotAvatar";
import './Header.scss';
const Header = ({name,language}) => {
  return (
    <div className="header">
        <div className="info">
            <BotAvatar name={name} />
            <div className="botName">{name}</div>
            <div className="language">Choosen language: {language}</div>
        </div>
        <Link className="button" to={{ pathname: '/'}}> Finish chat  </Link>

    </div>
  );
}
export default Header;