import React from "react";
import BotAvatar from "../../BotAvatar";
import "./index.scss";

function areEqual({message: prevMessage}, {message}) {
  return message == prevMessage;
}

const Message = React.memo(({type, message, innerRef, botName}) => {
  return (
    <div className={`message ${type === "bot" ? "bot" : "user"}`}>
      {type === "bot" ? <BotAvatar name={botName} /> : <></>}
      <div ref={innerRef} className={`message-wrapper ${type === "bot" ? "bot" : "user"}`}>
        <span className="message-content">{message}</span>
      </div>
    </div>
  );
}, areEqual);

export default Message;
