"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import WebcamIcon from "./web-cam-icon";
import SettingsIcon from "./settings-icon";
import Setting from "./setting";
import Chat from "./chat";

const Dashboard: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = input;
      setMessages([...messages, userMessage]);
      setInput("");

      try {
        const response = await fetch('/api/bot?sentence='+ encodeURIComponent(userMessage));
        const data = await response.json();
        if(data.messages){
          setMessages((prevMessages)=> [...prevMessages, ...data.messages]);
        }
      } catch (error) {
        console.error("Error fetching bot response",error);
      }
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  return (
    <div>
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-20 p-2 bg-white text-black rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-110 hover:bg-gray-200"
      >
        <WebcamIcon className="h-5 w-5" />
      </button>
      <button
        onClick={toggleSettings}
        className="fixed bottom-4 right-4 p-2 bg-white text-black rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-110 hover:bg-gray-200"
      >
        <SettingsIcon className="h-5 w-5" />
      </button>

      {isChatOpen && (
        <Chat closeChat={closeChat} handleSendMessage={handleSendMessage} input={input} messages={messages} setInput={setInput}/>
      )}

      {isSettingsOpen && (
        <Setting closeSettings={closeSettings} />
      )}
    </div>
  );
};

export default Dashboard;