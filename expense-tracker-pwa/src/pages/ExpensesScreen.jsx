import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ExpenseCard } from '../components/ExpenseCard';
import { NewExpenseModal } from '../components/NewExpenseModal';

export function ExpensesScreen({ expenses, onAddExpense }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = (expenseId) => {
    navigate(`/expenses/${expenseId}`);
  };

  const handleSave = (expense) => {
    onAddExpense(expense);
    setIsModalOpen(false);
  };

  return (
    <section className="screen expenses-screen">
      <header className="screen-header">
        <p className="eyebrow">Listado</p>
        <h2>Mis gastos</h2>
      </header>

      <button type="button" className="primary-button" onClick={() => setIsModalOpen(true)}>
        Registrar Nuevo Gasto
      </button>

      <div className="expense-list" aria-live="polite">
        {expenses.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} onSelect={handleSelect} />
        ))}
      </div>

      <Link className="secondary-button action-link action-link--full" to="/">
        Volver al inicio
      </Link>

      <NewExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
    </section>
  );
}
