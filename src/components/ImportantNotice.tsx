import React, { useState } from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { CancellationAlert } from '../types';

interface ImportantNoticeProps {
  alert?: CancellationAlert | null;
}

export const ImportantNotice: React.FC<ImportantNoticeProps> = ({ alert }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const title = alert?.subject
    ? `Занятие по ${alert.subject.toLowerCase()} ${alert.status === 'CANCELLED' ? 'отменено' : alert.statusLabel.toLowerCase()}`
    : 'Занятие по математике отменено';

  const dateStr = alert?.dateStr || 'Сегодня, 08:00';
  const reasonText = alert?.reason ||
    'Уведомление от деканата: пара по высшей математике (08:30–10:00) отменена в связи с участием преподавателя в конференции. Перенос будет согласован со старостой группы.';

  return (
    <div className="w-full bg-[#13151B] rounded-[20px] border border-white/[0.08] p-6 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-4 h-4 text-[#EF233C]" />
        <h3 className="text-sm font-semibold text-white tracking-wide">Важно</h3>
      </div>

      <div className="p-4 rounded-xl bg-[#20151C] border border-[#EF233C]/20">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-[#EF233C] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">
            !
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white leading-snug">
              {title}
            </div>
            <div className="text-[11px] text-[#8E95A5] mt-1">{dateStr}</div>

            {isExpanded && (
              <p className="text-[11px] text-gray-300 mt-2.5 pt-2.5 border-t border-white/10 leading-relaxed animate-in fade-in">
                {reasonText}
              </p>
            )}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-[11px] font-medium text-gray-300 hover:text-white mt-2.5 group transition-colors cursor-pointer"
            >
              <span>{isExpanded ? 'Скрыть' : 'Подробнее'}</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
