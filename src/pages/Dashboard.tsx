
import { useAuth } from '@/contexts/AuthContext';
import { StatsCard } from '@/components/StatsCard';
import { AnnouncementCard } from '@/components/AnnouncementCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { Link } from 'react-router-dom';
import { mockAnnouncements, mockOutpassRequests, mockComplaints } from '@/data/mockData';
import {
  Home,
  FileText,
  Users,
  MessageSquare,
  Calendar,
  BarChart3,
  TrendingUp,
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  // Filter and sort data
  const latestAnnouncements = [...mockAnnouncements].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 3);

  // Select the appropriate dashboard content based on user role
  const renderDashboardContent = () => {
    switch (user?.role) {
      case 'student':
        return <StudentDashboard />;
      case 'hostel_admin':
        return <HostelAdminDashboard />;
      case 'mess_admin':
        return <MessAdminDashboard />;
      default:
        return <div>Unknown user role</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome to your Hostel Zenith dashboard</p>
      </div>

      {renderDashboardContent()}

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Announcements</h2>
          <Button asChild variant="ghost" size="sm">
            <Link to="/dashboard/announcements">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {latestAnnouncements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} compact />
          ))}
        </div>
      </div>
    </div>
  );
};

const StudentDashboard = () => {
  // Get student-specific data
  const myOutpasses = [...mockOutpassRequests]
    .filter(request => request.studentId === "user1")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  const myComplaints = [...mockComplaints]
    .filter(complaint => complaint.studentId === "user1")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Total Outpasses"
          value="5"
          icon={FileText}
          description="2 pending approvals"
        />
        <StatsCard
          title="Complaints Filed"
          value="3"
          icon={MessageSquare}
          description="1 resolved recently"
        />
        <StatsCard
          title="Mess Attendance"
          value="92%"
          icon={Calendar}
          description="This month"
          trend={{
            value: 5,
            label: "from last month",
            positive: true,
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Outpasses</CardTitle>
            <CardDescription>Your latest outpass requests</CardDescription>
          </CardHeader>
          <CardContent>
            {myOutpasses.length > 0 ? (
              <div className="space-y-4">
                {myOutpasses.map((outpass) => (
                  <div key={outpass.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium">{outpass.destination}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(outpass.leaveFrom).toLocaleDateString()} - {new Date(outpass.leaveTo).toLocaleDateString()}
                      </p>
                    </div>
                    <StatusBadge status={outpass.status} />
                  </div>
                ))}
                <Button asChild variant="outline" size="sm" className="w-full mt-2">
                  <Link to="/dashboard/outpass">New Outpass Request</Link>
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 mb-4">No outpass requests found</p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/dashboard/outpass">New Outpass Request</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Complaints</CardTitle>
            <CardDescription>Status of your recent complaints</CardDescription>
          </CardHeader>
          <CardContent>
            {myComplaints.length > 0 ? (
              <div className="space-y-4">
                {myComplaints.map((complaint) => (
                  <div key={complaint.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium">{complaint.title}</p>
                      <p className="text-sm text-gray-500">{complaint.category}</p>
                    </div>
                    <StatusBadge status={complaint.status} />
                  </div>
                ))}
                <Button asChild variant="outline" size="sm" className="w-full mt-2">
                  <Link to="/dashboard/complaints">New Complaint</Link>
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 mb-4">No complaints found</p>
                <Button asChild variant="outline" size="sm">
                  <Link to="/dashboard/complaints">File a Complaint</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const HostelAdminDashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Students"
          value="245"
          icon={Users}
          description="Active residents"
        />
        <StatsCard
          title="Pending Outpasses"
          value="12"
          icon={FileText}
          description="Awaiting approval"
          trend={{
            value: 3,
            label: "increase since yesterday",
            positive: false,
          }}
        />
        <StatsCard
          title="Open Complaints"
          value="8"
          icon={MessageSquare}
          description="4 high priority"
        />
        <StatsCard
          title="Room Occupancy"
          value="92%"
          icon={Home}
          description="18 vacant rooms"
          trend={{
            value: 5,
            label: "increase since last month",
            positive: true,
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Outpass Requests</CardTitle>
            <CardDescription>Pending approval from students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockOutpassRequests.map((outpass) => (
                <div key={outpass.id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <p className="font-medium">{outpass.studentName}</p>
                    <p className="text-sm text-gray-500">
                      {outpass.hostelBlock}-{outpass.roomNumber} • {outpass.destination}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(outpass.leaveFrom).toLocaleDateString()} - {new Date(outpass.leaveTo).toLocaleDateString()}
                    </p>
                  </div>
                  <StatusBadge status={outpass.status} />
                </div>
              ))}
              <Button asChild variant="outline" size="sm" className="w-full mt-2">
                <Link to="/dashboard/outpasses">View All Requests</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Complaints</CardTitle>
            <CardDescription>Latest issues reported by students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockComplaints.map((complaint) => (
                <div key={complaint.id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <p className="font-medium">
                      {complaint.title}
                      {complaint.isAnonymous && (
                        <span className="ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                          Anonymous
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">
                      {complaint.category} • {complaint.studentName || 'Anonymous'}
                    </p>
                  </div>
                  <StatusBadge status={complaint.status} />
                </div>
              ))}
              <Button asChild variant="outline" size="sm" className="w-full mt-2">
                <Link to="/dashboard/complaints">View All Complaints</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const MessAdminDashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Today's Attendance"
          value="215"
          icon={Users}
          description="87% of registered students"
          trend={{
            value: 3,
            label: "increase since yesterday",
            positive: true,
          }}
        />
        <StatsCard
          title="Breakfast Served"
          value="189"
          icon={Calendar}
          description="77% attendance"
        />
        <StatsCard
          title="Lunch Served"
          value="205"
          icon={Calendar}
          description="84% attendance"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Analytics</CardTitle>
            <CardDescription>Weekly meal attendance trends</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex flex-col items-center justify-center">
            <BarChart3 size={64} className="text-gray-300 mb-4" />
            <p className="text-gray-500 text-center">
              Attendance analytics chart will be displayed here
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Food Consumption Trends</CardTitle>
            <CardDescription>Weekly consumption patterns</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex flex-col items-center justify-center">
            <TrendingUp size={64} className="text-gray-300 mb-4" />
            <p className="text-gray-500 text-center">
              Consumption trends chart will be displayed here
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
