import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Gastos', to: '/expenses' },
  { label: 'Ajustes', to: '/settings' }
];

export function MainLayout() {
  return (
    <div className="app-shell">
      <header className="app-header safe-top">
        <div className="app-header__brand">
          <span className="brand-mark">€</span>
          <div>
            <p className="eyebrow">ExpenseTracker</p>
            <h1>Mi presupuesto</h1>
          </div>
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
