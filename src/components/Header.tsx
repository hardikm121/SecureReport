import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Shield size={24} />
          <span className="text-xl font-bold">SecureReport</span>
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
            {user ? (
              <>
                <li><Link to="/report" className="hover:text-blue-200">Report Incident</Link></li>
                <li><Link to="/user-dashboard" className="hover:text-blue-200">My Reports</Link></li>
                {user.role === 'admin' && (
                  <li><Link to="/authorized" className="hover:text-blue-200">Admin Dashboard</Link></li>
                )}
                <li>
                  <button onClick={logout} className="flex items-center hover:text-blue-200">
                    <LogOut size={18} className="mr-1" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="hover:text-blue-200">Login</Link></li>
                <li><Link to="/signup" className="hover:text-blue-200">Signup</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;