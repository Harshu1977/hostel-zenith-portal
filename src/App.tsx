
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Layouts
import { LandingLayout } from "@/layouts/LandingLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";

// Landing Pages
import Index from "@/pages/Index";

// Auth Pages
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";

// Dashboard Pages
import Dashboard from "@/pages/Dashboard";
import StudentMealQR from "@/pages/StudentMealQR";
import OutpassForm from "@/pages/OutpassForm";
import ComplaintForm from "@/pages/ComplaintForm";
import MessMenu from "@/pages/MessMenu";
import RoomChangeRequest from "@/pages/RoomChangeRequest";
import VisitorLog from "@/pages/VisitorLog";

// Error Pages
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing Pages */}
            <Route element={<LandingLayout />}>
              <Route path="/" element={<Index />} />
              {/* Add more public pages here */}
            </Route>

            {/* Auth Pages */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            {/* Dashboard Pages */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="mess-qr" element={<StudentMealQR />} />
              <Route path="outpass" element={<OutpassForm />} />
              <Route path="complaints" element={<ComplaintForm />} />
              <Route path="mess-menu" element={<MessMenu />} />
              <Route path="room-change" element={<RoomChangeRequest />} />
              <Route path="visitors" element={<VisitorLog />} />
              {/* Add more dashboard pages here */}
            </Route>

            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
