import {React, useState} from "react";
import {Link} from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
  const navActions = [
    {key: "", label: "Main"},
    {key: "chat", label: "Chat"},
  ];
  const [activeScreen, selectActiveScreen] = useState("main");

  return (
    <nav className="navbar">
      <div className="navbar-actions">
        {navActions.map((action) => (
          <div key={action.key} className="navbar-action" onClick={() => selectActiveScreen(action.key)}>
            <Link to={"/" + action.key}>
              <span className={`navbar-action-name ${activeScreen && "active"}`}>{action.label}</span>
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
