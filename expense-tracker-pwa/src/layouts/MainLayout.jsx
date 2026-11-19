import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Gastos', to: '/expenses' },
  { label: 'Ajustes', to: '/settings' }
];

function UserMenu({ currentUser, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        type="button"
        className="user-menu__trigger"
        aria-label="Abrir menú de usuario"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
        </svg>
      </button>

      {isOpen ? (
        <div className="user-menu__popover" role="menu" aria-label="Opciones de usuario">
          <div className="user-menu__identity">
            <strong>{currentUser.firstName} {currentUser.lastName}</strong>
            <span>{currentUser.email}</span>
          </div>
          <Link to="/profile" role="menuitem" onClick={() => setIsOpen(false)}>
            Ver perfil
          </Link>
          <Link to="/expenses" role="menuitem" onClick={() => setIsOpen(false)}>
            Gestionar gastos
          </Link>
          <button type="button" role="menuitem" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function MainLayout({ currentUser, onLogout }) {
  return (
    <div className="app-shell">
      <header className="app-header safe-top">
        <div className="app-header__top">
          <div className="app-header__brand">
            <span className="brand-mark">€</span>
            <div>
              <p className="eyebrow">ExpenseTracker</p>
              <h1>Mi presupuesto</h1>
            </div>
          </div>
          <UserMenu currentUser={currentUser} onLogout={onLogout} />
        </div>
      </header>

      <main className="page-shell">
        <Outlet />
      </main>

      <nav className="bottom-nav safe-bottom" aria-label="Navegación principal">
        {navItems.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
