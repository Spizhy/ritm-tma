import React from 'react';
import { BarChart3, TrendingUp, Award, CheckCircle2, AlertTriangle } from 'lucide-react';
import { CURRENT_WEEK_INFO } from '../data/mockData';

export const StatsView: React.FC = () => {
  return (
    <div className="w-full flex flex-col space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-['Unbounded'] tracking-wide text-white">
          Статистика
        </h2>
        <span className="text-xs px-3 py-1 rounded-full bg-[#1A1D27] border border-white/10 text-gray-300">
          Группа {CURRENT_WEEK_INFO.groupName}
        </span>
      </div>

      {/* Главная метрика */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-[#161822] to-[#12131A] border border-white/[0.08] relative overflow-hidden shadow-lg">
        <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-[#EF233C]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="text-xs text-gray-400 font-medium">
          Общая посещаемость за семестр
        </div>
        <div className="flex items-baseline gap-3 mt-1.5">
          <span className="text-4xl font-extrabold text-white font-['Unbounded']">
            89.4%
          </span>
          <span className="flex items-center text-xs font-semibold text-emerald-400 gap-0.5">
            <TrendingUp className="w-3.5 h-3.5" /> +2.1% к прошлой неделе
          </span>
        </div>

        <div className="w-full h-2 bg-[#1A1D27] rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-gradient-to-r from-[#EF233C] to-[#10B981] rounded-full"
            style={{ width: '89.4%' }}
          />
        </div>
      </div>

      {/* Быстрая аналитика */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-[#14161D] border border-white/[0.08]">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Без пропусков</span>
          </div>
          <div className="text-xl font-bold text-white mt-2">16 чел</div>
          <div className="text-[10px] text-gray-500 mt-0.5">57% от группы</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#14161D] border border-white/[0.08]">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Зона риска</span>
          </div>
          <div className="text-xl font-bold text-white mt-2">3 чел</div>
          <div className="text-[10px] text-gray-500 mt-0.5">&gt; 30% пропусков</div>
        </div>
      </div>

      {/* Посещаемость по предметам */}
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
