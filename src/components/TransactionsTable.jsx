import { useState } from 'react';
import { useFinanceStore } from '../stores/useFinanceStore';

const TransactionsTable = () => {
  const { 
    role, 
    search, 
    selectedCategory, 
    selectedType, 
    sortBy, 
    sortOrder,
    setSearch, 
    setSelectedCategory, 
    setSelectedType, 
    setSort,
    addTransaction,
    getFilteredTransactions 
  } = useFinanceStore();

  const [newTransaction, setNewTransaction] = useState({ date: '', amount: '', category: '', type: 'expense', description: '' });

  const filteredTransactions = getFilteredTransactions();

  const handleAdd = (e) => {
    e.preventDefault();
    if (role === 'admin' && newTransaction.amount) {
      addTransaction({
        date: newTransaction.date || new Date().toISOString().split('T')[0],
        amount: parseFloat(newTransaction.amount),
        category: newTransaction.category,
        type: newTransaction.type,
        description: newTransaction.description
      });
      setNewTransaction({ date: '', amount: '', category: '', type: 'expense', description: '' });
    }
  };

  const categories = ['Salary', 'Freelance', 'Investment', 'Food', 'Transport', 'Entertainment', 'Shopping', 'Utilities'];
  const types = ['income', 'expense'];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Transactions</h2>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <input
          type="text"
          placeholder="Search description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          {types.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
        </select>
        <div className="flex space-x-2">
          <button
            onClick={() => setSort('date', 'desc')}
            className={`p-3 rounded-lg ${sortBy === 'date' && sortOrder === 'desc' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Date ↓
          </button>
          <button
            onClick={() => setSort('amount', 'desc')}
            className={`p-3 rounded-lg ${sortBy === 'amount' && sortOrder === 'desc' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Amount ↓
          </button>
        </div>
      </div>

      {/* Add Transaction Form (Admin only) */}
      {role === 'admin' && (
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 p-4 bg-green-50 rounded-lg">
          <input
            type="date"
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
            className="p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
            className="p-3 border border-gray-300 rounded-lg"
            required
          />
          <select
            value={newTransaction.category}
            onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
            className="p-3 border border-gray-300 rounded-lg"
          >
            <option value="">Category</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select
            value={newTransaction.type}
            onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value})}
            className="p-3 border border-gray-300 rounded-lg"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Description"
              value={newTransaction.description}
              onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
              className="p-3 border border-gray-300 rounded-lg flex-1"
            />
            <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
              Add
            </button>
          </div>
        </form>
      )}

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              {role === 'admin' && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }">${transaction.amount.toLocaleString()}</td>
                {role === 'admin' && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                )}
              </tr>
            ))}
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan={role === 'admin' ? 6 : 5} className="px-6 py-12 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;

