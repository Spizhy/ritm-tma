import React, { useState } from 'react';
import { Clock, MapPin, User, Info, Upload, Edit3, Table, LayoutList } from 'lucide-react';
import { DaySchedule, Lesson } from '../types';

interface ScheduleViewProps {
  schedule: DaySchedule[];
  onOpenImport: () => void;
  onEditLesson: (lesson: Lesson) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  schedule,
  onOpenImport,
  onEditLesson,
}) => {
  const [selectedDayIdx, setSelectedDayIdx] = useState(4); // Пятница по умолчанию
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const activeDay = schedule[selectedDayIdx] || schedule[0];

  const getBadgeStyle = (status: Lesson['status']) => {
    switch (status) {
      case 'CANCELLED':
        return 'bg-[#3A141A] text-[#FB7185] border border-[#EF233C]/40';
      case 'PLANNED':
        return 'bg-[#064E3B] text-[#34D399] border border-[#10B981]/40';
      case 'DEADLINE':
        return 'bg-[#451A03] text-[#FBBF24] border border-[#F59E0B]/40';
      case 'RESCHEDULED':
        return 'bg-[#2E1065] text-[#A78BFA] border border-[#8B5CF6]/40';
      case 'ONLINE':
        return 'bg-[#082F49] text-[#38BDF8] border border-[#0284C7]/40';
      default:
        return 'bg-[#1A1D27] text-gray-300 border border-white/10';
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4 pt-2">
      {/* Шапка расписания с кнопками действий */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold font-['Unbounded'] tracking-wide text-white">
            Расписание занятий
          </h2>
          <p className="text-xs text-[#8E95A5]">Группа ИВТ-21 • Нечетная неделя</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Переключатель вида: Карточки / Таблица */}
          <div className="flex items-center bg-[#1A1D27] p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'cards'
                  ? 'bg-[#EF233C] text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Вид карточек"
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'table'
                  ? 'bg-[#EF233C] text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Табличный вид"
            >
              <Table className="w-4 h-4" />
            </button>
          </div>

          {/* Кнопка импорта расписания */}
          <button
            onClick={onOpenImport}
            className="px-3 py-2 rounded-xl bg-[#EF233C]/15 hover:bg-[#EF233C]/25 text-[#EF233C] border border-[#EF233C]/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Импорт</span>
          </button>
        </div>
      </div>

      {/* Горизонтальный переключатель дней недели */}
      <div className="flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar py-1">
        {schedule.map((day, idx) => {
          const isSelected = selectedDayIdx === idx;
          const shortName = day.dayOfWeek.slice(0, 2);

          return (
            <button
              key={day.dayOfWeek}
              onClick={() => setSelectedDayIdx(idx)}
              className={`flex-1 min-w-[56px] py-2.5 px-2 rounded-xl flex flex-col items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer ${
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
                {day.dateStr ? day.dateStr.split(' ')[0] : `${idx + 13}`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Заголовок выбранного дня */}
      <div className="flex items-center justify-between px-1">
        <div className="text-sm font-semibold text-white">
          {activeDay.dayOfWeek} {activeDay.dateStr ? `(${activeDay.dateStr})` : ''}
        </div>
        {activeDay.isToday && (
          <span className="text-[10px] font-bold text-[#EF233C] bg-[#EF233C]/10 px-2.5 py-0.5 rounded-full border border-[#EF233C]/20">
            СЕГОДНЯ
          </span>
        )}
      </div>

      {/* РЕЖИМ 1: КАРТОЧКИ */}
      {viewMode === 'cards' && (
        <div className="space-y-3">
          {activeDay.lessons.length === 0 ? (
            <div className="p-8 text-center text-gray-400 bg-[#14161D] rounded-2xl border border-white/[0.08] text-xs">
              В этот день занятий нет.
            </div>
          ) : (
            activeDay.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="p-4 rounded-2xl bg-[#14161D] border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.3)] space-y-3 transition-colors hover:border-white/15"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-gray-300">
                    <Clock className="w-3.5 h-3.5 text-[#EF233C]" />
                    <span>
                      {lesson.timeStart} – {lesson.timeEnd}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${getBadgeStyle(
                        lesson.status
                      )}`}
                    >
                      {lesson.statusLabel}
                    </span>
                    <button
                      onClick={() => onEditLesson(lesson)}
                      className="p-1 rounded-lg bg-[#1E2230] text-gray-400 hover:text-[#EF233C] transition-colors cursor-pointer"
                      title="Редактировать / Отменить пару"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">{lesson.subject}</h4>
                  <div className="flex flex-wrap items-center gap-4 mt-1.5 text-xs text-gray-400">
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
      )}

      {/* РЕЖИМ 2: ТАБЛИЦА В ДИЗАЙНЕ РИТМ */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#14161D] shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1A1D27] text-gray-400 border-b border-white/[0.06] font-mono uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Время</th>
                <th className="py-3 px-4">Дисциплина</th>
                <th className="py-3 px-4">Аудитория</th>
                <th className="py-3 px-4">Преподаватель</th>
                <th className="py-3 px-4 text-center">Статус</th>
                <th className="py-3 px-4 text-right">Действие</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {activeDay.lessons.map((lesson) => (
                <tr key={lesson.id} className="hover:bg-[#1A1D27]/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-white whitespace-nowrap">
                    {lesson.timeStart} – {lesson.timeEnd}
                  </td>
                  <td className="py-3 px-4 font-bold text-white max-w-[200px] truncate">
                    {lesson.subject}
                  </td>
                  <td className="py-3 px-4 text-gray-300 whitespace-nowrap">
                    {lesson.room}
                  </td>
                  <td className="py-3 px-4 text-gray-400 whitespace-nowrap">
                    {lesson.teacher}
                  </td>
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${getBadgeStyle(
                        lesson.status
                      )}`}
                    >
                      {lesson.statusLabel}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => onEditLesson(lesson)}
                      className="px-2.5 py-1 rounded-lg bg-[#1E2230] hover:bg-[#EF233C]/20 text-gray-300 hover:text-[#EF233C] text-[11px] font-semibold transition-all cursor-pointer"
                    >
                      Правка
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
