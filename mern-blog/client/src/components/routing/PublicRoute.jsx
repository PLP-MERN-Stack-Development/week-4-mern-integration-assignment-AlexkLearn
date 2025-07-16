import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PublicRoute = ({ component: Component }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex justify-center py-8">Loading...</div>;
  }

  return !isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  );
};

export default PublicRoute;