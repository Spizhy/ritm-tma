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
        return 'bg-[#351219] text-[#EF233C] border border-[#EF233C]/50';
      case 'PLANNED':
        return 'bg-[#093325] text-[#10B981] border border-[#10B981]/50';
      case 'DEADLINE':
        return 'bg-[#38200B] text-[#F59E0B] border border-[#F59E0B]/50';
      default:
        return 'bg-[#1A1D27] text-gray-300 border border-white/10';
    }
  };

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    if (onLessonSelect) onLessonSelect(lesson);
  };

  return (
    <div className="w-full bg-[#13151B] rounded-[20px] border border-white/[0.08] p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
      {/* Шапка блока */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#EF233C] shadow-[0_0_8px_#EF233C]"></span>
          <h2 className="text-[15px] font-semibold text-white tracking-wide">
            Расписание на сегодня
          </h2>
        </div>

        {onViewAll && (
          <button
            onClick={onViewAll}
            className="flex items-center gap-1 text-xs text-[#8E95A5] hover:text-white transition-colors group cursor-pointer"
          >
            <span>Все занятия</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {/* Список пар */}
      <div className="space-y-3.5">
        {lessons.map((lesson, idx) => (
          <div
            key={lesson.id}
            onClick={() => handleLessonClick(lesson)}
            className={`group relative flex items-center justify-between p-3.5 rounded-xl hover:bg-[#1A1D27]/60 transition-colors cursor-pointer ${
              idx !== lessons.length - 1 ? 'border-b border-white/[0.04] pb-4' : ''
            }`}
          >
            {/* Левая колонка: Время и Аудитория */}
            <div className="w-28 sm:w-32 shrink-0">
              <div className="text-[13px] font-bold text-white tracking-tight font-mono">
                {`${lesson.timeStart} – ${lesson.timeEnd}`}
              </div>
              <div className="text-[11px] text-[#8E95A5] mt-0.5 font-medium">
                {lesson.room}
              </div>
            </div>

            {/* Центральная колонка: Предмет и Преподаватель */}
            <div className="flex-1 px-3 sm:px-4 min-w-0">
              <div className="text-[13px] font-semibold text-white truncate group-hover:text-red-400 transition-colors">
                {lesson.subject}
              </div>
              <div className="text-[11px] text-[#8E95A5] truncate mt-0.5">
                {lesson.teacher}
              </div>
            </div>

            {/* Правая колонка: Бейдж статуса */}
            <div className="shrink-0 pl-1">
              <span
                className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase select-none transition-transform group-hover:scale-105 shadow-sm ${getBadgeStyle(
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
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
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
                className="w-8 h-8 rounded-full bg-[#1F2332] text-gray-400 hover:text-white flex items-center justify-center text-sm cursor-pointer"
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
                <MapPin className="w-4 h-4 text-[#10B981]" />
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
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold active:scale-98 transition-all cursor-pointer"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
