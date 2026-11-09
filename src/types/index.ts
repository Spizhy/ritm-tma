export type LessonStatus = 'CANCELLED' | 'PLANNED' | 'DEADLINE';

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

export interface StudentAttendance {
  id: string;
  fullName: string;
  status: AttendanceStatus | null;
  updatedAt?: string;
}

export interface DaySchedule {
  dateStr: string; // "17 октября"
  dayOfWeek: string; // "Пятница"
  isToday: boolean;
  lessons: Lesson[];
}

export type TabKey = 'home' | 'schedule' | 'stats' | 'settings';
