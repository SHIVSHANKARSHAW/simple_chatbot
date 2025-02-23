import React, { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState([]);

  const addMessage = (message, response) => {
    setChatHistory((prev) => [...prev, { message, response }]);
  };

  return (
    <ChatContext.Provider value={{ chatHistory, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};