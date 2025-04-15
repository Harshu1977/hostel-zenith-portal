
import { LandingNavbar } from '@/components/LandingNavbar';
import { Outlet } from 'react-router-dom';

export const LandingLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-hostel-gray-dark text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Hostel Zenith</h3>
              <p className="text-sm text-gray-300">
                Making hostel management easier and more efficient for students, wardens, and mess staff.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Contact Us</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Email: support@hostelzenith.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: University Campus, College Town</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Hostel Zenith. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
