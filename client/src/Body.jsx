import React from "react";
import ScreenOne from "./ScreenOne";
import ScreenTwo from "./ScreenTwo";
import { Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import { ChatProvider } from "./ChatContext";

const Body = () => {
  return (
    <div className="h-[90vh]">
      <ChatProvider>
        <Routes>
          <Route path="/" element={<ScreenOne />} />
          <Route path="/converse" element={<ScreenTwo />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </ChatProvider>
    </div>
  );
};

export default Body;
