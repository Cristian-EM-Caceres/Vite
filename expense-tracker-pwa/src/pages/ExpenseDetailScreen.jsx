import { Link, useNavigate, useParams } from 'react-router-dom';
import { CategoryBadge } from '../components/CategoryBadge';

const formatMoney = (value) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(value);

export function ExpenseDetailScreen({ expenses }) {
  const { expenseId } = useParams();
  const navigate = useNavigate();
  const expense = expenses.find((item) => item.id === expenseId);

  if (!expense) {
    return (
      <section className="screen empty-state">
        <p className="eyebrow">Detalle no disponible</p>
        <h2>Ese gasto no existe.</h2>
        <button type="button" className="primary-button" onClick={() => navigate('/expenses')}>
          Volver al listado
        </button>
      </section>
    );
  }

  return (
    <section className="screen detail-screen">
      <header className="detail-header">
        <button type="button" className="ghost-button" onClick={() => navigate(-1)}>
          Volver
        </button>
        <Link to="/expenses" className="text-link">Ver listado</Link>
      </header>

      <article className="detail-card">
        <p className="eyebrow">Descripción</p>
        <h2>{expense.title}</h2>
        <CategoryBadge category={expense.category} />

        <div className="detail-card__grid">
          <div>
            <span>Monto</span>
            <strong>{formatMoney(expense.amount)}</strong>
          </div>
          <div>
            <span>Fecha</span>
            <strong>{expense.date}</strong>
          </div>
        </div>

        <div className="detail-card__notes">
          <span>Notas</span>
          <p>{expense.notes}</p>
        </div>
      </article>
    </section>
  );
}
