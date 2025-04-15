
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export const LandingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center">
            <span className="text-white font-bold text-xl">H</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-hostel-purple to-hostel-blue bg-clip-text text-transparent">
            Zenith
          </span>
        </Link>

        {isMobile ? (
          <>
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>

            {isMenuOpen && (
              <div className="fixed inset-0 top-14 z-50 bg-white animate-fade-in">
                <div className="flex flex-col items-center justify-start pt-8 space-y-6">
                  <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
                  <NavLink to="/features" onClick={toggleMenu}>Features</NavLink>
                  <NavLink to="/about" onClick={toggleMenu}>About</NavLink>
                  <div className="pt-6 flex flex-col w-full items-center space-y-4">
                    <Button asChild variant="outline" className="w-3/4">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button asChild className="gradient-bg hover:opacity-90 w-3/4">
                      <Link to="/register">Register</Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="hidden md:flex items-center space-x-6">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/features">Features</NavLink>
              <NavLink to="/about">About</NavLink>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button asChild variant="outline">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="gradient-bg hover:opacity-90">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ 
  to, 
  children, 
  onClick 
}: { 
  to: string; 
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <Link 
      to={to} 
      className="text-hostel-gray-dark hover:text-hostel-purple font-medium story-link"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
