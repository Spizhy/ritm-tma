import React from 'react';
import { Home, Calendar, BarChart2, Settings } from 'lucide-react';
import { TabKey } from '../types';

interface BottomTabBarProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const tabs = [
    { key: 'home' as TabKey, label: 'Главная', icon: Home },
    { key: 'schedule' as TabKey, label: 'Расписание', icon: Calendar },
    { key: 'stats' as TabKey, label: 'Статистика', icon: BarChart2 },
    { key: 'settings' as TabKey, label: 'Настройки', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B0C10]/95 backdrop-blur-md border-t border-white/[0.08] px-4 pt-2 pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-around pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => onSelectTab(tab.key)}
              className={`flex flex-col items-center justify-center py-1 px-3 min-w-[64px] rounded-xl transition-all duration-200 active:scale-90 select-none ${
                isActive
                  ? 'text-[#EF233C]'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#EF233C] shadow-[0_0_6px_#EF233C]" />
                )}
              </div>
              <span
                className={`text-[10px] mt-1 font-medium transition-colors ${
                  isActive ? 'text-[#EF233C] font-semibold' : 'text-gray-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
