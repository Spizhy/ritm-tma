import React, { useState } from 'react';
import { Zap, AlertCircle, ArrowRight } from 'lucide-react';

export const ImportantNotice: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full bg-[#14161D] rounded-2xl border border-white/[0.08] p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4 text-[#EF233C]" />
        <h3 className="text-sm font-semibold text-white tracking-wide">Важно</h3>
      </div>

      <div className="flex items-start gap-3 p-3 rounded-xl bg-[#20151C] border border-[#EF233C]/20">
        <div className="w-6 h-6 rounded-full bg-[#EF233C] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
          !
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-white leading-snug">
            Занятие по математике отменено
          </div>
          <div className="text-[11px] text-gray-400 mt-1">Сегодня, 08:00</div>

          {isExpanded && (
            <p className="text-[11px] text-gray-300 mt-2 pt-2 border-t border-white/10 leading-relaxed animate-in fade-in">
              Уведомление от деканата: пара по высшей математике (08:30–10:00) отменена в связи с участием Иванова А. С. в конференции. Перенос будет согласован со старостой группы.
            </p>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-[11px] font-semibold text-gray-300 hover:text-white mt-2 group transition-colors"
          >
            <span>{isExpanded ? 'Скрыть' : 'Подробнее'}</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
