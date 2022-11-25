import React from "react";
import BaseButton from "../../UI/BaseButton";
import "./index.scss";
import {Send, Voice} from "../../../assets/icons/icons.js";
import {useState, useRef} from "react";
// import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";

const FormMessage = ({onSend}) => {
  const [isFocused, setFocused] = useState(false);
  const [isRecording, setRecording] = useState(false);
  const [message, setMessage] = useState("");
  // const {transcript, listening, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition();

  const isVoice = React.useMemo(() => {
    return isFocused || !message;
  }, [isFocused, message]);

  const textArea = useRef("");

  const handleClick = () => {
    if (isVoice) {
      setRecording(true);
      return;
    }
    onSend(message);
    setMessage("");
    textArea.current.innerText = "";
  };

  const onInput = (e) => {
    setMessage(e.target.textContent);
  };
  const onKeyUp = () => {};
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      // Enter
      if (!e.shiftKey) {
        e.preventDefault();
        handleClick();
        return;
      }
    }
  };
  const onBlur = () => {
    setFocused(false);
  };
  const onFocus = () => {
    setFocused(true);
  };
  const onPaste = () => {};
  return (
    <div className="form-messages-container">
      <div className="chat-text-area">
        <div className="chat-text-area-inner">
          {isRecording ? (
            <div></div>
          ) : (
            <div className="text-area-wrapper">
              <div ref={textArea} className="text-area" contentEditable={true} onInput={onInput} onKeyUp={onKeyUp} onKeyDown={onKeyDown} onBlur={onBlur} onFocus={onFocus} onPaste={onPaste} />
              {!message && <div className="text-area-placeholder">Your message</div>}
            </div>
          )}
          <div className="message-button send">
            <BaseButton className="message-button" onClick={handleClick}>
              {isVoice ? <Voice /> : <Send />}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormMessage;
