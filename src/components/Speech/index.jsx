import React from "react";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";

export const Speech = () => {
  const {transcript, listening, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const listenOnce = () => SpeechRecognition.startListening({continuous: true});

  const listenOnLanguage = (language) => {
    SpeechRecognition.startListening({
      continuous: true,
      language: language,
    });
  };
  return (
    <>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={listenOnce}>Start</button>
      <button onClick={listenOnLanguage("en-GB")}>Listen on English</button>
      <button onClick={listenOnLanguage("de-DE")}>Listen on German</button>
      <button onClick={listenOnLanguage("fr-FR")}>Listen on French</button>
      <button onClick={listenOnLanguage("es-ES")}>Listen on Spanish</button>
      <button onClick={listenOnLanguage("nl-NL")}>Listen on Dutch</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </>
  );
};
