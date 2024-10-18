import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

interface Report {
  id: string;
  userId: string;
  incidentType: string;
  description: string;
  date: string;
  location: string;
  status: 'pending' | 'under review' | 'resolved';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  validateAadhaar: (aadhaarNumber: string) => Promise<boolean>;
  submitReport: (report: Omit<Report, 'id' | 'userId' | 'status'>) => Promise<void>;
  getUserReports: () => Promise<Report[]>;
  getAllReports: () => Promise<Report[]>;
  updateReportStatus: (reportId: string, status: Report['status']) => Promise<void>;
  deleteReport: (reportId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedReports = localStorage.getItem('reports');
    if (storedReports) {
      setReports(JSON.parse(storedReports));
    }
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser = { id: '1', email, role: email.includes('admin') ? 'admin' : 'user' as const };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const signup = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser = { id: '1', email, role: 'user' as const };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const validateAadhaar = async (aadhaarNumber: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return /^\d{12}$/.test(aadhaarNumber);
  };

  const submitReport = async (report: Omit<Report, 'id' | 'userId' | 'status'>) => {
    if (!user) throw new Error('User not authenticated');
    const newReport: Report = {
      ...report,
      id: Date.now().toString(),
      userId: user.id,
      status: 'pending',
    };
    const updatedReports = [...reports, newReport];
    setReports(updatedReports);
    localStorage.setItem('reports', JSON.stringify(updatedReports));
  };

  const getUserReports = async () => {
    if (!user) throw new Error('User not authenticated');
    return reports.filter(report => report.userId === user.id);
  };

  const getAllReports = async () => {
    if (!user || user.role !== 'admin') throw new Error('Unauthorized');
    return reports;
  };

  const updateReportStatus = async (reportId: string, status: Report['status']) => {
    if (!user || user.role !== 'admin') throw new Error('Unauthorized');
    const updatedReports = reports.map(report =>
      report.id === reportId ? { ...report, status } : report
    );
    setReports(updatedReports);
    localStorage.setItem('reports', JSON.stringify(updatedReports));
  };

  const deleteReport = async (reportId: string) => {
    if (!user || user.role !== 'admin') throw new Error('Unauthorized');
    const updatedReports = reports.filter(report => report.id !== reportId);
    setReports(updatedReports);
    localStorage.setItem('reports', JSON.stringify(updatedReports));
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      validateAadhaar,
      submitReport,
      getUserReports,
      getAllReports,
      updateReportStatus,
      deleteReport,
    }}>
      {children}
    </AuthContext.Provider>
  );
};