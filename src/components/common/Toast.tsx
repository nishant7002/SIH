import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  const styles = {
    success: 'bg-[#2C5E43] text-white border-[#2C5E43]',
    error: 'bg-[#6B1D2F] text-white border-[#6B1D2F]',
    info: 'bg-[#1F2421] text-white border-[#1F2421]'
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#D99B26]" />,
    error: <AlertCircle className="w-5 h-5 text-white" />,
    info: <Info className="w-5 h-5 text-[#D99B26]" />
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border ${styles[type]} animate-in slide-in-from-bottom-5`}
    >
      {icons[type]}
      <span className="text-sm font-medium">{message}</span>
      {onClose && (
        <button onClick={onClose} className="p-1 hover:opacity-75 transition-opacity">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
