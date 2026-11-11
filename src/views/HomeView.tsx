import React from 'react';
import { Header } from '../components/Header';
import { ScheduleCard } from '../components/ScheduleCard';
import { AttendanceCard } from '../components/AttendanceCard';
import { ImportantNotice } from '../components/ImportantNotice';
import { QuickLinks } from '../components/QuickLinks';
import { TabKey, Lesson, CancellationAlert, AttendanceStatus } from '../types';

interface HomeViewProps {
  userInitials: string;
  onNavigateTab: (tab: TabKey) => void;
  onHaptic: (type: 'medium' | 'success') => void;
  onExport: () => void;
  onOpenContacts: () => void;
  lessons: Lesson[];
  alert?: CancellationAlert | null;
  onOpenRoster?: () => void;
  onEditLesson?: (lesson: Lesson) => void;
  attendanceCounts?: { [key in AttendanceStatus]: number };
  totalStudents?: number;
}

export const HomeView: React.FC<HomeViewProps> = ({
  userInitials,
  onNavigateTab,
  onHaptic,
  onExport,
  onOpenContacts,
  lessons,
  alert,
  onOpenRoster,
  onEditLesson,
  attendanceCounts,
  totalStudents,
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
        lessons={lessons}
        onViewAll={() => onNavigateTab('schedule')}
        onEditLesson={onEditLesson}
      />

      {/* Блок переклички со статусами */}
      <AttendanceCard
        onHaptic={onHaptic}
        onExport={onExport}
        onOpenRoster={onOpenRoster}
        isDesktopLayout={false}
        totalStudents={totalStudents}
        counts={attendanceCounts}
      />

      {/* Дополнительные блоки: Важно и Быстрые ссылки */}
      <div className="pt-1 space-y-4 lg:hidden">
        <ImportantNotice alert={alert} />
        <QuickLinks
          onNavigateTab={onNavigateTab}
          onOpenContacts={onOpenContacts}
        />
      </div>
    </div>
  );
};
