import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
    const { user, loading, isAuthenticated } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="flex-center h-screen">Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        // Redirect to a safe page if unauthorized
        return <Navigate to="/products" replace />;
    }

    return children;
}
