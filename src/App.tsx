import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ReportForm from './pages/ReportForm';
import AuthorizedDashboard from './pages/AuthorizedDashboard';
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AadhaarValidation from './pages/AadhaarValidation';

const PrivateRoute: React.FC<{ element: React.ReactElement; allowedRoles?: string[] }> = ({ element, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;
  return element;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/aadhaar-validation" element={<AadhaarValidation />} />
              <Route path="/report" element={<PrivateRoute element={<ReportForm />} />} />
              <Route path="/user-dashboard" element={<PrivateRoute element={<UserDashboard />} />} />
              <Route path="/authorized" element={<PrivateRoute element={<AuthorizedDashboard />} allowedRoles={['admin']} />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;