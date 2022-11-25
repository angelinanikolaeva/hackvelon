import React from "react";
import BotAvatar from "./BotAvatar";
import { Link } from "react-router-dom";
import "./Card.scss";


const Card = ({bot}) => {
   
    return (
        <div className="card">
            <BotAvatar/>
            <div className="botName">{bot.name}</div> 
            <p className="botDescription">{bot.description}</p>
            <Link className="button" to={{ pathname: '/chat', search: `?bot=${bot.name}&language=${bot.language}` }}>  Start chat </Link>
        </div>
    )
}
 

export default Card;