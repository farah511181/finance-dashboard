import { create } from 'zustand';
import { mockTransactions } from '../data/mockTransactions.js';

const categories = ['Salary', 'Freelance', 'Investment', 'Food', 'Transport', 'Entertainment', 'Shopping', 'Utilities'];
const types = ['income', 'expense'];

export const useFinanceStore = create((set, get) => ({
  transactions: mockTransactions,
  role: 'viewer',
  search: '',
  selectedCategory: '',
  selectedType: '',
  sortBy: 'date',
  sortOrder: 'desc',

  setRole: (newRole) => set({ role: newRole }),
  setSearch: (search) => set({ search }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedType: (type) => set({ selectedType: type }),
  setSort: (sortBy, sortOrder) => set({ sortBy, sortOrder }),

  addTransaction: (transaction) => {
    const { role } = get();
    if (role !== 'admin') return;
    set((state) => ({
      transactions: [...state.transactions, { id: Date.now(), ...transaction }]
    }));
  },

  updateTransaction: (id, updates) => {
    const { role } = get();
    if (role !== 'admin') return;
    set((state) => ({
      transactions: state.transactions.map(t => t.id === id ? { ...t, ...updates } : t)
    }));
  },

  getFilteredTransactions: () => {
    const { transactions, search, selectedCategory, selectedType, sortBy, sortOrder } = get();
    let filtered = transactions.filter(t => 
      t.description.toLowerCase().includes(search.toLowerCase()) &&
      (!selectedCategory || t.category === selectedCategory) &&
      (!selectedType || t.type === selectedType)
    );

    filtered.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  },

  getSummary: () => {
    const { transactions } = get();
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const totalBalance = totalIncome - totalExpense;
    return { totalBalance, totalIncome, totalExpense };
  },

  getSpendingBreakdown: () => {
    const { transactions } = get();
    const expenseByCategory = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + t.amount;
      });
    return Object.entries(expenseByCategory).map(([category, amount]) => ({ category, amount }));
  },

  getInsights: () => {
    const breakdown = get().getSpendingBreakdown();
    const topCategory = breakdown.length > 0 ? breakdown.reduce((max, curr) => curr.amount > max.amount ? curr : max) : null;
    return { topSpendingCategory: topCategory };
  }
}));

