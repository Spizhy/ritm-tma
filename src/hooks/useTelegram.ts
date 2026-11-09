import { useEffect, useState, useCallback } from 'react';

export function useTelegram() {
  const [tg, setTg] = useState<TelegramWebApp | null>(null);
  const [isTelegramAvailable, setIsTelegramAvailable] = useState<boolean>(false);

  useEffect(() => {
    const webApp = window.Telegram?.WebApp;
    if (webApp) {
      setTg(webApp);
      setIsTelegramAvailable(true);
      try {
        webApp.ready();
        webApp.expand();
        webApp.enableClosingConfirmation();
        if (webApp.setHeaderColor) {
          webApp.setHeaderColor('#0B0C10');
        }
        if (webApp.setBackgroundColor) {
          webApp.setBackgroundColor('#0B0C10');
        }
      } catch (err) {
        console.warn('Telegram WebApp init warning:', err);
      }
    }
  }, []);

  const triggerHaptic = useCallback(
    (type: 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning' | 'error') => {
      if (!tg?.HapticFeedback) return;
      try {
        if (type === 'selection') {
          tg.HapticFeedback.selectionChanged();
        } else if (type === 'success' || type === 'warning' || type === 'error') {
          tg.HapticFeedback.notificationOccurred(type);
        } else {
          tg.HapticFeedback.impactOccurred(type);
        }
      } catch {
        // Игнорируем в обычном браузере
      }
    },
    [tg]
  );

  const showNotification = useCallback(
    (message: string) => {
      triggerHaptic('success');
      if (tg?.showAlert) {
        tg.showAlert(message);
      } else {
        alert(message);
      }
    },
    [tg, triggerHaptic]
  );

  const user = tg?.initDataUnsafe?.user || {
    id: 999999,
    first_name: 'Иван',
    last_name: 'Борисов',
    username: 'ivan_borisov',
  };

  const userInitials =
    user.first_name && user.last_name
      ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
      : user.first_name
      ? user.first_name.slice(0, 2).toUpperCase()
      : 'ИБ';

  return {
    tg,
    isTelegramAvailable,
    user,
    userInitials,
    triggerHaptic,
    showNotification,
  };
}
