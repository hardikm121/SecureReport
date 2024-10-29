import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, UserCircle, Menu, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-indigo-600" />
            <span className="font-bold text-xl text-gray-800">SafeReport</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/report" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Report Crime
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600">
                Dashboard
              </Link>
            )}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-indigo-600"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center text-gray-600 hover:text-indigo-600">
                <UserCircle className="h-5 w-5 mr-1" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <Link
              to="/report"
              className="block py-2 px-4 text-sm text-white bg-indigo-600 rounded-lg mb-2"
              onClick={() => setIsOpen(false)}
            >
              Report Crime
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <span className="block py-2 px-4 text-sm text-gray-600">
                  {user?.name}
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left py-2 px-4 text-sm text-gray-600 hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block py-2 px-4 text-sm text-gray-600 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;