import { useFinanceStore } from '../stores/useFinanceStore';

const Insights = () => {
  const { getSummary, getSpendingBreakdown, getInsights } = useFinanceStore();
  const summary = getSummary();
  const insights = getInsights();
  const breakdown = getSpendingBreakdown();

  const monthlyComparison = summary.totalIncome - summary.totalExpense > 0 ? 'Positive' : 'Negative';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Highest Spending Category</h3>
          <p className="text-2xl font-bold text-purple-600">
            {insights.topSpendingCategory?.category || 'N/A'}
          </p>
          <p className="text-sm text-gray-600">${insights.topSpendingCategory?.amount?.toLocaleString() || 0}</p>
        </div>
        <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly Net</h3>
          <p className={`text-2xl font-bold ${monthlyComparison === 'Positive' ? 'text-green-600' : 'text-red-600'}`}>
            ${Math.abs(summary.totalBalance).toLocaleString()}
            <span className="text-sm font-normal"> ({monthlyComparison})</span>
          </p>
        </div>
        <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Categories</h3>
          <p className="text-2xl font-bold text-blue-600">{breakdown.length}</p>
          <p className="text-sm text-gray-600">Expense categories tracked</p>
        </div>
      </div>
    </div>
  );
};

export default Insights;

