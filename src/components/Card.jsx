import React from "react";
import BotAvatar from "./BotAvatar";
import "./Card.scss";


const Card = ({bot}) => {
    console.log(bot);
    return (
        <div className="card">
            <BotAvatar/>
            <div className="botName">{bot.name}</div> 
            <p className="botDescription">{bot.personality}</p>
        </div>
    )
}
 

export default Card;