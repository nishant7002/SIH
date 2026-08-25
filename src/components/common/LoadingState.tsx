import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading authentic handicraft data...'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-[#6B1D2F]/10 flex items-center justify-center text-[#6B1D2F]">
        <Loader2 className="w-6 h-6 animate-spin text-[#C85A32]" />
      </div>
      <p className="text-sm font-medium text-[#59615C]">{message}</p>
    </div>
  );
};
