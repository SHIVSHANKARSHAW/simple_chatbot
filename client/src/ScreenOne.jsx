import React, { useContext } from "react";
import { LuMessagesSquare } from "react-icons/lu";
import { RiVoiceAiFill } from "react-icons/ri";
import { converse } from "./api";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "./ChatContext";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const ScreenOne = () => {
  const [message, setMessage] = React.useState("");
  const { addMessage } = useContext(ChatContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await converse({ message });
    addMessage(message, response);
    navigate("/converse");
  };

  const handleSubmitKey = async () => {
    const response = await converse({ message });
    addMessage(message, response);
    navigate("/converse");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmitKey();
    }
  };

  const handleVoiceInput = () => {
    SpeechRecognition.startListening({ continuous: false, language: 'en-US' });
  };

  const { transcript } = useSpeechRecognition();

  React.useEffect(() => {
    setMessage(transcript);
  }, [transcript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  return (
    <div className="h-full flex flex-col space-y-12 justify-between py-12 md:py-0 md:justify-center items-center">
      {/* Greeting */}
      <div className="text-white text-3xl md:text-4xl mt-40 md:mt-0">
        <p>What's Up, Let's Talk ?</p>
      </div>
      {/* Input */}
      <div className="w-4/5 md:w-3/5 bg-input p-4 md:p-6 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            value={message}
            type="text"
            className="w-full bg-transparent outline-none text-white resize-none overflow-y-auto"
            rows={3}
            placeholder="Message Me"
          />
          <div className="w-full text-white flex justify-between px-1 md:px-12">
            <button
              type="submit"
              className="rounded-full bg-gray-300 hover:bg-white hover:scale-105 text-black p-2 md:p-3 text-lg md:text-xl font-semibold outline-none"
            >
              <LuMessagesSquare />
            </button>
            <button
              type="button"
              onClick={handleVoiceInput}
              className="rounded-full bg-gray-300 hover:bg-white hover:scale-105 text-black p-2 md:p-3 text-lg md:text-xl font-semibold outline-none"
            >
              <RiVoiceAiFill />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScreenOne;