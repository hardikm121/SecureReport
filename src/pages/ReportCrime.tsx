import React, { useState } from 'react';
import { Camera, MapPin, AlertTriangle, Send, Upload, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Evidence {
  id: string;
  type: 'image' | 'video' | 'document';
  name: string;
  size: string;
}

const ReportCrime = () => {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: '',
    date: '',
    time: '',
    anonymous: false,
    witnesses: '',
    emergencyResponse: false,
    suspectDescription: '',
    propertyDamage: false,
    damageValue: '',
  });

  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [loading, setLoading] = useState(false);

  const handleEvidenceUpload = () => {
    // Simulate file upload
    const newEvidence: Evidence = {
      id: Math.random().toString(36).substring(7),
      type: 'image',
      name: 'evidence_photo.jpg',
      size: '2.4 MB'
    };
    setEvidence([...evidence, newEvidence]);
    toast.success('Evidence uploaded successfully');
  };

  const removeEvidence = (id: string) => {
    setEvidence(evidence.filter(e => e.id !== id));
    toast.success('Evidence removed');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Report submitted successfully. Reference number: REF-' + Math.random().toString(36).substring(7).toUpperCase());
      setFormData({
        type: '',
        description: '',
        location: '',
        date: '',
        time: '',
        anonymous: false,
        witnesses: '',
        emergencyResponse: false,
        suspectDescription: '',
        propertyDamage: false,
        damageValue: '',
      });
      setEvidence([]);
    } catch (error) {
      toast.error('Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
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
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                If this is an emergency situation requiring immediate response, please call 911 immediately.
              </p>
            </div>
          </div>
        </div>

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
            <option value="assault">Assault</option>
            <option value="vandalism">Vandalism</option>
            <option value="burglary">Burglary</option>
            <option value="harassment">Harassment</option>
            <option value="fraud">Fraud</option>
            <option value="suspicious">Suspicious Activity</option>
            <option value="cybercrime">Cybercrime</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Detailed Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Provide as much detail as possible about what happened..."
            required
          />
        </div>

        <div>
          <label htmlFor="suspectDescription" className="block text-sm font-medium text-gray-700">
            Suspect Description (if applicable)
          </label>
          <textarea
            id="suspectDescription"
            rows={3}
            value={formData.suspectDescription}
            onChange={(e) => setFormData({ ...formData, suspectDescription: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Physical description, clothing, vehicle details, etc."
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

        <div>
          <label htmlFor="witnesses" className="block text-sm font-medium text-gray-700">
            Witness Information
          </label>
          <textarea
            id="witnesses"
            rows={2}
            value={formData.witnesses}
            onChange={(e) => setFormData({ ...formData, witnesses: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Names and contact information of any witnesses (if available)"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Evidence Upload
          </label>
          <div className="space-y-2">
            {evidence.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <Upload className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{file.name}</span>
                  <span className="ml-2 text-xs text-gray-500">({file.size})</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeEvidence(file.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleEvidenceUpload}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Camera className="h-5 w-5 mr-2" />
            Add Evidence
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="propertyDamage"
              checked={formData.propertyDamage}
              onChange={(e) => setFormData({ ...formData, propertyDamage: e.target.checked })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="propertyDamage" className="ml-2 block text-sm text-gray-700">
              Property Damage Involved
            </label>
          </div>

          {formData.propertyDamage && (
            <div>
              <label htmlFor="damageValue" className="block text-sm font-medium text-gray-700">
                Estimated Value of Damage
              </label>
              <input
                type="text"
                id="damageValue"
                value={formData.damageValue}
                onChange={(e) => setFormData({ ...formData, damageValue: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter estimated value"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
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

          <div className="flex items-center">
            <input
              type="checkbox"
              id="emergencyResponse"
              checked={formData.emergencyResponse}
              onChange={(e) => setFormData({ ...formData, emergencyResponse: e.target.checked })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="emergencyResponse" className="ml-2 block text-sm text-gray-700">
              Request Immediate Response
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            loading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          <Send className="h-5 w-5" />
          {loading ? 'Submitting Report...' : 'Submit Report'}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          By submitting this report, you confirm that all information provided is accurate to the best of your knowledge.
          False reporting may lead to legal consequences.
        </p>
      </form>
    </div>
  );
};

export default ReportCrime;