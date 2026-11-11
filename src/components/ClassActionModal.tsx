import React, { useState } from 'react';
import { X, AlertCircle, Calendar, Clock, MapPin, Check, Send, Sparkles } from 'lucide-react';
import { Lesson, LessonStatus } from '../types';

interface ClassActionModalProps {
  isOpen: boolean;
  lesson: Lesson | null;
  onClose: () => void;
  onSave: (updatedLesson: Lesson, sendNotification: boolean) => void;
}

export const ClassActionModal: React.FC<ClassActionModalProps> = ({
  isOpen,
  lesson,
  onClose,
  onSave,
}) => {
  if (!isOpen || !lesson) return null;

  const [status, setStatus] = useState<LessonStatus>(lesson.status);
  const [reason, setReason] = useState<string>(lesson.note || '');
  const [newRoom, setNewRoom] = useState<string>(lesson.room);
  const [notifyGroup, setNotifyGroup] = useState<boolean>(true);

  const quickReasons = [
    'Преподаватель заболел / на больничном',
    'Участие преподавателя в конференции',
    'Занятие перенесено деканатом',
    'Лабораторная работа дистанционно (ссылка в чате)',
    'Сдача долгов и консультация',
  ];

  const handleQuickReason = (text: string) => {
    setReason(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let statusLabel = 'ПО ПЛАНУ';
    if (status === 'CANCELLED') statusLabel = 'ОТМЕНА';
    else if (status === 'DEADLINE') statusLabel = 'ДЕДЛАЙН';
    else if (status === 'RESCHEDULED') statusLabel = 'ПЕРЕНОС';
    else if (status === 'ONLINE') statusLabel = 'ДИСТАНТ';

    const updated: Lesson = {
      ...lesson,
      status,
      statusLabel,
      room: newRoom,
      note: reason,
    };

    onSave(updated, notifyGroup);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[#14161F] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Шапка модального окна */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EF233C]/10 border border-[#EF233C]/20 flex items-center justify-center text-[#EF233C]">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white font-['Unbounded']">
                Шаблон старосты: Пара
              </h3>
              <p className="text-[11px] text-[#8E95A5]">
                Связано с расписанием и ботом группы
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

        {/* Инфо о выбранной паре */}
        <div className="p-3.5 rounded-xl bg-[#1A1D27] border border-white/[0.06] space-y-1">
          <div className="text-[11px] text-gray-400 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#EF233C]" />
            <span className="font-mono font-semibold text-white">
              {lesson.timeStart} – {lesson.timeEnd}
            </span>
            <span>•</span>
            <span>{lesson.teacher}</span>
          </div>
          <div className="text-sm font-bold text-white">{lesson.subject}</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Выбор статуса пары */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Статус занятия в расписании
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStatus('CANCELLED')}
                className={`py-2 px-2 rounded-xl text-center font-bold tracking-wide transition-all border ${
                  status === 'CANCELLED'
                    ? 'bg-[#351219] text-[#EF233C] border-[#EF233C] shadow-[0_0_15px_rgba(239,35,60,0.3)]'
                    : 'bg-[#181A24] text-gray-400 border-white/5 hover:border-white/10'
                }`}
              >
                ОТМЕНА
              </button>
              <button
                type="button"
                onClick={() => setStatus('PLANNED')}
                className={`py-2 px-2 rounded-xl text-center font-bold tracking-wide transition-all border ${
                  status === 'PLANNED'
                    ? 'bg-[#093325] text-[#10B981] border-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-[#181A24] text-gray-400 border-white/5 hover:border-white/10'
                }`}
              >
                ПО ПЛАНУ
              </button>
              <button
                type="button"
                onClick={() => setStatus('DEADLINE')}
                className={`py-2 px-2 rounded-xl text-center font-bold tracking-wide transition-all border ${
                  status === 'DEADLINE'
                    ? 'bg-[#38200B] text-[#F59E0B] border-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'bg-[#181A24] text-gray-400 border-white/5 hover:border-white/10'
                }`}
              >
                ДЕДЛАЙН
              </button>
            </div>
          </div>

          {/* Аудитория или формат */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Аудитория / Локация
            </label>
            <div className="flex items-center gap-2 bg-[#1A1D27] border border-white/10 rounded-xl px-3 py-2 text-white">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                value={newRoom}
                onChange={(e) => setNewRoom(e.target.value)}
                placeholder="Напр. Ауд. 203 или Дистант / Teams"
                className="w-full bg-transparent border-none text-white focus:outline-none placeholder-gray-500"
              />
            </div>
          </div>

          {/* Причина отмены / комментарий */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">
                Причина / Комментарий для группы
              </label>
              <span className="text-[10px] text-gray-500">Попадет в карточку</span>
            </div>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Укажите причину отмены, перенос или домашнее задание..."
              className="w-full bg-[#1A1D27] border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#EF233C]/60 text-xs leading-relaxed"
            />

            {/* Быстрые шаблоны */}
            <div className="mt-2 space-y-1">
              <span className="text-[10px] text-gray-400 font-medium">Быстрые шаблоны старосты:</span>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {quickReasons.map((text, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickReason(text)}
                    className="text-[10px] px-2.5 py-1 rounded-lg bg-[#222634] hover:bg-[#2A2F40] text-gray-300 hover:text-white border border-white/5 transition-all text-left"
                  >
                    + {text}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Галочка рассылки в чат через бота */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#1A1D27]/80 border border-white/5">
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4 text-[#EF233C]" />
              <div>
                <div className="font-semibold text-white">Оповестить группу в Telegram</div>
                <div className="text-[10px] text-gray-400">
                  Бот пришлет карточку с отменой в чат пилотной группы
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifyGroup}
              onChange={(e) => setNotifyGroup(e.target.checked)}
              className="w-4 h-4 accent-[#EF233C] cursor-pointer"
            />
          </div>

          {/* Кнопки действий */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-semibold transition-all cursor-pointer"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-2 py-2.5 px-4 rounded-xl bg-[#EF233C] hover:bg-[#D90429] text-white font-bold transition-all shadow-[0_4px_16px_rgba(239,35,60,0.4)] flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Check className="w-4 h-4" />
              <span>Сохранить и обновить</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
