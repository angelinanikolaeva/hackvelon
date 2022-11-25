import React from "react";
import "./index.scss";

function areEqual({message: prevMessage}, {message}) {
  return message == prevMessage;
}

const Message = React.memo(({type, message, innerRef}) => {
  return (
    <div ref={innerRef} className={`message ${type === "bot" ? "bot" : "user"}`}>
      <span className="message-content">{message}</span>
    </div>
  );
}, areEqual);

export default Message;
