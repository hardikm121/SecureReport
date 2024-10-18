import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ReportForm: React.FC = () => {
  const { user, submitReport } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    incidentType: '',
    description: '',
    date: '',
    location: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitReport(formData);
      setSubmitMessage('Report submitted successfully. Thank you for your contribution.');
      setFormData({ incidentType: '', description: '', date: '', location: '' });
      setTimeout(() => navigate('/user-dashboard'), 2000);
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return <div>Please log in to submit a report.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Report an Incident</h2>
      {submitMessage && (
        <div className={`mb-4 p-4 rounded-md ${submitMessage.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {submitMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="incidentType" className="block text-sm font-medium text-gray-700">Incident Type</label>
          <select
            id="incidentType"
            name="incidentType"
            value={formData.incidentType}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="">Select incident type</option>
            <option value="harassment">Harassment</option>
            <option value="discrimination">Discrimination</option>
            <option value="safety">Safety Concern</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          ></textarea>
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date of Incident</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
};

export default ReportForm;