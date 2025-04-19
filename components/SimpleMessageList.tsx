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

// 创建一个非常简单的消息组件
const MessageItem = ({ role, content, timestamp }: Message) => {
  return (
    <div 
      className={`p-3 rounded-lg mb-3 ${
        role === "assistant" 
          ? "bg-blue-100 text-blue-900 mr-auto" 
          : "bg-gray-100 text-gray-900 ml-auto"
      } max-w-[80%]`}
    >
      <div className="whitespace-pre-wrap">{content}</div>
      <div className="text-xs text-gray-500 mt-1">
        {new Date(timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
};

// 极简的消息列表组件
const SimpleMessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  return (
    <div>
      {Array.isArray(messages) && messages.map((msg, idx) => (
        <MessageItem 
          key={idx} 
          role={msg.role} 
          content={msg.content || ''} 
          timestamp={msg.timestamp || Date.now()} 
        />
      ))}
      
      {isLoading && (
        <div className="text-center p-4">
          <div className="inline-block h-6 w-6 border-2 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default SimpleMessageList; 