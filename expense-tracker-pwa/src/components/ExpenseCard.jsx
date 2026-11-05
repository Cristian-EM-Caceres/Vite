import { CategoryBadge } from './CategoryBadge';

const formatMoney = (value) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(value);

export function ExpenseCard({ expense, onSelect }) {
  return (
    <button type="button" className="expense-card" onClick={() => onSelect(expense.id)}>
      <div className="expense-card__header">
        <div>
          <p className="expense-card__title">{expense.title}</p>
          <CategoryBadge category={expense.category} />
        </div>
        <strong className="expense-card__amount">{formatMoney(expense.amount)}</strong>
      </div>
      <p className="expense-card__meta">{expense.date}</p>
    </button>
  );
}
