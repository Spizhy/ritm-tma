import React from 'react';
import { BarChart3, TrendingUp, CheckCircle2, AlertTriangle, Users, ExternalLink, ArrowRight } from 'lucide-react';
import { CURRENT_WEEK_INFO } from '../data/mockData';
import { Student } from '../types';

interface StatsViewProps {
  students: Student[];
  onOpenRoster: () => void;
}

export const StatsView: React.FC<StatsViewProps> = ({ students, onOpenRoster }) => {
  const presentCount = students.filter((s) => s.status === 'present').length;
  const lateCount = students.filter((s) => s.status === 'late').length;
  const excuseCount = students.filter((s) => s.status === 'excuse').length;
  const absentCount = students.filter((s) => s.status === 'absent').length;

  const attended = presentCount + lateCount + excuseCount;
  const total = students.length;
  const currentPercent = total > 0 ? Math.round((attended / total) * 100) : 0;

  return (
    <div className="w-full flex flex-col space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-['Unbounded'] tracking-wide text-white">
            Статистика посещаемости
          </h2>
          <p className="text-xs text-[#8E95A5]">Группа {CURRENT_WEEK_INFO.groupName} • Сводка семестра</p>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-[#1A1D27] border border-white/10 text-gray-300 font-mono">
          {total} чел.
        </span>
      </div>

      {/* Главная метрика */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-[#161822] to-[#12131A] border border-white/[0.08] relative overflow-hidden shadow-lg">
        <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-[#EF233C]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="text-xs text-gray-400 font-medium">
          Текущая явка группы сегодня
        </div>
        <div className="flex items-baseline gap-3 mt-1.5">
          <span className="text-4xl font-extrabold text-white font-['Unbounded']">
            {currentPercent}%
          </span>
          <span className="flex items-center text-xs font-semibold text-emerald-400 gap-0.5">
            <TrendingUp className="w-3.5 h-3.5" /> {attended} из {total} на связи
          </span>
        </div>

        <div className="w-full h-2 bg-[#1A1D27] rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-gradient-to-r from-[#EF233C] to-[#10B981] rounded-full transition-all duration-500"
            style={{ width: `${currentPercent}%` }}
          />
        </div>
      </div>

      {/* Быстрая аналитика */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-[#14161D] border border-white/[0.08]">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>На парах</span>
          </div>
          <div className="text-xl font-bold text-white mt-2">{presentCount} чел</div>
          <div className="text-[10px] text-gray-500 mt-0.5">
            {Math.round((presentCount / total) * 100)}% от группы
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#14161D] border border-white/[0.08]">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Отсутствуют</span>
          </div>
          <div className="text-xl font-bold text-white mt-2">{absentCount} чел</div>
          <div className="text-[10px] text-gray-500 mt-0.5">
            {Math.round((absentCount / total) * 100)}% без отметки
          </div>
        </div>
      </div>

      {/* Блок списка группы и базы данных студентов */}
      <div className="p-5 rounded-2xl bg-[#14161D] border border-white/[0.08] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#EF233C]" />
            <h3 className="text-sm font-semibold text-white">
              База группы и Telegram профили
            </h3>
          </div>
          <button
            onClick={onOpenRoster}
            className="text-xs text-[#EF233C] hover:underline flex items-center gap-1 font-medium cursor-pointer"
          >
            <span>Вся группа</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Быстрый переход к личным сообщениям в Telegram по клику на никнейм:
        </p>

        <div className="space-y-2 pt-1 max-h-56 overflow-y-auto pr-1">
          {students.slice(0, 6).map((student) => {
            const tgLink = student.username ? `https://t.me/${student.username.replace('@', '')}` : null;
            return (
              <div
                key={student.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#1A1D27] text-xs"
              >
                <span className="text-gray-200 font-medium truncate max-w-[170px]">
                  {student.name}
                </span>
                {tgLink ? (
                  <a
                    href={tgLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[#EF233C] hover:underline text-[11px]"
                  >
                    <span>@{student.username}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-gray-500 text-[10px]">—</span>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={onOpenRoster}
          className="w-full py-2.5 rounded-xl bg-[#202433] hover:bg-[#282E40] text-gray-200 text-xs font-semibold border border-white/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Users className="w-3.5 h-3.5 text-[#EF233C]" />
          <span>Управление списком всех {students.length} студентов</span>
        </button>
      </div>

      {/* Посещаемость по дисциплинам */}
      <div className="p-5 rounded-2xl bg-[#14161D] border border-white/[0.08] space-y-3">
        <h3 className="text-sm font-semibold text-white">
          Посещаемость по дисциплинам
        </h3>

        <div className="space-y-3 pt-1">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-200">Программирование</span>
              <span className="text-emerald-400 font-semibold font-mono">96%</span>
            </div>
            <div className="w-full h-1.5 bg-[#1F222E] rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '96%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-200">Базы данных</span>
              <span className="text-emerald-400 font-semibold font-mono">91%</span>
            </div>
            <div className="w-full h-1.5 bg-[#1F222E] rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '91%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-200">Высшая математика</span>
              <span className="text-amber-400 font-semibold font-mono">78%</span>
            </div>
            <div className="w-full h-1.5 bg-[#1F222E] rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '78%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
