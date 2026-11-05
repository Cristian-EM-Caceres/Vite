export function SettingsScreen() {
  return (
    <section className="screen settings-screen">
      <header className="screen-header">
        <p className="eyebrow">Configuración</p>
        <h2>Ajustes</h2>
      </header>

      <div className="settings-list">
        <div className="settings-card">
          <span>Moneda</span>
          <strong>ARS</strong>
        </div>
        <div className="settings-card">
          <span>Recordatorios</span>
          <strong>Desactivados</strong>
        </div>
        <div className="settings-card">
          <span>Modo sin conexión</span>
          <strong>Activo</strong>
        </div>
      </div>
    </section>
  );
}
