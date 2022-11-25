import React, {useState} from "react";
import BotAvatar from "../../BotAvatar";
import "./index.scss";
import {useSpeechSynthesis} from "react-speech-kit";
import {languages} from "../../../constants/constants";
import {Cancel, Voice} from "../../../assets/icons/icons";

function areEqual({message: prevMessage}, {message}) {
  return message == prevMessage;
}

const Message = React.memo(({type, message, innerRef, botName, language}) => {
  const {speak, cancel, speaking, supported, voices} = useSpeechSynthesis();
  const [isVoicing, setIsVoicing] = useState(false);
  const findLang = languages.find((lg) => lg.key === language)?.specId;

  const voicesFit = voices.filter((voice) => voice.lang === findLang);
  const getVoice = () => {
    if (language !== "en") {
      return voicesFit[0];
    }
    const allVoices = voicesFit.filter((voice) => voice.lang === findLang && voice.name?.includes("Microsoft"));
    return (
      {
        Maria: voicesFit?.find((voice) => voice.name?.includes("Google")),
        Beata: allVoices?.find((voice) => voice.name?.includes("Zira")),
        "George Washington": allVoices?.find((voice) => voice.name?.includes("David")),
      }[botName] || voicesFit?.[3]
    );
  };

  const initiateVoicing = () => {
    if (!isVoicing) {
      speak({text: message, voice: getVoice()});
      setIsVoicing(true);
    } else {
      cancel();
      setIsVoicing(false);
    }
  };
  return (
    <div className={`message ${type === "bot" ? "bot" : "user"}`}>
      {type === "bot" ? <BotAvatar name={botName} width={50} height={50} /> : <></>}
      <div ref={innerRef} className={`message-wrapper ${type === "bot" ? "bot" : "user"}`}>
        <span className="message-content">{message}</span>
      </div>
      {type === "bot" ? (
        <button className="message-voice" onClick={initiateVoicing}>
          {isVoicing ? <Cancel width="20px" height="20px" /> : <Voice width="20px" height="20px" />}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}, areEqual);

export default Message;
