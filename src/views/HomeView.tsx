import React from 'react';
import { Header } from '../components/Header';
import { ScheduleCard } from '../components/ScheduleCard';
import { AttendanceCard } from '../components/AttendanceCard';
import { ImportantNotice } from '../components/ImportantNotice';
import { QuickLinks } from '../components/QuickLinks';
import { TODAY_LESSONS } from '../data/mockData';
import { TabKey } from '../types';

interface HomeViewProps {
  userInitials: string;
  onNavigateTab: (tab: TabKey) => void;
  onHaptic: (type: 'medium' | 'success') => void;
  onExport: () => void;
  onOpenContacts: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  userInitials,
  onNavigateTab,
  onHaptic,
  onExport,
  onOpenContacts,
}) => {
  return (
    <div className="w-full flex flex-col space-y-4">
      {/* Мобильная шапка */}
      <Header
        userInitials={userInitials}
        onOpenSchedule={() => onNavigateTab('schedule')}
      />

      {/* Центральный блок: Карточка расписания на сегодня */}
      <ScheduleCard
        lessons={TODAY_LESSONS}
        onViewAll={() => onNavigateTab('schedule')}
      />

      {/* Блок переклички со статусами */}
      <AttendanceCard
        onHaptic={onHaptic}
        onExport={onExport}
        isDesktopLayout={false}
      />

      {/* Дополнительные блоки: Важно и Быстрые ссылки (отображаются на десктопе или как полезные виджеты) */}
      <div className="pt-1 space-y-4 lg:hidden">
        <ImportantNotice />
        <QuickLinks
          onNavigateTab={onNavigateTab}
          onOpenContacts={onOpenContacts}
        />
      </div>
    </div>
  );
};
