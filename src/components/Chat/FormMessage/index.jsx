import React from "react";
import BaseButton from "../../UI/BaseButton";
import "./index.scss";
import {Send, Voice} from "../../../assets/icons/icons.js";
import {useState, useRef, useEffect} from "react";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import {languages} from "../../../constants/constants";

const FormMessage = ({onSend, language}) => {
  const [isFocused, setFocused] = useState(false);
  const [isRecording, setRecording] = useState(false);
  const [message, setMessage] = useState("");
  const {transcript, listening, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition();

  useEffect(() => {
    setFormMessage(transcript);
    return () => {};
  }, [transcript]);

  const isVoice = React.useMemo(() => {
    return (!isFocused && !message) || isRecording;
  }, [isFocused, message, isRecording]);

  const textArea = useRef("");

  const listenOnLanguage = (language) => {
    const findLang = languages.find((lg) => lg.key === language)?.specId;
    SpeechRecognition.startListening({
      continuous: true,
      language: findLang,
    });
  };
  const handleClick = () => {
    if (isVoice) {
      setRecording(true);
      listenOnLanguage(language);
      return;
    }
    onSend(message);
    setMessage("");
    textArea.current.innerText = "";
    resetTranscript();
  };
  const cancelRecording = () => {
    resetTranscript();
    SpeechRecognition.abortListening();
    setRecording(false);
  };
  const stopRecording = () => {
    SpeechRecognition.stopListening();
    setRecording(false);
  };
  const setFormMessage = (text) => {
    setMessage(text);
    textArea.current.innerText = text;
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
    <>
      {isRecording && (
        <div className="form-message-buttons">
          <div className={`message-button recording-cancel-button`}>
            <BaseButton className={`recording-cancel`} onClick={stopRecording}>
              Stop
            </BaseButton>
          </div>
          <div className={`message-button recording-cancel-button`}>
            <BaseButton className={`recording-cancel`} onClick={cancelRecording}>
              Cancel
            </BaseButton>
          </div>
        </div>
      )}
      {isRecording && <div className="recording-line"></div>}
      <div className="form-messages-container">
        <div className="chat-text-area">
          <div className="chat-text-area-inner">
            <div className="text-area-wrapper">
              <div ref={textArea} className="text-area" contentEditable={isRecording ? false : true} onInput={onInput} onKeyUp={onKeyUp} onKeyDown={onKeyDown} onBlur={onBlur} onFocus={onFocus} onPaste={onPaste} />
              {!message && <div className="text-area-placeholder">Your message</div>}
            </div>
            <div className={`message-button send`}>
              <BaseButton className={`message-button ${isRecording && "recording-icon"}`} onClick={handleClick}>
                {isVoice ? <Voice /> : <Send />}
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormMessage;
