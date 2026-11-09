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
    <header className="w-full pt-2 pb-4">
      {/* Верхний ряд: Логотип и Telegram-контролы / Аватар */}
      <div className="flex items-center justify-between mb-4">
        {/* Фирменный логотип с красным двойным слешем */}
        <div className="flex items-center gap-2 select-none group cursor-pointer">
          <div className="flex items-center text-[#EF233C] text-2xl font-black italic tracking-tighter">
            <span>//</span>
          </div>
          <span className="font-['Unbounded'] font-black text-xl tracking-wider text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            РИТМ
          </span>
        </div>

        {/* Профиль для десктопа или заглушка для мобильного */}
        {showDesktopProfile ? (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1D27] border border-white/10 hover:border-white/20 transition-colors cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#EF233C] to-[#FF2A4B] flex items-center justify-center text-xs font-bold text-white shadow-sm">
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
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1D27] border border-white/10 text-xs font-medium text-gray-200 hover:bg-[#222634] active:scale-95 transition-all whitespace-nowrap shadow-sm"
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
