import React, { useState } from 'react';
import { FileText, Bell, Settings, ChevronRight, Search, Filter, MapPin, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const reports = [
    {
      id: 1,
      title: 'Suspicious Activity Report',
      status: 'Under Investigation',
      date: '2024-03-15',
      priority: 'High',
      location: '123 Main St, Downtown',
      reference: 'REF-2024-001',
      lastUpdate: '2024-03-16',
      assignedOfficer: 'Officer Johnson',
      updates: 3,
    },
    {
      id: 2,
      title: 'Vandalism Report',
      status: 'Pending Review',
      date: '2024-03-14',
      priority: 'Medium',
      location: '456 Oak Ave, Westside',
      reference: 'REF-2024-002',
      lastUpdate: '2024-03-15',
      assignedOfficer: 'Officer Smith',
      updates: 1,
    },
    {
      id: 3,
      title: 'Theft Report',
      status: 'Resolved',
      date: '2024-03-13',
      priority: 'High',
      location: '789 Pine St, Eastside',
      reference: 'REF-2024-003',
      lastUpdate: '2024-03-14',
      assignedOfficer: 'Officer Davis',
      updates: 5,
    },
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const notifications = [
    {
      id: 1,
      message: 'New update on your vandalism report',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      message: 'Officer Johnson has been assigned to your case',
      time: '1 day ago',
      read: true,
    },
  ];

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600">Track and manage your reports</p>
        </div>
        <div className="relative">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative">
            <Bell className="h-6 w-6 text-gray-600" />
            {notifications.some(n => !n.read) && (
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600 transform translate-x-1/2 -translate-y-1/2"></span>
            )}
          </button>
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 border border-gray-200 hidden group-hover:block">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Notifications</h3>
            <div className="space-y-3">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-2 rounded-md ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                >
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          title="Total Reports"
          value="12"
          icon={<FileText className="h-6 w-6 text-indigo-600" />}
          change="+2 this month"
        />
        <StatCard
          title="Active Cases"
          value="3"
          icon={<Bell className="h-6 w-6 text-green-600" />}
          change="1 updated today"
        />
        <StatCard
          title="Resolved"
          value="9"
          icon={<Settings className="h-6 w-6 text-blue-600" />}
          change="85% success rate"
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900">My Reports</h2>
            
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
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="under investigation">Under Investigation</option>
                <option value="pending review">Pending Review</option>
                <option value="resolved">Resolved</option>
              </select>

              <Link
                to="/report"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                New Report
              </Link>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-500">Reference: {report.reference}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    report.status === 'Under Investigation'
                      ? 'bg-yellow-100 text-yellow-800'
                      : report.status === 'Resolved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {report.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Submitted</p>
                  <p className="text-sm font-medium">{format(new Date(report.date), 'MMM d, yyyy')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Update</p>
                  <p className="text-sm font-medium">{format(new Date(report.lastUpdate), 'MMM d, yyyy')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Assigned To</p>
                  <p className="text-sm font-medium">{report.assignedOfficer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Priority</p>
                  <p className="text-sm font-medium">{report.priority}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {report.location}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {report.updates} updates
                  </div>
                </div>
                
                <button className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-900">
                  View Details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
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
      <span className="text-sm text-gray-600">{change}</span>
    </div>
    <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>
  </div>
);

export default Dashboard;