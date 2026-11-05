import { useEffect, useState } from 'react';
import { AppRouter } from './router/AppRouter';
import { mockExpenses } from './data/mockExpenses';

export default function App() {
  const [expenses, setExpenses] = useState(() => {
    try {
      const savedExpenses = window.localStorage.getItem('expense-tracker-data');
      return savedExpenses ? JSON.parse(savedExpenses) : mockExpenses;
    } catch {
      return mockExpenses;
    }
  });

  useEffect(() => {
    window.localStorage.setItem('expense-tracker-data', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (newExpense) => {
    setExpenses((previous) => [newExpense, ...previous]);
  };

  return <AppRouter expenses={expenses} onAddExpense={handleAddExpense} />;
}
