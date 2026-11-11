export type LessonStatus = 'CANCELLED' | 'PLANNED' | 'DEADLINE' | 'RESCHEDULED' | 'ONLINE';

export interface Lesson {
  id: string;
  timeStart: string;
  timeEnd: string;
  room: string;
  subject: string;
  teacher: string;
  status: LessonStatus;
  statusLabel: string;
  note?: string;
  weekday?: string; // "Понедельник", "Вторник", etc.
  weekType?: 'all' | 'odd' | 'even';
}

export type AttendanceStatus = 'present' | 'late' | 'excuse' | 'absent';

export interface AttendanceOption {
  key: AttendanceStatus;
  label: string;
  iconName: 'check' | 'clock' | 'shield' | 'x';
  bgClass: string;
  hoverClass: string;
  activeClass: string;
  count: number;
}

export interface Student {
  id: string;
  name: string;
  username?: string; // Telegram @username without @ or with @
  status: AttendanceStatus;
  groupName: string;
  updatedAt?: string;
}

export interface DaySchedule {
  dateStr: string; // "17 октября"
  dayOfWeek: string; // "Пятница"
  isToday: boolean;
  lessons: Lesson[];
}

export interface CancellationAlert {
  id: string;
  lessonId: string;
  subject: string;
  time: string;
  status: LessonStatus;
  statusLabel: string;
  dateStr: string;
  reason: string;
  newRoom?: string;
  timestamp: string;
}

export type TabKey = 'home' | 'schedule' | 'stats' | 'settings';
