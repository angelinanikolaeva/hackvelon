import React from "react";
import { Link } from "react-router-dom";
import { languages } from "../../constants/constants";
import "./HomePage.scss";

const HomePage = () => {
 const [value, setValue] = React.useState("en");
 
 
    function handleChange(e) {
        setValue(e.target.value);
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
                <Link className="button" to={{ pathname: '/bots', search: `?language=${value}` }}>  Choose language </Link>
                </div>
        </div>
    </div>
  ) 

};

export default HomePage;