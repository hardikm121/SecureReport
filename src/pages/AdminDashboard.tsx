import React, { useState } from 'react';
import { FileText, Users, AlertTriangle, BarChart3, Search } from 'lucide-react';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const reports = [
    {
      id: 1,
      title: 'Suspicious Activity Report',
      status: 'Under Investigation',
      date: '2024-03-15',
      priority: 'High',
      location: '123 Main St',
      reporter: 'Anonymous',
    },
    {
      id: 2,
      title: 'Vandalism Report',
      status: 'Pending Review',
      date: '2024-03-14',
      priority: 'Medium',
      location: '456 Oak Ave',
      reporter: 'John Doe',
    },
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || report.status.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage and monitor all reports</p>
        </div>
      </header>

      <div className="grid md:grid-cols-4 gap-6">
        <StatCard
          title="Total Reports"
          value="156"
          icon={<FileText className="h-6 w-6 text-blue-600" />}
          change="+12%"
        />
        <StatCard
          title="Active Cases"
          value="43"
          icon={<AlertTriangle className="h-6 w-6 text-yellow-600" />}
          change="+5%"
        />
        <StatCard
          title="Resolved Cases"
          value="98"
          icon={<Users className="h-6 w-6 text-green-600" />}
          change="+8%"
        />
        <StatCard
          title="Critical Cases"
          value="15"
          icon={<BarChart3 className="h-6 w-6 text-red-600" />}
          change="-2%"
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Reports</h2>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="pending review">Pending Review</option>
                <option value="under investigation">Under Investigation</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reporter
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{report.title}</div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(report.date), 'MMM d, yyyy')}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{report.location}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${report.status === 'Under Investigation' ? 'bg-yellow-100 text-yellow-800' : 
                        report.status === 'Resolved' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{report.reporter}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                    <button className="text-indigo-600 hover:text-indigo-900">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, change }: {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
}) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
      <span className={`text-sm font-medium ${
        change.startsWith('+') ? 'text-green-600' : 'text-red-600'
      }`}>
        {change}
      </span>
    </div>
    <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>
  </div>
);

export default AdminDashboard;