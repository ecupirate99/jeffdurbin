import React, { useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { TypingIndicator } from './components/TypingIndicator';
import { WelcomeMessage } from './components/WelcomeMessage';
import { ErrorMessage } from './components/ErrorMessage';
import { useChat } from './hooks/useChat';

function App() {
  const { 
    messages, 
    isLoading, 
    error, 
    sendMessage, 
    clearError, 
    retryLastMessage, 
    messagesEndRef 
  } = useChat();

  useEffect(() => {
    // Clear any previous error when component mounts
    clearError();
  }, [clearError]);

  const handleSendMessage = (message: string) => {
    clearError();
    sendMessage(message);
  };

  const handleRetryError = () => {
    clearError();
    retryLastMessage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
            <BookOpen size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Bible Questions? Ask Jeff!</h1>
            <p className="text-sm text-gray-600">Reformed theology • Biblical answers • Pastoral wisdom</p>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {messages.length === 0 ? (
            <WelcomeMessage onQuestionClick={handleSendMessage} />
          ) : (
            <div className="space-y-1">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={handleRetryError}
          />
        )}

        {/* Chat Input */}
        <ChatInput 
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          disabled={!!error}
        />
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-4 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-600">
            AI Bible Companion created by Quintin G
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Responses reflect Reformed Baptist theology • Always verify with Scripture
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;