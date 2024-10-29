import React from 'react';
import { FileText, Bell, Settings, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const reports = [
    {
      id: 1,
      title: 'Suspicious Activity Report',
      status: 'Under Investigation',
      date: '2024-03-15',
      priority: 'High',
    },
    {
      id: 2,
      title: 'Vandalism Report',
      status: 'Pending Review',
      date: '2024-03-14',
      priority: 'Medium',
    },
  ];

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's an overview of your reports.</p>
        </div>
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <Bell className="h-6 w-6 text-gray-600" />
        </button>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          title="Total Reports"
          value="12"
          icon={<FileText className="h-6 w-6 text-indigo-600" />}
        />
        <StatCard
          title="Active Cases"
          value="3"
          icon={<Bell className="h-6 w-6 text-green-600" />}
        />
        <StatCard
          title="Resolved"
          value="9"
          icon={<Settings className="h-6 w-6 text-blue-600" />}
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Reports</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {reports.map((report) => (
            <div
              key={report.id}
              className="p-6 hover:bg-gray-50 flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
                <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                  <span>Status: {report.status}</span>
                  <span>Date: {report.date}</span>
                  <span>Priority: {report.priority}</span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
      </div>
      {icon}
    </div>
  </div>
);

export default Dashboard;