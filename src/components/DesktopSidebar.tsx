import React from 'react';
import { Home, Calendar, BarChart2, Settings } from 'lucide-react';
import { TabKey } from '../types';

interface DesktopSidebarProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const navItems = [
    { key: 'home' as TabKey, label: 'Главная', icon: Home },
    { key: 'schedule' as TabKey, label: 'Расписание', icon: Calendar },
    { key: 'stats' as TabKey, label: 'Статистика', icon: BarChart2 },
    { key: 'settings' as TabKey, label: 'Настройки', icon: Settings },
  ];

  return (
    <aside className="w-64 shrink-0 flex flex-col justify-between py-8 px-6 border-r border-white/[0.07] min-h-[660px]">
      <div>
        {/* Логотип // РИТМ (точно по скриншоту в одну строку) */}
        <div
          className="flex items-center gap-2.5 mb-10 px-1 cursor-pointer select-none"
          onClick={() => onSelectTab('home')}
        >
          <div className="flex items-center gap-1 shrink-0">
            <div className="w-1.5 h-6 bg-[#EF233C] rounded-full transform -skew-x-[22deg]" />
            <div className="w-1.5 h-6 bg-[#EF233C] rounded-full transform -skew-x-[22deg]" />
          </div>
          <span className="font-['NauryzRedKeds','Unbounded',sans-serif] text-2xl tracking-widest text-white leading-none">
            РИТМ
          </span>
        </div>

        {/* Навигация */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;

            return (
              <button
                key={item.key}
                onClick={() => onSelectTab(item.key)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-semibold transition-all select-none cursor-pointer ${
                  isActive
                    ? 'bg-[#301319] text-white border border-[#EF233C]/40 shadow-[0_0_20px_rgba(239,35,60,0.22)]'
                    : 'text-[#8E95A5] hover:text-white hover:bg-[#161822]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-[#EF233C]' : 'text-[#8E95A5]'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Индикатор стабильности системы */}
      <div className="px-2 pt-6 border-t border-white/[0.06] flex items-center gap-2.5">
        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
        <span className="text-[11px] text-[#8E95A5] font-medium leading-none">
          Система работает стабильно
        </span>
      </div>
    </aside>
  );
};
