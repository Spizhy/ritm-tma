import React, { useState } from 'react';
import { Download, Copy, Check, FileSpreadsheet, X } from 'lucide-react';
import { MOCK_STUDENTS, CURRENT_WEEK_INFO } from '../data/mockData';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessNotification?: (text: string) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  onSuccessNotification,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const getStatusText = (status: string) => {
    switch (status) {
      case 'present':
        return 'На парах';
      case 'late':
        return 'Опаздывает';
      case 'excuse':
        return 'Уважительная';
      case 'absent':
        return 'Отсутствует';
      default:
        return 'Не отметился';
    }
  };

  const generateReportText = () => {
    const present = MOCK_STUDENTS.filter((s) => s.status === 'present').length;
    const late = MOCK_STUDENTS.filter((s) => s.status === 'late').length;
    const excuse = MOCK_STUDENTS.filter((s) => s.status === 'excuse').length;
    const absent = MOCK_STUDENTS.filter((s) => s.status === 'absent').length;

    let text = `Отчет переклички — Группа ${CURRENT_WEEK_INFO.groupName}\n`;
    text += `Дата: ${CURRENT_WEEK_INFO.dayOfWeek}, ${CURRENT_WEEK_INFO.dateFormatted}\n\n`;
    text += `[+] На парах: ${present}\n`;
    text += `[~] Опаздывают: ${late}\n`;
    text += `[?] Уважительная: ${excuse}\n`;
    text += `[-] Отсутствуют: ${absent}\n\n`;
    text += `Пофамильный список:\n`;

    MOCK_STUDENTS.forEach((s, idx) => {
      text += `${idx + 1}. ${s.name} — ${getStatusText(s.status)}\n`;
    });

    return text;
  };

  const handleCopy = () => {
    const text = generateReportText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    if (onSuccessNotification) {
      onSuccessNotification('Отчет скопирован для отправки в Telegram!');
    }
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    const header = '№;ФИО;Статус;Дата;Группа\n';
    const rows = MOCK_STUDENTS.map(
      (s, idx) =>
        `${idx + 1};"${s.name}";"${getStatusText(s.status)}";"${CURRENT_WEEK_INFO.dateFormatted}";"${CURRENT_WEEK_INFO.groupName}"`
    ).join('\n');

    const csvContent = '\uFEFF' + header + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Явка_${CURRENT_WEEK_INFO.groupName}_${CURRENT_WEEK_INFO.dateFormatted.replace(' ', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (onSuccessNotification) {
      onSuccessNotification('Таблица Excel (.csv/.xlsx) успешно сформирована!');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg bg-[#161822] border border-white/15 rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto sm:hidden mb-1" />

        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">
              Экспорт переклички в Excel
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1F2332] text-gray-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-gray-300">
          Сводка по группе <b>{CURRENT_WEEK_INFO.groupName}</b> за {CURRENT_WEEK_INFO.dayOfWeek}, {CURRENT_WEEK_INFO.dateFormatted}.
        </p>

        {/* Список студентов со статусами */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 max-h-60 no-scrollbar">
          {MOCK_STUDENTS.map((student, idx) => (
            <div
              key={student.id}
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#1A1D27] text-xs"
            >
              <span className="text-gray-200 font-medium">
                {idx + 1}. {student.name}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  student.status === 'present'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : student.status === 'late'
                    ? 'bg-amber-500/20 text-amber-400'
                    : student.status === 'excuse'
                    ? 'bg-indigo-500/20 text-indigo-400'
                    : 'bg-rose-500/20 text-rose-400'
                }`}
              >
                {getStatusText(student.status)}
              </span>
            </div>
          ))}
        </div>

        {/* Кнопки действий */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1A1D27] hover:bg-[#222634] text-gray-200 text-xs font-semibold active:scale-95 transition-all border border-white/10"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Скопировано</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-gray-400" />
                <span>В буфер (текст)</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadCsv}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#059669] to-[#10B981] hover:brightness-110 text-white text-xs font-semibold active:scale-95 transition-all shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Скачать .xlsx</span>
          </button>
        </div>
      </div>
    </div>
  );
};
