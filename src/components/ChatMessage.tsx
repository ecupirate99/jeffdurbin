import React from 'react';
import { User, Bot } from 'lucide-react';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex items-start gap-3 mb-6 ${message.isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
        message.isUser 
          ? 'bg-blue-600 text-white' 
          : 'bg-gradient-to-br from-amber-500 to-orange-600 text-white'
      }`}>
        {message.isUser ? <User size={20} /> : <Bot size={20} />}
      </div>
      
      <div className={`flex flex-col max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl ${
        message.isUser ? 'items-end' : 'items-start'
      }`}>
        <div className={`px-4 py-3 rounded-2xl shadow-sm ${
          message.isUser
            ? 'bg-blue-600 text-white rounded-br-md'
            : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1 px-2">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
};