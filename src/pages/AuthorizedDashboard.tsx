import React, { useState, useEffect } from 'react';
import { FileText, User, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Report {
  id: string;
  userId: string;
  incidentType: string;
  description: string;
  date: string;
  location: string;
  status: 'pending' | 'under review' | 'resolved';
}

const AuthorizedDashboard: React.FC = () => {
  const { user, getAllReports, updateReportStatus, deleteReport } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      if (user && user.role === 'admin') {
        const allReports = await getAllReports();
        setReports(allReports);
      }
    };
    fetchReports();
  }, [user, getAllReports]);

  const handleStatusChange = async (reportId: string, newStatus: Report['status']) => {
    await updateReportStatus(reportId, newStatus);
    setReports(reports.map(report =>
      report.id === reportId ? { ...report, status: newStatus } : report
    ));
  };

  const handleDeleteReport = async (reportId: string) => {
    await deleteReport(reportId);
    setReports(reports.filter(report => report.id !== reportId));
  };

  if (!user || user.role !== 'admin') {
    return <div>Access denied. You must be an admin to view this page.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Authorized Personnel Dashboard</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {reports.map((report) => (
            <li key={report.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">
                  {report.incidentType}
                </p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {report.status}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    <User className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    {report.userId}
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                    <FileText className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    {report.description.substring(0, 50)}...
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>{report.date}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <select
                  value={report.status}
                  onChange={(e) => handleStatusChange(report.id, e.target.value as Report['status'])}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="pending">Pending</option>
                  <option value="under review">Under Review</option>
                  <option value="resolved">Resolved</option>
                </select>
                <button
                  onClick={() => handleDeleteReport(report.id)}
                  className="ml-3 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AuthorizedDashboard;