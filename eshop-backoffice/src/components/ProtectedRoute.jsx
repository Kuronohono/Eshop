import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function ProtectedRoute() {
  const token = localStorage.getItem('admin_token');

  if (!token) {
    return <Navigate to="/Admin/Login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    if (decoded.role !== 'ROLE_ADMIN') {
      localStorage.removeItem('admin_token');
      return <Navigate to="/Admin/Login" replace />;
    }
    return <Outlet />;
  } catch {
    localStorage.removeItem('admin_token');
    return <Navigate to="/Admin/Login" replace />;
  }
}