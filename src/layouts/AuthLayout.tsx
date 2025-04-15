
import { Outlet, Link } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:block bg-gradient-to-br from-hostel-purple to-hostel-purple-dark relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
          <Link to="/" className="flex items-center space-x-2 absolute top-6 left-6">
            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
              <span className="text-hostel-purple font-bold text-xl">H</span>
            </div>
            <span className="text-xl font-bold">Zenith</span>
          </Link>
          
          <div className="max-w-md animate-fade-in">
            <h1 className="text-3xl font-bold mb-6">Welcome to Hostel Zenith</h1>
            <p className="mb-4">
              The complete hostel management solution designed for college students and administrators.
            </p>
            <div className="grid grid-cols-2 gap-4 my-8">
              <FeatureItem title="Digital Outpass">
                Easily request and manage outpasses online
              </FeatureItem>
              <FeatureItem title="Mess QR">
                Streamlined meal attendance with QR codes
              </FeatureItem>
              <FeatureItem title="Complaint Box">
                Submit and track issues efficiently
              </FeatureItem>
              <FeatureItem title="Announcements">
                Stay updated with important notices
              </FeatureItem>
            </div>
            <div className="mt-8">
              <p className="text-sm opacity-80">"Hostel Zenith has revolutionized how we manage our dormitories. The system is intuitive and has drastically reduced administrative overhead."</p>
              <p className="text-sm font-medium mt-2">- Prof. J. Smith, Head of Hostel Affairs</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-scale-in">
          <div className="md:hidden flex items-center justify-center mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-hostel-purple to-hostel-blue bg-clip-text text-transparent">
                Zenith
              </span>
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ 
  title, 
  children 
}: { 
  title: string; 
  children: React.ReactNode 
}) => {
  return (
    <div className="bg-white/10 p-4 rounded-lg">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm opacity-90">{children}</p>
    </div>
  );
};
