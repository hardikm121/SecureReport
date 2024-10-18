import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AadhaarValidation: React.FC = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [error, setError] = useState('');
  const { validateAadhaar } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isValid = await validateAadhaar(aadhaarNumber);
      if (isValid) {
        navigate('/');
      } else {
        setError('Invalid Aadhaar number');
      }
    } catch (err) {
      setError('Failed to validate Aadhaar number');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6">Aadhaar Validation</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="aadhaar" className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
          <input
            type="text"
            id="aadhaar"
            value={aadhaarNumber}
            onChange={(e) => setAadhaarNumber(e.target.value)}
            required
            pattern="\d{12}"
            title="Please enter a valid 12-digit Aadhaar number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Validate Aadhaar
        </button>
      </form>
    </div>
  );
};

export default AadhaarValidation;