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
          key={`${message.role}-${index}-${message.timestamp}`}
          className={`flex ${
            message.role === "assistant" ? "justify-start" : "justify-end"
          } mb-4`}
        >
          <div
            className={`p-3 rounded-lg ${
              message.role === "assistant"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            } max-w-[80%]`}
          >
            {message.content ? (
              <p className="whitespace-pre-wrap break-words">{message.content}</p>
            ) : (
              <p className="text-gray-400">Empty message</p>
            )}
            <div className="text-xs opacity-50 text-right mt-1">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
};

export default MessageList; 