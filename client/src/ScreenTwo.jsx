import React, { useContext, useEffect, useRef } from "react";
import { LuMessagesSquare } from "react-icons/lu";
import { RiVoiceAiFill } from "react-icons/ri";
import { converse } from "./api";
import { ChatContext } from "./ChatContext";
import { motion } from "framer-motion";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const ScreenTwo = () => {
  const [message, setMessage] = React.useState("");
  const { chatHistory, addMessage } = useContext(ChatContext);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await converse({ message });
    addMessage(message, response);
    setMessage("");
  };

  const handleSubmitKey = async () => {
    const response = await converse({ message });
    addMessage(message, response);
    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmitKey();
    }
  };

  return (
    <div className="flex h-[90vh] flex-col justify-between">
      {/* Text Response */}
      <div className="h-[70vh] md:h-[65vh] flex flex-col text-white px-6 md:px-40 pt-4">
        <div className="flex flex-col overflow-y-scroll">
          {chatHistory.map((chat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="flex justify-end py-2 pr-4">
                <span className="bg-input rounded-2xl px-4 py-2">
                  {chat.message}
                </span>
              </p>
              <p className="flex justify-start py-2 pr-[30%]">
                <span className="bg-input rounded-2xl px-4 py-2">
                  {chat.response}
                </span>
              </p>
            </motion.div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>
      </div>
      {/* Input */}
      <div className="px-6 md:px-72 pb-6 md:pb-4">
        <div className="w-full bg-input p-4 md:pt-2 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              type="text"
              className="w-full bg-transparent outline-none text-white resize-none overflow-y-auto"
              rows={2}
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
    </div>
  );
};

export default ScreenTwo;
