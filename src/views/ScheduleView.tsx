import React, { useState } from 'react';
import { Clock, MapPin, User, Info } from 'lucide-react';
import { FULL_WEEK_SCHEDULE } from '../data/mockData';
import { Lesson } from '../types';

export const ScheduleView: React.FC = () => {
  const [selectedDayIdx, setSelectedDayIdx] = useState(4); // Пятница по умолчанию

  const activeDay = FULL_WEEK_SCHEDULE[selectedDayIdx];

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

  return (
    <div className="w-full flex flex-col space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-['Unbounded'] tracking-wide text-white">
          Расписание
        </h2>
        <span className="text-xs px-3 py-1 rounded-full bg-[#1A1D27] border border-white/10 text-gray-300">
          Нечетная неделя
        </span>
      </div>

      {/* Горизонтальный переключатель дней недели */}
      <div className="flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar py-1">
        {FULL_WEEK_SCHEDULE.map((day, idx) => {
          const isSelected = selectedDayIdx === idx;
          const shortName = day.dayOfWeek.slice(0, 2);

          return (
            <button
              key={day.dayOfWeek}
              onClick={() => setSelectedDayIdx(idx)}
              className={`flex-1 min-w-[56px] py-2.5 px-2 rounded-xl flex flex-col items-center justify-center transition-all duration-200 active:scale-95 ${
                isSelected
                  ? 'bg-gradient-to-b from-[#EF233C] to-[#C81D32] text-white shadow-[0_4px_16px_rgba(239,35,60,0.4)]'
                  : 'bg-[#14161D] text-gray-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              <span className="text-[11px] font-semibold">{shortName}</span>
              <span
                className={`text-[10px] mt-0.5 ${
                  isSelected ? 'text-white/90' : 'text-gray-500'
                }`}
              >
                {day.dateStr.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Заголовок выбранного дня */}
      <div className="flex items-center justify-between px-1">
        <div className="text-sm font-semibold text-white">
          {activeDay.dayOfWeek}, {activeDay.dateStr}
        </div>
        {activeDay.isToday && (
          <span className="text-[10px] font-bold text-[#EF233C] bg-[#EF233C]/10 px-2 py-0.5 rounded-full border border-[#EF233C]/20">
            СЕГОДНЯ
          </span>
        )}
      </div>

      {/* Список занятий выбранного дня */}
      <div className="space-y-3">
        {activeDay.lessons.length === 0 ? (
          <div className="p-8 text-center text-gray-400 bg-[#14161D] rounded-2xl border border-white/[0.08]">
            В этот день пар нет.
          </div>
        ) : (
          activeDay.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="p-4 rounded-2xl bg-[#14161D] border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.3)] space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-gray-300">
                  <Clock className="w-3.5 h-3.5 text-[#EF233C]" />
                  <span>
                    {lesson.timeStart} – {lesson.timeEnd}
                  </span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${getBadgeStyle(
                    lesson.status
                  )}`}
                >
                  {lesson.statusLabel}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">{lesson.subject}</h4>
                <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {lesson.teacher}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {lesson.room}
                  </span>
                </div>
              </div>

              {lesson.note && (
                <div className="text-xs text-gray-300 p-2.5 rounded-xl bg-[#1A1D27] border border-white/5 flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 text-[#EF233C] shrink-0 mt-0.5" />
                  <span>{lesson.note}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
