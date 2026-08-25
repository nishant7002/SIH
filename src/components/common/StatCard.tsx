import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  colorTheme?: 'maroon' | 'terracotta' | 'green' | 'ochre';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendType = 'positive',
  colorTheme = 'maroon'
}) => {
  const themeClasses = {
    maroon: 'bg-[#FDF2F4] text-[#6B1D2F] border-[#6B1D2F]/20',
    terracotta: 'bg-[#FDF6F0] text-[#C85A32] border-[#C85A32]/20',
    green: 'bg-[#EBF4EF] text-[#2C5E43] border-[#2C5E43]/20',
    ochre: 'bg-[#FFFBF0] text-[#D99B26] border-[#D99B26]/20'
  };

  return (
    <div className="craft-card p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#59615C] uppercase tracking-wider">{title}</span>
        <div className={`p-2.5 rounded-xl border ${themeClasses[colorTheme]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3">
        <div className="text-2xl font-bold text-[#1F2421] tracking-tight">{value}</div>
        
        <div className="flex items-center justify-between mt-1 text-xs">
          {subtitle && <span className="text-[#59615C]">{subtitle}</span>}
          {trend && (
            <span
              className={`font-semibold ${
                trendType === 'positive'
                  ? 'text-[#2C5E43]'
                  : trendType === 'negative'
                  ? 'text-[#6B1D2F]'
                  : 'text-[#59615C]'
              }`}
            >
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
