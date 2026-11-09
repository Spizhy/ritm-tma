import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { useTelegram } from './hooks/useTelegram';
import { HomeView } from './views/HomeView';
import { ScheduleView } from './views/ScheduleView';
import { StatsView } from './views/StatsView';
import { SettingsView } from './views/SettingsView';
import { BottomTabBar } from './components/BottomTabBar';
import { DesktopSidebar } from './components/DesktopSidebar';
import { ImportantNotice } from './components/ImportantNotice';
import { QuickLinks } from './components/QuickLinks';
import { ExportModal } from './components/ExportModal';
import { TabKey } from './types';
import { CURRENT_WEEK_INFO, TODAY_LESSONS } from './data/mockData';
import { ScheduleCard } from './components/ScheduleCard';
import { AttendanceCard } from './components/AttendanceCard';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const { tg, userInitials, triggerHaptic, showNotification } = useTelegram();

  // Управление Telegram BackButton
  useEffect(() => {
    if (!tg?.BackButton) return;

    if (activeTab !== 'home') {
      tg.BackButton.show();
      const handleBack = () => {
        triggerHaptic('selection');
        setActiveTab('home');
      };
      tg.BackButton.onClick(handleBack);
      return () => {
        tg.BackButton.offClick(handleBack);
      };
    } else {
      tg.BackButton.hide();
    }
  }, [activeTab, tg, triggerHaptic]);

  const handleTabChange = (tab: TabKey) => {
    triggerHaptic('selection');
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenContacts = () => {
    triggerHaptic('light');
    showNotification('Контакты деканата: +7 (495) 123-45-67, dekanat@university.ru, каб. 204');
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white flex justify-center relative overflow-x-hidden selection:bg-[#EF233C] selection:text-white">
      {/* Декоративная светящаяся орбита РИТМ (в точности как на скриншоте) */}
      <div className="planet-glow-arc" />

      {/* Оболочка приложения */}
      <div className="w-full max-w-7xl mx-auto flex min-h-screen relative z-10">
        {/* ================= ДЕСКТОПНЫЙ ВИД (1024px+) ================= */}
        <div className="hidden lg:flex w-full min-h-screen">
          {/* Боковое меню слева */}
          <DesktopSidebar
            activeTab={activeTab}
            onSelectTab={handleTabChange}
          />

          {/* Центральный контент */}
          <main className="flex-1 p-8 overflow-y-auto">
            {/* Верхняя строка с датой и профилем */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => handleTabChange('schedule')}
                  className="px-4 py-1.5 rounded-full bg-[#1A1D27] hover:bg-[#222634] border border-white/10 text-xs font-medium text-gray-200 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>{`${CURRENT_WEEK_INFO.dayOfWeek}, ${CURRENT_WEEK_INFO.dateFormatted}`}</span>
                </button>
                <div className="px-4 py-1.5 rounded-full bg-[#1A1D27] border border-white/10 text-xs font-medium text-gray-300">
                  {CURRENT_WEEK_INFO.weekType}
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1D27] border border-white/10 cursor-pointer hover:border-white/20 transition-colors">
                <div className="w-6 h-6 rounded-full bg-[#EF233C] flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                  {userInitials}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>

            {/* Большой промо-заголовок со слоганом со скриншота */}
            <div className="mb-7">
              <h1 className="text-4xl font-extrabold font-['Unbounded'] tracking-wider text-white uppercase mb-1.5 drop-shadow-md">
                РИТМ
              </h1>
              <p className="text-sm text-[#8E95A5] font-medium">
                Отмены, расписание и перекличка работают сами
              </p>
            </div>

            {/* В зависимости от активного таба */}
            {activeTab === 'home' && (
              <div className="grid grid-cols-12 gap-6 items-start">
                <div className="col-span-8 space-y-6">
                  <ScheduleCard
                    lessons={TODAY_LESSONS}
                    onViewAll={() => handleTabChange('schedule')}
                  />
                  <AttendanceCard
                    onHaptic={triggerHaptic}
                    onExport={() => setIsExportOpen(true)}
                    isDesktopLayout={true}
                  />
                </div>

                <div className="col-span-4 space-y-6">
                  <ImportantNotice />
                  <QuickLinks
                    onNavigateTab={handleTabChange}
                    onOpenContacts={handleOpenContacts}
                  />
                  <div className="text-right pt-4 pr-1">
                    <span className="text-xs font-bold text-gray-500 font-['Unbounded'] tracking-wider block">
                      РИТМ
                    </span>
                    <span className="text-[10px] text-gray-600">всегда рядом</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'schedule' && <ScheduleView />}
            {activeTab === 'stats' && <StatsView />}
            {activeTab === 'settings' && <SettingsView />}
          </main>
        </div>

        {/* ================= МОБИЛЬНЫЙ ВИД TELEGRAM MINI APP (<1024px) ================= */}
        <div className="w-full lg:hidden flex flex-col min-h-screen px-4 pb-24 pt-2 max-w-md mx-auto">
          {activeTab === 'home' && (
            <HomeView
              userInitials={userInitials}
              onNavigateTab={handleTabChange}
              onHaptic={triggerHaptic}
              onExport={() => setIsExportOpen(true)}
              onOpenContacts={handleOpenContacts}
            />
          )}
          {activeTab === 'schedule' && <ScheduleView />}
          {activeTab === 'stats' && <StatsView />}
          {activeTab === 'settings' && <SettingsView />}

          {/* Нижний таб-бар для мобильного устройства */}
          <BottomTabBar
            activeTab={activeTab}
            onSelectTab={handleTabChange}
          />
        </div>
      </div>

      {/* Модальное окно экспорта в Excel */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        onSuccessNotification={showNotification}
      />
    </div>
  );
};
