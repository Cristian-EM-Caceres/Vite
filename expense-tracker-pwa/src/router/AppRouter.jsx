import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { HomeScreen } from '../pages/HomeScreen';
import { ExpensesScreen } from '../pages/ExpensesScreen';
import { ExpenseDetailScreen } from '../pages/ExpenseDetailScreen';
import { SettingsScreen } from '../pages/SettingsScreen';

export function AppRouter({ expenses, onAddExpense }) {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeScreen expenses={expenses} onAddExpense={onAddExpense} />} />
        <Route path="/expenses" element={<ExpensesScreen expenses={expenses} onAddExpense={onAddExpense} />} />
        <Route path="/expenses/:expenseId" element={<ExpenseDetailScreen expenses={expenses} />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Route>
    </Routes>
  );
}
