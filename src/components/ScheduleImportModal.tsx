import React, { useState } from 'react';
import { X, Upload, FileText, Check, AlertTriangle, ArrowRight, Table } from 'lucide-react';
import { Lesson, DaySchedule } from '../types';

interface ScheduleImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (importedSchedule: DaySchedule[]) => void;
}

export const ScheduleImportModal: React.FC<ScheduleImportModalProps> = ({
  isOpen,
  onClose,
  onImportSuccess,
}) => {
  if (!isOpen) return null;

  const defaultSampleText = `Понедельник
09:00 - 10:30 | Физика | Ауд. 402 | Соколов В. П.
10:45 - 12:15 | История науки | Ауд. 101 | Белова О. Н.

Вторник
10:15 - 11:45 | Алгоритмы и структуры данных | Ауд. 210 | Григорьев С. А.
12:15 - 13:45 | Физическая культура | Спортзал | Миронов Д. Д.

Среда
08:30 - 10:00 | Компьютерные сети | Ауд. 305 | Николаев А. Е.
10:15 - 11:45 | Компьютерные сети (лаб) | Ауд. 305 | Николаев А. Е.

Четверг
10:15 - 11:45 | Архитектура ЭВМ | Ауд. 108 | Ковалев П. С.
12:15 - 13:45 | Операционные системы | Ауд. 108 | Ковалев П. С.

Пятница
08:30 - 10:00 | Высшая математика | Ауд. 203 | Иванов А. С.
10:15 - 11:45 | Программирование | Ауд. 108 | Петров К. В.
12:15 - 13:45 | Базы данных | Ауд. 314 | Сидорова М. А.

Суббота
09:00 - 10:30 | Английский язык | Онлайн / Teams | Власова Е. М.`;

  const [rawText, setRawText] = useState<string>(defaultSampleText);
  const [parsedSchedule, setParsedSchedule] = useState<DaySchedule[] | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);

  const parseScheduleText = (text: string): DaySchedule[] => {
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    const dayNames = [
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
      'Воскресенье',
    ];

    const result: DaySchedule[] = [];
    let currentDay: DaySchedule | null = null;
    let lessonCounter = 1;

    for (const line of lines) {
      const matchedDay = dayNames.find((d) =>
        line.toLowerCase().startsWith(d.toLowerCase())
      );

      if (matchedDay) {
        if (currentDay && currentDay.lessons.length > 0) {
          result.push(currentDay);
        }
        currentDay = {
          dayOfWeek: matchedDay,
          dateStr: '',
          isToday: matchedDay === 'Пятница',
          lessons: [],
        };
        continue;
      }

      // Если нет открытого дня, создаем дефолтный Понедельник
      if (!currentDay) {
        currentDay = {
          dayOfWeek: 'Понедельник',
          dateStr: '',
          isToday: false,
          lessons: [],
        };
      }

      // Парсим строку пары: разделители |, \t, ;
      let parts = line.split(/[|\t;]/).map((p) => p.trim());

      // Если строка без стандартных разделителей, пробуем регулярку времени
      if (parts.length < 2) {
        const timeMatch = line.match(/(\d{1,2}[:.]\d{2})\s*[-—–]\s*(\d{1,2}[:.]\d{2})/);
        if (timeMatch) {
          const time = timeMatch[0];
          const rest = line.replace(time, '').trim();
          parts = [time, ...rest.split(/\s{2,}/).map((p) => p.trim())];
        }
      }

      if (parts.length >= 2) {
        let timePart = parts[0];
        let subject = parts[1] || 'Занятие';
        let room = parts[2] || 'Ауд. не указана';
        let teacher = parts[3] || 'Преподаватель не указан';

        // Форматируем время
        const timeClean = timePart.replace(/[—–]/g, '-');
        const [tStart, tEnd] = timeClean.includes('-')
          ? timeClean.split('-').map((t) => t.trim().replace('.', ':'))
          : ['09:00', '10:30'];

        const newLesson: Lesson = {
          id: `imp-${lessonCounter++}`,
          timeStart: tStart || '09:00',
          timeEnd: tEnd || '10:30',
          subject: subject,
          room: room,
          teacher: teacher,
          status: 'PLANNED',
          statusLabel: 'ПО ПЛАНУ',
          weekday: currentDay.dayOfWeek,
        };

        currentDay.lessons.push(newLesson);
      }
    }

    if (currentDay && currentDay.lessons.length > 0) {
      result.push(currentDay);
    }

    return result;
  };

  const handlePreview = () => {
    try {
      setParseError(null);
      const parsed = parseScheduleText(rawText);
      if (parsed.length === 0 || parsed.every((d) => d.lessons.length === 0)) {
        setParseError('Не удалось распознать ни одной пары. Проверьте формат строк.');
        setParsedSchedule(null);
        return;
      }
      setParsedSchedule(parsed);
    } catch (err: any) {
      setParseError('Ошибка парсинга: ' + (err?.message || 'некорректный текст'));
      setParsedSchedule(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setRawText(content);
        setParsedSchedule(null);
      }
    };
    reader.readAsText(file);
  };

  const handleApply = () => {
    if (!parsedSchedule) {
      const parsed = parseScheduleText(rawText);
      if (parsed.length > 0) {
        onImportSuccess(parsed);
        onClose();
      }
    } else {
      onImportSuccess(parsedSchedule);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#14161F] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Заголовок */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EF233C]/10 border border-[#EF233C]/20 flex items-center justify-center text-[#EF233C]">
              <Table className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white font-['Unbounded']">
                Импорт расписания
              </h3>
              <p className="text-[11px] text-[#8E95A5]">
                Вставка из Excel, таблиц или загрузка файла расписания
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1A1D27] text-gray-400 hover:text-white flex items-center justify-center text-sm cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Формат подсказка */}
        <div className="p-3 rounded-xl bg-[#1A1D27] border border-white/5 text-[11px] text-gray-300 space-y-1">
          <div className="font-semibold text-white flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[#EF233C]" />
            <span>Поддерживаемые форматы расписания:</span>
          </div>
          <p className="text-gray-400">
            Скопируйте таблицу из Excel, сайта вуза или вставьте строки вида:<br />
            <code className="text-[#EF233C] bg-black/30 px-1 py-0.5 rounded">
              08:30 - 10:00 | Высшая математика | Ауд. 203 | Иванов А. С.
            </code>
          </p>
        </div>

        {/* Поле ввода текста */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">
              Текст / Таблица расписания
            </label>
            <label className="flex items-center gap-1 text-[11px] text-[#EF233C] hover:underline cursor-pointer">
              <Upload className="w-3 h-3" />
              <span>Загрузить .csv/.txt</span>
              <input
                type="file"
                accept=".csv,.txt,.tsv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <textarea
            rows={7}
            value={rawText}
            onChange={(e) => {
              setRawText(e.target.value);
              setParsedSchedule(null);
            }}
            className="w-full bg-[#1A1D27] border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#EF233C]/60 text-xs font-mono leading-relaxed"
            placeholder="Вставьте сюда текст расписания..."
          />
        </div>

        {/* Кнопка предпросмотра */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePreview}
            className="px-4 py-2 rounded-xl bg-[#202433] hover:bg-[#282E40] text-gray-200 text-xs font-semibold border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Table className="w-3.5 h-3.5 text-[#EF233C]" />
            <span>Распознать и показать превью</span>
          </button>
          {parsedSchedule && (
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              Распознано: {parsedSchedule.reduce((acc, d) => acc + d.lessons.length, 0)} пар
            </span>
          )}
        </div>

        {parseError && (
          <div className="p-3 rounded-xl bg-[#3A141A] border border-[#EF233C]/30 text-xs text-[#FB7185] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{parseError}</span>
          </div>
        )}

        {/* Предпросмотр в стиле РИТМ */}
        {parsedSchedule && (
          <div className="space-y-3 pt-2 border-t border-white/10">
            <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider">
              Превью в дизайне РИТМ:
            </h4>
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {parsedSchedule.map((day) => (
                <div
                  key={day.dayOfWeek}
                  className="p-3 rounded-xl bg-[#161822] border border-white/5 space-y-2"
                >
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>{day.dayOfWeek}</span>
                    <span className="text-[10px] text-gray-400">
                      {day.lessons.length} {day.lessons.length === 1 ? 'пара' : 'пары'}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {day.lessons.map((l) => (
                      <div
                        key={l.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-[#1D202D] text-xs"
                      >
                        <div className="font-mono text-gray-300 w-28 shrink-0 text-[11px]">
                          {l.timeStart} – {l.timeEnd}
                        </div>
                        <div className="flex-1 font-semibold text-white truncate px-2">
                          {l.subject}
                        </div>
                        <div className="text-[11px] text-[#8E95A5] w-24 text-right truncate">
                          {l.room}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Кнопки внизу */}
        <div className="pt-2 flex items-center gap-3 border-t border-white/[0.08]">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition-all cursor-pointer"
          >
            Отмена
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-2 py-2.5 px-4 rounded-xl bg-[#EF233C] hover:bg-[#D90429] text-white text-xs font-bold transition-all shadow-[0_4px_16px_rgba(239,35,60,0.4)] flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Check className="w-4 h-4" />
            <span>Применить расписание в РИТМ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
