import React ,{ useEffect  }from "react";


import { useSearchParams} from "react-router-dom";
import {getBots} from "../../constants/api.js";
import Card from "../Card";
import "./BotsList.scss";

const BotsList = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let [bots, setBots] = React.useState([]);

  useEffect(() => {
    
    const language = (searchParams.get("language"))||"en";
    const fetchData = async () => {
      const {data} = await getBots({language: language});
      setBots(data);
    }
    fetchData();
}, [searchParams]); 
  return (
    <div>
      <p className="title">Choose interlocutor</p>
      <div className="bots-list">
        {bots.map((bot) => (
          <Card key={bot.name} bot={bot} />
        ))}
      </div>
    </div>
  );
};

export default BotsList;
