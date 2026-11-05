import { useState } from 'react';
import { Link } from 'react-router-dom';
import { InstallBanner } from '../components/InstallBanner';
import { NewExpenseModal } from '../components/NewExpenseModal';

const formatMoney = (value) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(value);

export function HomeScreen({ expenses, onAddExpense }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const handleSave = (expense) => {
    onAddExpense(expense);
    setStatusMessage(`${expense.title} se registró correctamente.`);
    setIsModalOpen(false);
  };

  return (
    <section className="screen home-screen">
      <InstallBanner />

      <header className="screen-header">
        <p className="eyebrow">Bienvenido</p>
        <h2>ExpenseTracker</h2>
      </header>

      <p className="screen-copy">
        Registra tus gastos y lleva el control del dinero que entra y sale cada semana.
      </p>

      <div className="summary-panel">
        <div>
          <span>Total registrado</span>
          <strong>{formatMoney(total)}</strong>
        </div>
        <div>
          <span>Movimientos</span>
          <strong>{expenses.length}</strong>
        </div>
      </div>

      <div className="action-grid">
        <button type="button" className="primary-button" onClick={() => setIsModalOpen(true)}>
          Registrar Nuevo Gasto
        </button>
        <Link to="/expenses" className="secondary-button action-link">
          Ver Listado Completo
        </Link>
      </div>

      {statusMessage ? <p className="toast-message">{statusMessage}</p> : null}

      <NewExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
    </section>
  );
}
