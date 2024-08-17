"use client"
import React, { useState } from 'react';

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-scroll p-4 border border-gray-300">
        {messages.map((msg, index) => (
          <div key={index} className="my-2 p-2 bg-gray-200 rounded">
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-l"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-r">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBot;