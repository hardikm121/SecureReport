import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, AlertCircle } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

const AdminLogin = () => {
  const navigate = useNavigate();
  const login = useAdminStore(state => state.login);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      await login(formData.email, formData.password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
        <p className="text-gray-600 mt-2">Access the admin dashboard</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Admin Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
            loading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Signing in...' : 'Sign In as Admin'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;