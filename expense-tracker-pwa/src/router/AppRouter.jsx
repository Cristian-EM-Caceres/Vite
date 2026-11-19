import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AuthScreen } from '../pages/AuthScreen';
import { HomeScreen } from '../pages/HomeScreen';
import { ExpensesScreen } from '../pages/ExpensesScreen';
import { ExpenseDetailScreen } from '../pages/ExpenseDetailScreen';
import { ProfileScreen } from '../pages/ProfileScreen';
import { SettingsScreen } from '../pages/SettingsScreen';

function ProtectedLayout({ currentUser, onLogout }) {
  return currentUser ? <MainLayout currentUser={currentUser} onLogout={onLogout} /> : <Navigate to="/login" replace />;
}

export function AppRouter({ accounts, currentUser, expenses, onAddExpense, onLogin, onLogout, onRegister }) {
  return (
    <Routes>
      <Route
        path="/login"
        element={<AuthScreen accounts={accounts} currentUser={currentUser} onLogin={onLogin} onRegister={onRegister} />}
      />
      <Route
        path="/register"
        element={<AuthScreen accounts={accounts} currentUser={currentUser} onLogin={onLogin} onRegister={onRegister} />}
      />
      <Route
        path="/recovery"
        element={<AuthScreen accounts={accounts} currentUser={currentUser} onLogin={onLogin} onRegister={onRegister} />}
      />
      <Route element={<ProtectedLayout currentUser={currentUser} onLogout={onLogout} />}>
        <Route path="/" element={<HomeScreen expenses={expenses} onAddExpense={onAddExpense} />} />
        <Route path="/expenses" element={<ExpensesScreen expenses={expenses} onAddExpense={onAddExpense} />} />
        <Route path="/expenses/:expenseId" element={<ExpenseDetailScreen expenses={expenses} />} />
        <Route path="/profile" element={<ProfileScreen currentUser={currentUser} />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Route>
      <Route path="*" element={<Navigate to={currentUser ? '/' : '/login'} replace />} />
    </Routes>
  );
}
