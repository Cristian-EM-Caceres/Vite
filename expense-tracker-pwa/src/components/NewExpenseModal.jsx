import { useState } from 'react';

const defaultCategory = 'Alimentación';

export function NewExpenseModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(defaultCategory);
  const [notes, setNotes] = useState('');

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setCategory(defaultCategory);
    setNotes('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const parsedAmount = Number(amount);
    if (!title.trim() || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return;
    }

    onSave?.({
      id: title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: title.trim(),
      amount: Math.round(parsedAmount),
      category,
      date: new Date().toISOString().slice(0, 10),
      notes: notes.trim() || 'Sin notas.'
    });

    resetForm();
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="bottom-sheet" role="dialog" aria-modal="true" aria-labelledby="new-expense-title" onClick={(event) => event.stopPropagation()}>
        <div className="bottom-sheet__handle" aria-hidden="true" />
        <div className="bottom-sheet__header">
          <h2 id="new-expense-title">Registrar nuevo gasto</h2>
          <button type="button" className="ghost-button" onClick={handleClose} aria-label="Cerrar modal">
            Cerrar
          </button>
        </div>

        <form className="expense-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Nombre del gasto</span>
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Ej: Mercado" required />
          </label>

          <label className="field">
            <span>Monto</span>
            <input
              type="number"
              inputMode="decimal"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="25000"
              min="1"
              required
            />
          </label>

          <div className="field">
            <span>Categoría</span>
            <div className="chip-list" role="radiogroup" aria-label="Seleccionar categoría">
              {['Alimentación', 'Transporte', 'Servicios', 'Salud', 'Ocio'].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`chip ${category === option ? 'chip--selected' : ''}`}
                  onClick={() => setCategory(option)}
                  aria-pressed={category === option}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <label className="field">
            <span>Notas</span>
            <textarea rows="3" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Detalle del gasto" />
          </label>

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={handleClose}>
              Cancelar
            </button>
            <button type="submit" className="primary-button">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
