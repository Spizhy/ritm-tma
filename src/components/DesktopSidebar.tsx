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
    <aside className="w-56 shrink-0 flex flex-col justify-between py-6 px-4 border-r border-white/[0.08] min-h-[600px]">
      <div>
        {/* Логотип РИТМ */}
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="flex items-center text-[#EF233C] text-2xl font-black italic tracking-tighter">
            <span>//</span>
          </div>
          <span className="font-['Unbounded'] font-black text-xl tracking-wider text-white uppercase">
            РИТМ
          </span>
        </div>

        {/* Навигация */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;

            return (
              <button
                key={item.key}
                onClick={() => onSelectTab(item.key)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all select-none ${
                  isActive
                    ? 'bg-[#3A141A] text-white border border-[#EF233C]/30 shadow-[0_0_15px_rgba(239,35,60,0.2)]'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-[#161822]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-[#EF233C]' : 'text-gray-400'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Индикатор стабильности системы */}
      <div className="px-2 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
          <span className="text-[11px] text-gray-400 font-medium">
            Система работает стабильно
          </span>
        </div>
      </div>
    </aside>
  );
};
