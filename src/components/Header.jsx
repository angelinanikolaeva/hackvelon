import {Link} from "react-router-dom";
import BotAvatar from "./BotAvatar";
import "./Header.scss";
import {languages} from "../constants/constants";

const Header = ({name, language}) => {
  const findLang = languages.find((lg) => lg.key === language)?.label;
  return (
    <div className="header">
      <BotAvatar name={name} width={120} height={120} />
      <div className="info">
        <div className="botName">{name}</div>
        <div className="language">Chosen language: {findLang}</div>
      </div>
      <Link className="button" to={{pathname: "/"}}>
        {" "}
        Finish chat{" "}
      </Link>
    </div>
  );
};
export default Header;
