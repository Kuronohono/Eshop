import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Navbar from './Navbar';

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
    return (
      <div className="min-h-screen bg-[#f7f8fb]">
        <Navbar />
        <main className="pt-14 min-[1280px]:pt-0 min-[1280px]:ml-64 px-4">
          <Outlet />
        </main>
      </div>
    );
  } catch {
    localStorage.removeItem('admin_token');
    return <Navigate to="/Admin/Login" replace />;
  }
}