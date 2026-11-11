import React, { useState } from 'react';
import { X, Search, UserCheck, Clock, Shield, UserX, ExternalLink, UserPlus, Copy, Check } from 'lucide-react';
import { Student, AttendanceStatus } from '../types';

interface StudentRosterModalProps {
  isOpen: boolean;
  students: Student[];
  onClose: () => void;
  onUpdateStudentStatus: (studentId: string, newStatus: AttendanceStatus) => void;
  onAddStudent?: (newStudent: { name: string; username: string }) => void;
  onCopyReport?: () => void;
}

export const StudentRosterModal: React.FC<StudentRosterModalProps> = ({
  isOpen,
  students,
  onClose,
  onUpdateStudentStatus,
  onAddStudent,
  onCopyReport,
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | AttendanceStatus>('all');
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentUsername, setNewStudentUsername] = useState('');
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.username && s.username.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = activeFilter === 'all' || s.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case 'present':
        return { label: 'На парах', bg: 'bg-[#059669]/20 text-[#34D399] border-[#059669]/40', icon: UserCheck };
      case 'late':
        return { label: 'Опаздывает', bg: 'bg-[#B45309]/20 text-[#FBBF24] border-[#B45309]/40', icon: Clock };
      case 'excuse':
        return { label: 'Уважительная', bg: 'bg-[#4F46E5]/20 text-[#818CF8] border-[#4F46E5]/40', icon: Shield };
      case 'absent':
        return { label: 'Отсутствует', bg: 'bg-[#991B1B]/20 text-[#FB7185] border-[#991B1B]/40', icon: UserX };
    }
  };

  const handleNextStatus = (student: Student) => {
    const order: AttendanceStatus[] = ['present', 'late', 'excuse', 'absent'];
    const currentIdx = order.indexOf(student.status);
    const nextStatus = order[(currentIdx + 1) % order.length];
    onUpdateStudentStatus(student.id, nextStatus);
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    if (onAddStudent) {
      onAddStudent({
        name: newStudentName.trim(),
        username: newStudentUsername.trim().replace(/^@/, ''),
      });
    }
    setNewStudentName('');
    setNewStudentUsername('');
    setIsAddingStudent(false);
  };

  const handleCopyReportClick = () => {
    const presentList = students.filter((s) => s.status === 'present');
    const lateList = students.filter((s) => s.status === 'late');
    const excuseList = students.filter((s) => s.status === 'excuse');
    const absentList = students.filter((s) => s.status === 'absent');

    const formatList = (list: Student[]) =>
      list.map((s, idx) => `${idx + 1}. ${s.name}${s.username ? ` (@${s.username})` : ''}`).join('\n');

    const total = students.length;
    const attended = presentList.length + lateList.length + excuseList.length;
    const percent = Math.round((attended / total) * 100);

    const report = `📋 Перекличка группы ИВТ-21 (17 октября)
Явка: ${attended} из ${total} (${percent}%)

✅ На парах (${presentList.length}):
${formatList(presentList) || '—'}

⏳ Опаздывают (${lateList.length}):
${formatList(lateList) || '—'}

📄 Уважительная причина (${excuseList.length}):
${formatList(excuseList) || '—'}

❌ Отсутствуют (${absentList.length}):
${formatList(absentList) || '—'}

Сформировано в РИТМ`;

    navigator.clipboard.writeText(report);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);

    if (onCopyReport) onCopyReport();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#14161F] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Шапка */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white font-['Unbounded']">
              Список группы и перекличка
            </h3>
            <p className="text-[11px] text-[#8E95A5]">
              Группа ИВТ-21 • {students.length} студентов с привязкой к Telegram
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1A1D27] text-gray-400 hover:text-white flex items-center justify-center text-sm cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Поиск и быстрые действия */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Поиск по ФИО или @username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#1A1D27] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#EF233C]/60"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyReportClick}
              className="px-3.5 py-2 rounded-xl bg-[#202433] hover:bg-[#282E40] border border-white/10 text-xs font-semibold text-gray-200 flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              {copiedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Скопировано!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-gray-400" />
                  <span>Отчет в чат</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsAddingStudent(!isAddingStudent)}
              className="px-3 py-2 rounded-xl bg-[#EF233C]/15 hover:bg-[#EF233C]/25 border border-[#EF233C]/30 text-xs font-semibold text-[#EF233C] flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Студент</span>
            </button>
          </div>
        </div>

        {/* Форма добавления студента */}
        {isAddingStudent && (
          <form
            onSubmit={handleCreateStudent}
            className="p-3 rounded-xl bg-[#1A1D27] border border-white/10 space-y-2.5 animate-in fade-in"
          >
            <div className="text-xs font-bold text-white">Добавить студента в группу</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="ФИО студента (напр. Иванов Сергей)"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                className="bg-[#14161F] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#EF233C]"
              />
              <input
                type="text"
                placeholder="Telegram username (@nickname)"
                value={newStudentUsername}
                onChange={(e) => setNewStudentUsername(e.target.value)}
                className="bg-[#14161F] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#EF233C]"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddingStudent(false)}
                className="px-3 py-1 text-xs text-gray-400 hover:text-white"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-[#EF233C] text-white rounded-lg text-xs font-bold shadow-sm"
              >
                Добавить
              </button>
            </div>
          </form>
        )}

        {/* Фильтры по статусам */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              activeFilter === 'all'
                ? 'bg-white text-black font-bold'
                : 'bg-[#1A1D27] text-gray-400 hover:text-white'
            }`}
          >
            Все ({students.length})
          </button>
          <button
            onClick={() => setActiveFilter('present')}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              activeFilter === 'present'
                ? 'bg-[#059669] text-white font-bold'
                : 'bg-[#1A1D27] text-gray-400 hover:text-white'
            }`}
          >
            На парах ({students.filter((s) => s.status === 'present').length})
          </button>
          <button
            onClick={() => setActiveFilter('late')}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              activeFilter === 'late'
                ? 'bg-[#B45309] text-white font-bold'
                : 'bg-[#1A1D27] text-gray-400 hover:text-white'
            }`}
          >
            Опаздывают ({students.filter((s) => s.status === 'late').length})
          </button>
          <button
            onClick={() => setActiveFilter('excuse')}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              activeFilter === 'excuse'
                ? 'bg-[#4F46E5] text-white font-bold'
                : 'bg-[#1A1D27] text-gray-400 hover:text-white'
            }`}
          >
            Уважительная ({students.filter((s) => s.status === 'excuse').length})
          </button>
          <button
            onClick={() => setActiveFilter('absent')}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              activeFilter === 'absent'
                ? 'bg-[#991B1B] text-white font-bold'
                : 'bg-[#1A1D27] text-gray-400 hover:text-white'
            }`}
          >
            Отсутствуют ({students.filter((s) => s.status === 'absent').length})
          </button>
        </div>

        {/* Список студентов */}
        <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
          {filteredStudents.length === 0 ? (
            <div className="p-8 text-center text-xs text-gray-400 bg-[#1A1D27] rounded-xl">
              Студенты не найдены
            </div>
          ) : (
            filteredStudents.map((student, idx) => {
              const badge = getStatusBadge(student.status);
              const BadgeIcon = badge.icon;
              const tgLink = student.username
                ? `https://t.me/${student.username.replace('@', '')}`
                : null;

              return (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#171922] border border-white/[0.05] hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-[11px] font-mono text-gray-500 w-5 shrink-0">
                      {idx + 1}.
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white truncate">
                        {student.name}
                      </div>
                      {tgLink ? (
                        <a
                          href={tgLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-[#EF233C] hover:underline mt-0.5 group"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>@{student.username?.replace('@', '')}</span>
                          <ExternalLink className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      ) : (
                        <span className="text-[10px] text-gray-500 mt-0.5 block">
                          нет Telegram
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Кнопка переключения статуса в 1 клик */}
                  <button
                    onClick={() => handleNextStatus(student)}
                    title="Нажмите для смены статуса"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer active:scale-95 ${badge.bg}`}
                  >
                    <BadgeIcon className="w-3.5 h-3.5" />
                    <span>{badge.label}</span>
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Футер */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-[11px] text-gray-400">
          <span>Клик по статусу переключает статус студента</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl transition-all cursor-pointer text-xs"
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
};
