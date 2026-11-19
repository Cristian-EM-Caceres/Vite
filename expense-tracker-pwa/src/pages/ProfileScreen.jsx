import { Link } from 'react-router-dom';

export function ProfileScreen({ currentUser }) {
  return (
    <section className="screen profile-screen">
      <header className="screen-header">
        <p className="eyebrow">Tu cuenta</p>
        <h2>Mi perfil</h2>
      </header>

      <div className="profile-card">
        <div className="profile-card__avatar" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="3.5" />
            <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
          </svg>
        </div>
        <div className="profile-card__details">
          <span>Nombre y apellido</span>
          <strong>{currentUser.firstName} {currentUser.lastName}</strong>
          <span>Gmail</span>
          <strong>{currentUser.email}</strong>
        </div>
        <Link to="/expenses" className="primary-button action-link">
          Gestionar mis gastos
        </Link>
      </div>
    </section>
  );
}
