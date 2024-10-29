import { Navigate } from 'react-router-dom';
import { useAdminStore } from '../store/adminStore';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const isAdmin = useAdminStore(state => state.isAdmin);
  
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;