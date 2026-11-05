import { usePWAInstall } from '../hooks/usePWAInstall';

export function InstallBanner() {
  const { installPrompt, isInstalled, promptInstall, isIOS } = usePWAInstall();

  if (isInstalled) {
    return null;
  }

  if (isIOS) {
    return (
      <div className="install-banner install-banner--ios" role="status" aria-live="polite">
        <strong>Instala ExpenseTracker</strong>
        <p>Abre Safari, toca Compartir y selecciona “Añadir a la pantalla de inicio”.</p>
      </div>
    );
  }

  if (!installPrompt) {
    return null;
  }

  return (
    <div className="install-banner" role="status" aria-live="polite">
      <div>
        <strong>Instalar app</strong>
        <p>Accede a ExpenseTracker como una aplicación nativa desde tu dispositivo.</p>
      </div>
      <button type="button" className="primary-button" onClick={promptInstall}>
        Instalar App
      </button>
    </div>
  );
}
