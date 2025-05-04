import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface VisitData {
  date: string;
  count: number;
  ip: string;
}

const Analytics: React.FC = () => {
  const [visits, setVisits] = useState<VisitData[]>([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  // Debug: Log environment variable (remove in production)
  useEffect(() => {
    console.log('Admin password env:', import.meta.env.VITE_ADMIN_PASSWORD);
  }, []);

  // Simple password protection using environment variable
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Debug: Log the comparison
    console.log('Input password:', password);
    console.log('Expected password:', import.meta.env.VITE_ADMIN_PASSWORD);
    
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setError('Invalid password');
    }
  };

  useEffect(() => {
    // Get visits from localStorage
    const storedVisits = localStorage.getItem('visits');
    if (storedVisits) {
      setVisits(JSON.parse(storedVisits));
    }
  }, []);

  // Calculate statistics
  const today = new Date().toISOString().split('T')[0];
  const dailyVisits = visits.filter(v => v.date === today).length;
  const monthlyVisits = visits.filter(v => v.date.startsWith(today.substring(0, 7))).length;
  const yearlyVisits = visits.filter(v => v.date.startsWith(today.substring(0, 4))).length;

  // Get unique IPs
  const uniqueIPs = [...new Set(visits.map(v => v.ip))];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-6 w-[300px] shadow-lg">
          <form onSubmit={handleLogin} className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Analytics Login</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter password"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Analytics Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Daily Visits</h3>
            <p className="text-3xl font-bold text-blue-600">{dailyVisits}</p>
          </Card>
          <Card className="p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Monthly Visits</h3>
            <p className="text-3xl font-bold text-green-600">{monthlyVisits}</p>
          </Card>
          <Card className="p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Yearly Visits</h3>
            <p className="text-3xl font-bold text-purple-600">{yearlyVisits}</p>
          </Card>
        </div>

        <Card className="p-6 bg-white shadow-md mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Unique IP Addresses</h3>
          <div className="space-y-2">
            {uniqueIPs.map((ip, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                <span className="text-blue-600 font-medium">{ip}</span>
                <span className="text-gray-600">
                  ({visits.filter(v => v.ip === ip).length} visits)
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Visit History</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visits.slice(-30)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6B7280"
                  tick={{ fill: '#6B7280' }}
                />
                <YAxis 
                  stroke="#6B7280"
                  tick={{ fill: '#6B7280' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  labelStyle={{ color: '#374151' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics; 