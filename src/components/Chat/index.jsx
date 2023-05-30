import React, {useState, useCallback, useRef, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {v4 as uuid} from "uuid";
import {startSession, postMessage, getResponse} from "../../constants/api.js";
import "./index.scss";
import Message from "./Message";
import FormMessage from "./FormMessage";
import {TailSpin} from "react-loader-spinner";
import Header from "../Header.jsx";

export const Chat = () => {
  const [isloaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedLanguage, setLanguage] = useState("");
  const [name, setName] = useState("Maria");
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
    const startFun = async () => {
      setIsLoading(true);
      const [nameS, languageS] = [searchParams.get("bot"), searchParams.get("language")];
      setLanguage(() => searchParams.get("language") ?? "en");
      setName(() => searchParams.get("bot") ?? "Maria");
      await start({language: languageS, name: nameS});
      setIsLoading(false);
    };
    if (!isloaded) {
      startFun();
      setLoaded(true);
    }
    return () => {};
  }, []);

  const handleMessage = (message, type) => {
    if (!message) return;
    const id = uuid();
    setMessages((messages) => [...messages, {id: id, type: type, message: message}]);
  };

  const start = async ({language, name}) => {
    const {
      data: {session_id, initial_response},
    } = await startSession({language: language, name: name});
    setSessionId(session_id);
    handleMessage(initial_response, "bot");
  };
  const post = async (message) => {
    const {
      data: {posted_message},
    } = await postMessage({session_id: sessionId, message: message});
    handleMessage(posted_message);
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
      post(message);
    },
    [sessionId]
  );

  return (
    <div className="chat-page">
      {isLoading || !isloaded ? <></> : <Header name={name} language={selectedLanguage} />}
      {isLoading || !isloaded ? (
        <TailSpin height="80" width="80" color="#1B3878" ariaLabel="tail-spin-loading" radius="1" wrapperStyle={{}} wrapperClass="spinner" visible={true} />
      ) : messages && messages.length > 0 ? (
        <div className="messages-list" ref={messagesList}>
          {messages.map(({id, type, message}) => {
            return <Message innerRef={refs[id]} key={id} type={type} language={selectedLanguage} message={message} botName={name} />;
          })}
        </div>
      ) : (
        <div className="no-messages">No messages yet</div>
      )}
      <FormMessage onSend={onSend} language={selectedLanguage} />
    </div>
  );
};
