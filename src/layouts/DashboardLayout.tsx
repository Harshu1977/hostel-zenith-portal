
import { useState } from 'react';
import { DashboardNavbar } from '@/components/DashboardNavbar';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export const DashboardLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // If loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar isCollapsed={isSidebarCollapsed} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardNavbar onToggleSidebar={toggleSidebar} />
          <div className="flex-1 overflow-auto bg-gray-50 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
