import React from 'react';
import { BookOpen, Heart, MessageCircle } from 'lucide-react';

interface WelcomeMessageProps {
  onQuestionClick: (question: string) => void;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onQuestionClick }) => {
  const sampleQuestions = [
    "What does the Bible say about salvation?",
    "How do I know God's will for my life?",
    "What is the Reformed view of predestination?",
    "How should Christians respond to suffering?"
  ];

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8 px-4">
      <div className="space-y-4">
        <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
          <BookOpen size={32} className="text-white" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome to Bible Questions? Ask Jeff!
        </h2>
        
        <p className="text-gray-600 leading-relaxed">
          Get biblical answers to your questions about Christianity, theology, and spiritual life. 
          Ask Jeff Durbin anything about the Bible and receive responses grounded in Reformed theology 
          and pastoral wisdom.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sampleQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="p-4 text-left bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-start gap-3">
              <MessageCircle size={16} className="text-blue-600 mt-1 group-hover:text-blue-700" />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {question}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
        <Heart size={16} className="text-red-500" />
        <span>Ask with faith, learn with purpose</span>
      </div>
    </div>
  );
};