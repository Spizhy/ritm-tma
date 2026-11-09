import React, { useState } from 'react';
import { Bell, Users, Shield, Smartphone, ExternalLink, HelpCircle } from 'lucide-react';
import { CURRENT_WEEK_INFO } from '../data/mockData';

interface SettingsViewProps {
  onNotificationToggle?: (enabled: boolean) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = () => {
  const [notifyCancellations, setNotifyCancellations] = useState(true);
  const [notifyMorningDigest, setNotifyMorningDigest] = useState(true);
  const [userRole, setUserRole] = useState<'headman' | 'student'>('headman');

  return (
    <div className="w-full flex flex-col space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-['Unbounded'] tracking-wide text-white">
          Настройки
        </h2>
        <span className="text-xs text-gray-400">v1.2.0</span>
      </div>

      {/* Профиль студента */}
      <div className="p-4 rounded-2xl bg-[#14161D] border border-white/[0.08] flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#EF233C] to-[#FF2A4B] flex items-center justify-center text-base font-bold text-white shadow-md">
          {CURRENT_WEEK_INFO.userInitials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-white truncate">
            {CURRENT_WEEK_INFO.userName}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">
            Группа {CURRENT_WEEK_INFO.groupName} • {userRole === 'headman' ? 'Староста группы' : 'Студент'}
          </div>
        </div>
      </div>

      {/* Переключатель роли */}
      <div className="p-4 rounded-2xl bg-[#14161D] border border-white/[0.08] space-y-3">
        <div className="text-xs font-semibold text-gray-300">Режим работы</div>
        <div className="grid grid-cols-2 gap-2 bg-[#1A1D27] p-1 rounded-xl">
          <button
            onClick={() => setUserRole('headman')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              userRole === 'headman'
                ? 'bg-[#EF233C] text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Староста (Полный)
          </button>
          <button
            onClick={() => setUserRole('student')}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              userRole === 'student'
                ? 'bg-[#EF233C] text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Студент
          </button>
        </div>
      </div>

      {/* Уведомления */}
      <div className="p-4 rounded-2xl bg-[#14161D] border border-white/[0.08] space-y-3">
        <div className="text-xs font-semibold text-gray-300">Уведомления в Telegram</div>

        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2.5">
            <Bell className="w-4 h-4 text-[#EF233C]" />
            <span className="text-xs text-gray-200">Мгновенно об отменах пар</span>
          </div>
          <input
            type="checkbox"
            checked={notifyCancellations}
            onChange={(e) => setNotifyCancellations(e.target.checked)}
            className="w-4 h-4 accent-[#EF233C] cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between py-1 border-t border-white/[0.04]">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-4 h-4 text-[#34D399]" />
            <span className="text-xs text-gray-200">Утренний дайджест в 07:30</span>
          </div>
          <input
            type="checkbox"
            checked={notifyMorningDigest}
            onChange={(e) => setNotifyMorningDigest(e.target.checked)}
            className="w-4 h-4 accent-[#EF233C] cursor-pointer"
          />
        </div>
      </div>

      {/* О проекте */}
      <div className="p-4 rounded-2xl bg-[#14161D] border border-white/[0.08] space-y-2 text-xs text-gray-400">
        <div className="font-semibold text-gray-300">РИТМ для Telegram</div>
        <p className="leading-relaxed">
          Отмены, расписание и перекличка работают сами. Разработано для старост и студентов.
        </p>
      </div>
    </div>
  );
};
