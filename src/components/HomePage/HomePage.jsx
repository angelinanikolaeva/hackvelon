import React from "react";
import { getBots } from "../../constants/api";
import { languages } from "../../constants/constants";
import BotsList from "./BotsList";
import "./HomePage.scss";

const HomePage = () => {
 const [value, setValue] = React.useState("");
 
    function handleChange(e) {
        setValue(e.target.value);
        }
    function getBotsList() {
        getBots({language:value})
        }
        
  return(
    <div className="home">
        <div className="main-part">
            <div className="main-title">Divine Brain</div>
                <div className="subtitle">Your AI conversational partner</div>
                <div className="choose-language">
                    <select  className="select" value={value} onChange={handleChange} >
                        {languages.map((language, index) => {
                            return(
                            <option key={index}  value={language.key}>{language.label}</option>
                        )})}
                    </select>
                <button className="button" onClick={getBotsList}> Choose language </button>
                </div>
        </div>
    </div>
  ) 

};

export default HomePage;