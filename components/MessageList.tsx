'use client';

import React from 'react';

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg ${
            message.role === "assistant"
              ? "bg-blue-100 text-blue-900"
              : "bg-gray-100 text-gray-900"
          } max-w-[80%] ${
            message.role === "assistant" ? "mr-auto" : "ml-auto"
          }`}
        >
          <p>{message.content}</p>
          <div className="text-xs text-gray-500 mt-1">
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex justify-center p-4">
          <div className="animate-spin h-6 w-6 border-2 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default MessageList; 