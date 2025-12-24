import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { currentUser, userData, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!currentUser) {
    // If route requires admin, redirect to admin login; otherwise go to site root
    if (requireAdmin) return <Navigate to="/admin/login" state={{ from: location }} replace />;
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requireAdmin && userData?.role !== 'admin') {
    // 관리자 권한???�요?�데 ?�반 ?�용?�인 경우
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
