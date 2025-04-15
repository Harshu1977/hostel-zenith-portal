
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="text-center max-w-md animate-fade-in">
        <div className="mb-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-red-500 text-5xl font-bold">404</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Button asChild variant="outline">
            <button onClick={() => window.history.back()} className="flex items-center space-x-2">
              <ArrowLeft size={16} />
              <span>Go Back</span>
            </button>
          </Button>
          <Button asChild>
            <Link to="/" className="flex items-center space-x-2">
              <Home size={16} />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
