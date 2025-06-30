import { useState, useCallback, useRef, useEffect } from 'react';
import { Message, ChatState } from '../types/chat';
import { ChatService } from '../services/chatService';

export const useChat = () => {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null
  });

  const chatServiceRef = useRef<ChatService | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      chatServiceRef.current = new ChatService();
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to initialize chat service'
      }));
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [state.messages, scrollToBottom]);

  const sendMessage = useCallback(async (content: string) => {
    if (!chatServiceRef.current) {
      setState(prev => ({
        ...prev,
        error: 'Chat service not initialized. Please check your API configuration.'
      }));
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date()
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null
    }));

    try {
      const response = await chatServiceRef.current.sendMessage(content, state.messages);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isUser: false,
        timestamp: new Date()
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to send message'
      }));
    }
  }, [state.messages]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const retryLastMessage = useCallback(() => {
    const lastUserMessage = [...state.messages].reverse().find(msg => msg.isUser);
    if (lastUserMessage) {
      // Remove the last assistant message if it exists and there was an error
      setState(prev => ({
        ...prev,
        messages: prev.messages.filter(msg => 
          !(msg.timestamp > lastUserMessage.timestamp && !msg.isUser)
        ),
        error: null
      }));
      sendMessage(lastUserMessage.content);
    }
  }, [state.messages, sendMessage]);

  return {
    ...state,
    sendMessage,
    clearError,
    retryLastMessage,
    messagesEndRef
  };
};