import { useFinanceStore } from './stores/useFinanceStore';
import DashboardOverview from './components/DashboardOverview';
import TransactionsTable from './components/TransactionsTable';
import Insights from './components/Insights';

function App() {
  const { role, setRole } = useFinanceStore();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Finance Dashboard</h1>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <DashboardOverview />
          <div className="mb-8"><TransactionsTable /></div>
          <div><Insights /></div>
        </div>
      </div>
    </>
  )
}

export default App

