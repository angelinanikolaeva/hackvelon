import React, {useState, useCallback, useRef, useEffect} from "react";
import { useSearchParams} from "react-router-dom";
import {v4 as uuid} from "uuid";
import {startSession, postMessage, getResponse} from "../../constants/api.js";
import "./index.scss";
import Message from "./Message";
import FormMessage from "./FormMessage";

export const Chat = () => {
  const [isloaded, setLoaded] = useState(false)
  let [searchParams, setSearchParams] = useSearchParams();
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesList = useRef();
  const refs = messages.reduce((acc, value) => {
    acc[value.id] = React.createRef();
    return acc;
  }, {});

  useEffect(() => {
    const lastMessageId = messages[messages.length - 1]?.id || null;
    refs[lastMessageId]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [messages]);

  useEffect(() => {
    if (!isloaded) {
      
      const language = (searchParams.get("language"))||"en";
      const name = (searchParams.get("name"))||"Maria";
      start({language, name});

      setLoaded(true)
    }
  return () => {}
}, []);
    


  const handleMessage = (message, type) => {
    const id = uuid();
    setMessages((messages) => [...messages, {id: id, type: type, message: message}]);
  };

  const start = async ({language,name}) => {
    const {
      data: {session_id, initial_response},
    } = await startSession({language:language , name: name});
    setSessionId(session_id);
    handleMessage(initial_response, "bot");
  };
  const post = async (message) => {
    await postMessage({session_id: sessionId, message: message});
    getBotResponse();
  };
  const getBotResponse = async () => {
    const {
      data: {response},
    } = await getResponse({session_id: sessionId});
    handleMessage(response, "bot");
  };

  const onSend = useCallback(
    (message) => {
      handleMessage(message, "user");
      post(message);
    },
    [sessionId]
  );
  return (
    <div className="chat-page">
      Chat
      <div className="buttons">
        <button onClick={start}>Start</button>
      </div>
      {messages && messages.length > 0 ? (
        <div className="messages-list" ref={messagesList}>
          {messages.map(({id, type, message}) => {
            return <Message innerRef={refs[id]} key={id} type={type} message={message} />;
          })}
        </div>
      ) : (
        <div className="no-messages">No messages yet</div>
      )}
      <FormMessage onSend={onSend} />
    </div>
  );
};
