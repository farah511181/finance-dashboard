import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { useFinanceStore } from '../stores/useFinanceStore';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const DashboardOverview = () => {
  const { getSummary, getSpendingBreakdown } = useFinanceStore();
  const summary = getSummary();
  const spendingData = getSpendingBreakdown();

  // Mock balance trend data (can be computed from transactions)
  const trendData = [
    { month: 'Jan', balance: 2500 },
    { month: 'Feb', balance: 3200 },
    { month: 'Mar', balance: 2800 },
    { month: 'Apr', balance: 3500 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Summary Cards */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Balance</h3>
        <p className="text-3xl font-bold text-green-600">${summary.totalBalance?.toLocaleString()}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Income</h3>
        <p className="text-3xl font-bold text-blue-600">${summary.totalIncome?.toLocaleString()}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Expenses</h3>
        <p className="text-3xl font-bold text-red-600">${summary.totalExpense?.toLocaleString()}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Transactions</h3>
        <p className="text-3xl font-bold text-indigo-600">20</p>
      </div>

      {/* Balance Trend Chart */}
      <div className="md:col-span-2 lg:col-span-4 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Balance Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="balance" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Spending Breakdown Pie */}
      <div className="md:col-span-2 lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Spending Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={spendingData.slice(0, 5)}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="amount"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {spendingData.slice(0, 5).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardOverview;

