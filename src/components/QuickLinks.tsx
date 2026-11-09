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
    <div className="w-full bg-[#14161D] rounded-2xl border border-white/[0.08] p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
      <div className="flex items-center gap-2 mb-3">
        <Link2 className="w-4 h-4 text-gray-400" />
        <h3 className="text-sm font-semibold text-white tracking-wide">
          Быстрые ссылки
        </h3>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => onNavigateTab('schedule')}
          className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#1A1D27] text-left text-xs font-medium text-gray-300 hover:text-white transition-all group"
        >
          <span>Расписание недели</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => onNavigateTab('stats')}
          className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#1A1D27] text-left text-xs font-medium text-gray-300 hover:text-white transition-all group"
        >
          <span>Статистика посещаемости</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={onOpenContacts}
          className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#1A1D27] text-left text-xs font-medium text-gray-300 hover:text-white transition-all group"
        >
          <span>Контакты деканата</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>
    </div>
  );
};
