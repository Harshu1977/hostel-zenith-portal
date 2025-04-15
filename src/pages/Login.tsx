
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      // Error is already handled in the auth context
      setLoading(false);
    }
  };

  // Demo accounts for easy login
  const demoAccounts = [
    { role: 'Student', email: 'john.doe@college.edu' },
    { role: 'Hostel Admin', email: 'sarah.wilson@college.edu' },
    { role: 'Mess Admin', email: 'michael.brown@college.edu' },
  ];
  
  const setDemoAccount = (email: string) => {
    setEmail(email);
    setPassword('password'); // In a real app, this would be more secure
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Welcome Back!</h1>
        <p className="text-gray-500">Sign in to your account</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
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
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-sm text-hostel-blue hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full gradient-bg hover:opacity-90" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="mt-8">
        <p className="text-center text-sm text-gray-500 mb-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-hostel-blue font-semibold hover:underline">
            Register
          </Link>
        </p>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">Try demo accounts:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {demoAccounts.map((account) => (
              <Button
                key={account.email}
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setDemoAccount(account.email)}
                className="text-xs"
              >
                {account.role}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
