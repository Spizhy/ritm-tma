import React, { useState } from 'react';
import { Users, Check, Clock, ShieldCheck, X, Download } from 'lucide-react';
import { AttendanceStatus } from '../types';
import { INITIAL_ATTENDANCE_OPTIONS } from '../data/mockData';

interface AttendanceCardProps {
  onHaptic?: (type: 'medium' | 'success') => void;
  onExport?: () => void;
  isDesktopLayout?: boolean;
}

export const AttendanceCard: React.FC<AttendanceCardProps> = ({
  onHaptic,
  onExport,
  isDesktopLayout = false,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<AttendanceStatus>('present');
  const [counts, setCounts] = useState<{ [key in AttendanceStatus]: number }>({
    present: 20,
    late: 2,
    excuse: 2,
    absent: 4,
  });

  const totalStudents = 28;
  // Явка = присутствующие (present + late)
  const attendedCount = counts.present + counts.late + counts.excuse; // 24 из 28
  const attendancePercent = Math.round((attendedCount / totalStudents) * 100);

  const handleSelectStatus = (status: AttendanceStatus) => {
    if (selectedStatus === status) return;

    if (onHaptic) onHaptic('medium');

    setCounts((prev) => {
      const copy = { ...prev };
      if (selectedStatus && copy[selectedStatus] > 0) {
        copy[selectedStatus] -= 1;
      }
      copy[status] += 1;
      return copy;
    });

    setSelectedStatus(status);
  };

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case 'present':
        return <Check className="w-4 h-4 stroke-[2.5]" />;
      case 'late':
        return <Clock className="w-4 h-4 stroke-[2.5]" />;
      case 'excuse':
        return <ShieldCheck className="w-4 h-4 stroke-[2.5]" />;
      case 'absent':
        return <X className="w-4 h-4 stroke-[2.5]" />;
    }
  };

  return (
    <div className="w-full bg-[#14161D] rounded-2xl border border-white/[0.08] p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
      {/* Шапка блока переклички */}
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-4 h-4 text-gray-300" />
        <h2 className="text-[15px] font-semibold text-white tracking-wide">
          Перекличка
        </h2>
      </div>

      {/* Кнопки статуса: 2x2 на мобайле, 1x4 на десктопе */}
      <div
        className={`grid gap-2.5 mb-5 ${
          isDesktopLayout ? 'grid-cols-4' : 'grid-cols-2'
        }`}
      >
        {INITIAL_ATTENDANCE_OPTIONS.map((opt) => {
          const isSelected = selectedStatus === opt.key;
          return (
            <button
              key={opt.key}
              onClick={() => handleSelectStatus(opt.key)}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all duration-200 select-none active:scale-[0.96] shadow-sm ${
                opt.bgClass
              } ${opt.hoverClass} ${
                isSelected
                  ? 'ring-2 ring-white/90 brightness-110 shadow-lg scale-[1.02]'
                  : 'opacity-90 hover:opacity-100'
              }`}
            >
              <span className="shrink-0">{getStatusIcon(opt.key)}</span>
              <span className="truncate">{opt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Нижняя информационная строка: прогресс явки и кнопка выгрузки */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-medium text-gray-200">
          <div className="flex items-center gap-1.5 font-sans">
            <span>Явка:</span>
            <span className="font-bold text-white">
              {`${attendedCount} из ${totalStudents}`}
            </span>
            <span className="text-gray-400 font-mono">({attendancePercent}%)</span>
          </div>

          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A1D27] hover:bg-[#252937] text-gray-300 hover:text-white border border-white/10 text-[11px] font-mono transition-all active:scale-95 shadow-sm"
          >
            <Download className="w-3 h-3 text-gray-400" />
            <span>/export → .xlsx</span>
          </button>
        </div>

        {/* Неоновый градиентный прогресс-бар РИТМ */}
        <div className="w-full h-1.5 bg-[#1F222E] rounded-full overflow-hidden p-[1px]">
          <div
            className="h-full bg-gradient-to-r from-[#EF233C] to-[#FF2A4B] rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(239,35,60,0.8)]"
            style={{ width: `${attendancePercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
