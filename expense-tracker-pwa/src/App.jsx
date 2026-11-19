import { useEffect, useState } from 'react';
import { AppRouter } from './router/AppRouter';
import { mockExpenses } from './data/mockExpenses';

export default function App() {
  const [accounts, setAccounts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
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

  const handleRegister = (account) => {
    if (accounts.some(({ email }) => email === account.email)) {
      return 'Ya existe una cuenta con ese correo.';
    }

    setAccounts((previous) => [...previous, account]);
    return null;
  };

  const handleLogin = (email, password) => {
    const account = accounts.find((item) => item.email === email && item.password === password);

    if (!account) {
      return 'El correo o la contraseña no coinciden.';
    }

    setCurrentUser(account);
    return null;
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <AppRouter
      accounts={accounts}
      currentUser={currentUser}
      expenses={expenses}
      onAddExpense={handleAddExpense}
      onLogout={handleLogout}
      onLogin={handleLogin}
      onRegister={handleRegister}
    />
  );
}
