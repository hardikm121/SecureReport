import React from 'react';
import { format } from 'date-fns';
import { MapPin, MessageSquare, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Report } from '../store/reportStore';

interface ReportCardProps {
  report: Report;
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'under_investigation':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
          <p className="text-sm text-gray-500">Reference: {report.reference}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}
        >
          {formatStatus(report.status)}
        </span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Submitted</p>
          <p className="text-sm font-medium">
            {format(new Date(report.createdAt), 'MMM d, yyyy')}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Last Update</p>
          <p className="text-sm font-medium">
            {format(new Date(report.updatedAt), 'MMM d, yyyy')}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Assigned To</p>
          <p className="text-sm font-medium">
            {report.assignedOfficer || 'Pending Assignment'}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Priority</p>
          <p className="text-sm font-medium capitalize">{report.priority}</p>
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
            {report.updates.length} updates
          </div>
        </div>
        
        <Link
          to={`/report/${report.id}`}
          className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-900"
        >
          View Details
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default ReportCard;