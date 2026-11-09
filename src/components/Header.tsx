import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { CURRENT_WEEK_INFO } from '../data/mockData';

interface HeaderProps {
  userInitials: string;
  onOpenSchedule?: () => void;
  showDesktopProfile?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  userInitials,
  onOpenSchedule,
  showDesktopProfile = false,
}) => {
  return (
    <header className="w-full pt-1 pb-4">
      {/* Верхний ряд: Логотип и Telegram-контролы / Аватар */}
      <div className="flex items-center justify-between mb-4">
        {/* Фирменный логотип с красными скошенными полосками (как на скриншоте) */}
        <div className="flex items-center gap-2 select-none group cursor-pointer">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-5 bg-[#EF233C] rounded-full transform -skew-x-[22deg]"></div>
            <div className="w-1.5 h-5 bg-[#EF233C] rounded-full transform -skew-x-[22deg]"></div>
          </div>
          <span className="font-['NauryzRedKeds','Unbounded',sans-serif] text-xl tracking-widest text-white uppercase leading-none drop-shadow-md">
            РИТМ
          </span>
        </div>

        {/* Профиль для десктопа или аватар для мобильного */}
        {showDesktopProfile ? (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1D27] border border-white/10 hover:border-white/20 transition-colors cursor-pointer">
            <div className="w-6 h-6 rounded-full bg-[#EF233C] flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
              {userInitials}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1A1D27] border border-white/10 flex items-center justify-center text-xs font-semibold text-gray-300">
              {userInitials}
            </div>
          </div>
        )}
      </div>

      {/* Нижний ряд: Чипы даты и типа недели (в точности как на скриншоте) */}
      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-0.5">
        <button
          onClick={onOpenSchedule}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1D27] border border-white/10 text-xs font-medium text-gray-200 hover:bg-[#222634] active:scale-95 transition-all whitespace-nowrap shadow-sm cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          <span>{`${CURRENT_WEEK_INFO.dayOfWeek}, ${CURRENT_WEEK_INFO.dateFormatted}`}</span>
        </button>

        <div className="px-3.5 py-1.5 rounded-full bg-[#1A1D27] border border-white/10 text-xs font-medium text-gray-300 whitespace-nowrap shadow-sm">
          {CURRENT_WEEK_INFO.weekType}
        </div>
      </div>
    </header>
  );
};
