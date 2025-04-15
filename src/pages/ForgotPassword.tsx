
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      await resetPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      // Error is already handled in the auth context
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-600"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
        <p className="text-gray-600 mb-6">
          We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions to reset your password.
        </p>
        <div className="space-y-4">
          <Button asChild variant="outline" className="w-full">
            <Link to="/login">Back to Login</Link>
          </Button>
          <p className="text-sm text-gray-500">
            Didn't receive the email?{' '}
            <button 
              onClick={() => setIsSubmitted(false)} 
              className="text-hostel-blue font-semibold hover:underline"
            >
              Try again
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <p className="text-gray-500">Enter your email to reset your password</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@college.edu"
            required
          />
        </div>

        <Button type="submit" className="w-full gradient-bg hover:opacity-90" disabled={loading}>
          {loading ? 'Sending link...' : 'Send Reset Link'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Remember your password?{' '}
          <Link to="/login" className="text-hostel-blue font-semibold hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
