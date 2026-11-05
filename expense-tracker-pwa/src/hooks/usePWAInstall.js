import { useEffect, useState } from 'react';

export function usePWAInstall() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const updateInstallState = () => {
      const standalone = window.matchMedia('(display-mode: standalone)').matches;
      setIsInstalled(standalone || Boolean(window.navigator.standalone));
    };

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setIsInstalled(true);
    };

    updateInstallState();
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.matchMedia('(display-mode: standalone)').addEventListener?.('change', updateInstallState);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.matchMedia('(display-mode: standalone)').removeEventListener?.('change', updateInstallState);
    };
  }, []);

  const promptInstall = async () => {
    if (!installPrompt) {
      return false;
    }

    installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    setInstallPrompt(null);
    return choice.outcome === 'accepted';
  };

  const isIOS = /iPhone|iPad|iPod/i.test(window.navigator.userAgent);

  return {
    installPrompt,
    isInstalled,
    promptInstall,
    isIOS
  };
}
