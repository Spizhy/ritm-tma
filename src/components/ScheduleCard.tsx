import React, { useState } from 'react';
import { ArrowRight, Info, MapPin, User, Clock } from 'lucide-react';
import { Lesson } from '../types';

interface ScheduleCardProps {
  lessons: Lesson[];
  onViewAll?: () => void;
  onLessonSelect?: (lesson: Lesson) => void;
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({
  lessons,
  onViewAll,
  onLessonSelect,
}) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const getBadgeStyle = (status: Lesson['status']) => {
    switch (status) {
      case 'CANCELLED':
        return 'bg-[#3A141A] text-[#FB7185] border border-[#EF233C]/40';
      case 'PLANNED':
        return 'bg-[#064E3B] text-[#34D399] border border-[#10B981]/40';
      case 'DEADLINE':
        return 'bg-[#451A03] text-[#FBBF24] border border-[#F59E0B]/40';
      default:
        return 'bg-[#1A1D27] text-gray-300 border border-white/10';
    }
  };

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    if (onLessonSelect) onLessonSelect(lesson);
  };

  return (
    <div className="w-full bg-[#14161D] rounded-2xl border border-white/[0.08] p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
      {/* Шапка блока */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {/* Пульсирующая красная точка */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF233C] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EF233C]"></span>
          </span>
          <h2 className="text-[15px] font-semibold text-white tracking-wide">
            Расписание на сегодня
          </h2>
        </div>

        {onViewAll && (
          <button
            onClick={onViewAll}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors group active:scale-95"
          >
            <span>Все занятия</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {/* Список пар */}
      <div className="space-y-3">
        {lessons.map((lesson, idx) => (
          <div
            key={lesson.id}
            onClick={() => handleLessonClick(lesson)}
            className={`group relative flex items-center justify-between p-3 rounded-xl bg-[#1A1D27]/80 hover:bg-[#1E2230] border border-transparent hover:border-white/10 cursor-pointer transition-all duration-200 active:scale-[0.99] ${
              idx !== lessons.length - 1 ? 'border-b border-white/[0.04]' : ''
            }`}
          >
            {/* Левая колонка: Время и Аудитория */}
            <div className="w-24 shrink-0">
              <div className="text-[13px] font-semibold text-white tracking-tight font-mono">
                {`${lesson.timeStart} – ${lesson.timeEnd}`}
              </div>
              <div className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                <span>{lesson.room}</span>
              </div>
            </div>

            {/* Центральная колонка: Предмет и Преподаватель */}
            <div className="flex-1 px-3 min-w-0">
              <div className="text-[13px] font-semibold text-gray-100 truncate group-hover:text-white transition-colors">
                {lesson.subject}
              </div>
              <div className="text-[11px] text-gray-400 truncate mt-0.5">
                {lesson.teacher}
              </div>
            </div>

            {/* Правая колонка: Бейдж статуса */}
            <div className="shrink-0 pl-1">
              <span
                className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase select-none transition-transform group-hover:scale-105 ${getBadgeStyle(
                  lesson.status
                )}`}
              >
                {lesson.statusLabel}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно деталей занятия */}
      {selectedLesson && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedLesson(null)}
        >
          <div
            className="w-full sm:max-w-md bg-[#161822] border border-white/15 rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto sm:hidden mb-2" />

            <div className="flex items-start justify-between">
              <div>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase mb-2 ${getBadgeStyle(
                    selectedLesson.status
                  )}`}
                >
                  {selectedLesson.statusLabel}
                </span>
                <h3 className="text-lg font-bold text-white leading-snug">
                  {selectedLesson.subject}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLesson(null)}
                className="w-8 h-8 rounded-full bg-[#1F2332] text-gray-400 hover:text-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2.5 bg-[#1A1D27] p-2.5 rounded-xl">
                <Clock className="w-4 h-4 text-[#EF233C]" />
                <span className="font-mono">
                  {selectedLesson.timeStart} – {selectedLesson.timeEnd}
                </span>
              </div>
              <div className="flex items-center gap-2.5 bg-[#1A1D27] p-2.5 rounded-xl">
                <MapPin className="w-4 h-4 text-[#34D399]" />
                <span>{selectedLesson.room}</span>
              </div>
              <div className="flex items-center gap-2.5 bg-[#1A1D27] p-2.5 rounded-xl">
                <User className="w-4 h-4 text-[#818CF8]" />
                <span>{selectedLesson.teacher}</span>
              </div>
            </div>

            {selectedLesson.note && (
              <div className="p-3 rounded-xl bg-[#221C26] border border-[#EF233C]/20 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#EF233C] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-200 leading-relaxed">
                  {selectedLesson.note}
                </p>
              </div>
            )}

            <button
              onClick={() => setSelectedLesson(null)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold active:scale-98 transition-all"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
