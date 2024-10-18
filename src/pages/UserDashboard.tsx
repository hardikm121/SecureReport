import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const UserDashboard: React.FC = () => {
  const { user, getUserReports } = useAuth();
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      if (user) {
        const userReports = await getUserReports();
        setReports(userReports);
      }
    };
    fetchReports();
  }, [user, getUserReports]);

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Your Dashboard</h2>
      <Link to="/report" className="mb-6 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Submit New Report
      </Link>
      <h3 className="text-2xl font-semibold mb-4">Your Reports</h3>
      {reports.length === 0 ? (
        <p>You haven't submitted any reports yet.</p>
      ) : (
        <ul className="space-y-4">
          {reports.map((report) => (
            <li key={report.id} className="bg-white shadow rounded-lg p-4">
              <h4 className="text-lg font-semibold">{report.incidentType}</h4>
              <p className="text-gray-600">{report.description}</p>
              <p className="text-sm text-gray-500">Date: {report.date}</p>
              <p className="text-sm text-gray-500">Location: {report.location}</p>
              <p className="text-sm font-semibold mt-2">
                Status: <span className="capitalize">{report.status}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;