import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mx-4 mb-4">
      <div className="flex items-start gap-3">
        <AlertTriangle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm text-red-800 mb-2">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-2 text-sm text-red-700 hover:text-red-900 font-medium"
            >
              <RefreshCw size={14} />
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};