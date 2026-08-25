import React from 'react';
import { PackageSearch, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Handicrafts Found',
  description = 'Try adjusting your search criteria, craft filters, or price range.',
  actionText = 'Reset Filters',
  onAction
}) => {
  return (
    <div className="craft-card p-12 text-center flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-[#FDF2F4] flex items-center justify-center text-[#6B1D2F] border border-[#6B1D2F]/20">
        <PackageSearch className="w-8 h-8" />
      </div>

      <div className="max-w-md">
        <h3 className="text-lg font-bold text-[#1F2421]">{title}</h3>
        <p className="text-xs text-[#59615C] mt-1.5 leading-relaxed">{description}</p>
      </div>

      {onAction && (
        <button
          onClick={onAction}
          className="bg-[#6B1D2F] hover:bg-[#4A121F] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5 mt-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};
