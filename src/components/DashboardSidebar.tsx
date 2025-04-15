
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  Home,
  FileText,
  MessageSquare,
  Users,
  Calendar,
  Settings,
  UserPlus,
  FileBarChart,
  Utensils,
  Clock,
  QrCode,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  isCollapsed: boolean;
}

export const DashboardSidebar = ({ isCollapsed }: SidebarProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const getCommonLinks = () => [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: Home,
    },
    {
      title: 'Announcements',
      href: '/dashboard/announcements',
      icon: AlertCircle,
    },
  ];

  const getStudentLinks = () => [
    ...getCommonLinks(),
    {
      title: 'Outpass',
      href: '/dashboard/outpass',
      icon: FileText,
    },
    {
      title: 'Mess QR',
      href: '/dashboard/mess-qr',
      icon: QrCode,
    },
    {
      title: 'Room Change',
      href: '/dashboard/room-change',
      icon: Home,
    },
    {
      title: 'Complaints',
      href: '/dashboard/complaints',
      icon: MessageSquare,
    },
    {
      title: 'Mess Menu',
      href: '/dashboard/mess-menu',
      icon: Utensils,
    },
    {
      title: 'Visitors Log',
      href: '/dashboard/visitors',
      icon: UserPlus,
    },
  ];

  const getHostelAdminLinks = () => [
    ...getCommonLinks(),
    {
      title: 'Students',
      href: '/dashboard/students',
      icon: Users,
    },
    {
      title: 'Outpasses',
      href: '/dashboard/outpasses',
      icon: FileText,
    },
    {
      title: 'Complaints',
      href: '/dashboard/complaints',
      icon: MessageSquare,
    },
    {
      title: 'Room Changes',
      href: '/dashboard/room-changes',
      icon: Home,
    },
    {
      title: 'Visitors',
      href: '/dashboard/visitors',
      icon: UserPlus,
    },
    {
      title: 'Manage Announcements',
      href: '/dashboard/manage-announcements',
      icon: AlertCircle,
    },
  ];

  const getMessAdminLinks = () => [
    ...getCommonLinks(),
    {
      title: 'Attendance',
      href: '/dashboard/attendance',
      icon: Clock,
    },
    {
      title: 'Scan QR',
      href: '/dashboard/scan-qr',
      icon: QrCode,
    },
    {
      title: 'Manage Menu',
      href: '/dashboard/manage-menu',
      icon: Utensils,
    },
    {
      title: 'Reports',
      href: '/dashboard/reports',
      icon: FileBarChart,
    },
  ];

  const getLinks = () => {
    switch (user?.role) {
      case 'student':
        return getStudentLinks();
      case 'hostel_admin':
        return getHostelAdminLinks();
      case 'mess_admin':
        return getMessAdminLinks();
      default:
        return getCommonLinks();
    }
  };

  const links = getLinks();

  return (
    <div
      className={cn(
        'flex flex-col h-full bg-white border-r transition-all duration-300 overflow-hidden',
        isCollapsed ? 'w-[70px]' : 'w-[240px]'
      )}
    >
      <div className="p-4 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center">
            <span className="text-white font-bold text-xl">H</span>
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold bg-gradient-to-r from-hostel-purple to-hostel-blue bg-clip-text text-transparent">
              Zenith
            </span>
          )}
        </div>
      </div>

      <Separator />

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {links.map((link, index) => {
            const isActive = currentPath === link.href;
            return (
              <Button
                key={index}
                asChild
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'justify-start h-10',
                  isActive && 'bg-hostel-purple-light/10 text-hostel-purple font-medium'
                )}
              >
                <Link to={link.href} className="flex items-center">
                  <link.icon size={18} className={cn('mr-2', isCollapsed && 'mx-auto')} />
                  {!isCollapsed && <span>{link.title}</span>}
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>

      <Separator />

      <div className="p-2">
        <Button
          asChild
          variant="ghost"
          className={cn('justify-start w-full h-10', 
            currentPath === '/dashboard/settings' && 'bg-hostel-purple-light/10 text-hostel-purple font-medium'
          )}
        >
          <Link to="/dashboard/settings" className="flex items-center">
            <Settings size={18} className={cn('mr-2', isCollapsed && 'mx-auto')} />
            {!isCollapsed && <span>Settings</span>}
          </Link>
        </Button>
      </div>
    </div>
  );
};
