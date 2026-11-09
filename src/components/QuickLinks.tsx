import React from 'react';
import { Link2, ArrowRight } from 'lucide-react';
import { TabKey } from '../types';

interface QuickLinksProps {
  onNavigateTab: (tab: TabKey) => void;
  onOpenContacts: () => void;
}

export const QuickLinks: React.FC<QuickLinksProps> = ({
  onNavigateTab,
  onOpenContacts,
}) => {
  return (
    <div className="w-full bg-[#13151B] rounded-[20px] border border-white/[0.08] p-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-2 mb-4">
        <Link2 className="w-4 h-4 text-gray-400" />
        <h3 className="text-sm font-semibold text-white tracking-wide">
          Быстрые ссылки
        </h3>
      </div>

      <div className="space-y-2 text-xs">
        <button
          onClick={() => onNavigateTab('schedule')}
          className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#1A1D27] text-left text-gray-300 hover:text-white transition-all group cursor-pointer"
        >
          <span>Расписание недели</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => onNavigateTab('stats')}
          className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#1A1D27] text-left text-gray-300 hover:text-white transition-all group cursor-pointer"
        >
          <span>Статистика посещаемости</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={onOpenContacts}
          className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#1A1D27] text-left text-gray-300 hover:text-white transition-all group cursor-pointer"
        >
          <span>Контакты деканата</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>
    </div>
  );
};
