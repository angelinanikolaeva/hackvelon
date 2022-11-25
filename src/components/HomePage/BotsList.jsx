import React from "react";
import { bots } from "../../constants/constants";

import Card from "../Card";
import "./BotsList.scss";

const BotsList = () => {
  return (
    <div>
      <p className="title">Choose interlocutor</p>
      <div className="bots-list">
        {bots.map((bot) => (
          <Card bot={bot} />
        ))}
      </div>
    </div>
  );
};

export default BotsList;
