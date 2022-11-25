import React, {useEffect} from "react";

import {useSearchParams} from "react-router-dom";
import {getBots} from "../../constants/api.js";
import Card from "../Card";
import "./BotsList.scss";
import {TailSpin} from "react-loader-spinner";

const BotsList = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let [bots, setBots] = React.useState([]);
  let [isLoading, setIsLoading] = React.useState([]);

  useEffect(() => {
    const language = searchParams.get("language") || "en";
    const fetchData = async () => {
      setIsLoading(true);
      const {data} = await getBots({language: language});
      setBots(data);
      setIsLoading(false);
    };
    fetchData();
  }, [searchParams]);
  return (
    <div>
      <p className="title">Choose interlocutor</p>
      <div className="bots-list">{isLoading ? <TailSpin height="80" width="80" color="#fff" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass="spinner" visible={true} /> : bots.map((bot) => <Card key={bot.name} bot={bot} />)}</div>
    </div>
  );
};

export default BotsList;
