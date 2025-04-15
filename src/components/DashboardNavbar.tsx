
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Bell, Menu, X, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const DashboardNavbar = ({ 
  onToggleSidebar 
}: { 
  onToggleSidebar: () => void 
}) => {
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <nav className="bg-white shadow-sm py-2 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
          <Menu size={20} />
        </Button>
        <div>
          <p className="text-sm text-gray-500">{getGreeting()},</p>
          <h2 className="font-semibold">{user?.name}</h2>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-4 py-2 border-b">
              <h3 className="font-medium">Notifications</h3>
              <Button variant="ghost" size="sm">Mark all read</Button>
            </div>
            <div className="max-h-[300px] overflow-auto">
              <NotificationItem
                title="Outpass Approved"
                description="Your outpass request for April 20-22 has been approved."
                time="10 min ago"
                isNew
              />
              <NotificationItem
                title="New Announcement"
                description="Important: Water supply will be cut off on Sunday from 10 AM to 2 PM."
                time="1 hour ago"
                isNew
              />
              <NotificationItem
                title="Complaint Update"
                description="Your complaint about water leakage has been marked as in-progress."
                time="2 hours ago"
                isNew
              />
              <NotificationItem
                title="Mess Menu Updated"
                description="The mess menu for next week has been updated."
                time="1 day ago"
              />
            </div>
            <DropdownMenuSeparator />
            <div className="p-2 text-center">
              <Link to="/dashboard/notifications" className="text-sm text-hostel-blue hover:underline" onClick={() => setNotificationsOpen(false)}>
                View all notifications
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="h-8 w-8 rounded-full bg-hostel-purple flex items-center justify-center text-white font-semibold">
                {user?.name.charAt(0)}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="p-2 text-center border-b">
              <p className="font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
              <div className="mt-1 px-2 py-0.5 rounded bg-hostel-pink inline-block text-xs font-medium text-hostel-purple capitalize">
                {user?.role.replace('_', ' ')}
              </div>
            </div>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/profile">My Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer">
              <LogOut size={16} className="mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

const NotificationItem = ({ 
  title, 
  description, 
  time, 
  isNew = false 
}: { 
  title: string; 
  description: string; 
  time: string; 
  isNew?: boolean;
}) => {
  return (
    <div className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${isNew ? 'bg-blue-50/50' : ''}`}>
      <div className="flex justify-between">
        <h4 className="font-medium text-sm">{title}</h4>
        {isNew && <span className="h-2 w-2 rounded-full bg-blue-500"></span>}
      </div>
      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{description}</p>
      <p className="text-xs text-gray-400 mt-1">{time}</p>
    </div>
  );
};
