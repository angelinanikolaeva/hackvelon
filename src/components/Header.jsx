import {Link} from "react-router-dom";
import BotAvatar from "./BotAvatar";
import "./Header.scss";
const Header = ({name, language}) => {
  return (
    <div className="header">
      <BotAvatar name={name} width={120} height={120} />
      <div className="info">
        <div className="botName">{name}</div>
        <div className="language">Choosen language: {language}</div>
      </div>
      <Link className="button" to={{pathname: "/"}}>
        {" "}
        Finish chat{" "}
      </Link>
    </div>
  );
};
export default Header;
