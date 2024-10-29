import React, { useState } from 'react';
import { Camera, MapPin, AlertTriangle, Send } from 'lucide-react';

const ReportCrime = () => {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: '',
    date: '',
    time: '',
    anonymous: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle report submission
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <AlertTriangle className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900">Report an Incident</h1>
        <p className="text-gray-600 mt-2">
          Your report will be handled with complete confidentiality
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type of Incident
          </label>
          <select
            id="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Select type...</option>
            <option value="theft">Theft</option>
            <option value="vandalism">Vandalism</option>
            <option value="assault">Assault</option>
            <option value="suspicious">Suspicious Activity</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Provide as much detail as possible..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date of Incident
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Time of Incident
            </label>
            <input
              type="time"
              id="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="flex-1 rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter address or description"
              required
            />
            <button
              type="button"
              className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
            >
              <MapPin className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Camera className="h-5 w-5 mr-2" />
            Attach Media
          </button>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="anonymous"
              checked={formData.anonymous}
              onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
              Submit Anonymously
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Send className="h-5 w-5" />
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportCrime;