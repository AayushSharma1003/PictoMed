
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, HeartPulse } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-picto-blue-dark dark:text-picto-red-medium">
            <HeartPulse className="h-8 w-8 text-picto-blue-medium dark:text-picto-red-light" />
            <span>PictoMed</span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-picto-gray-dark dark:text-gray-200 hover:text-picto-blue-medium dark:hover:text-picto-red-medium transition-colors ${
                location.pathname === '/' ? 'font-medium text-picto-blue-dark dark:text-picto-red-medium' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/scan" 
              className={`text-picto-gray-dark dark:text-gray-200 hover:text-picto-blue-medium dark:hover:text-picto-red-medium transition-colors ${
                location.pathname === '/scan' ? 'font-medium text-picto-blue-dark dark:text-picto-red-medium' : ''
              }`}
            >
              Disease Detection
            </Link>
            <Link 
              to="/chat" 
              className={`text-picto-gray-dark dark:text-gray-200 hover:text-picto-blue-medium dark:hover:text-picto-red-medium transition-colors ${
                location.pathname === '/chat' ? 'font-medium text-picto-blue-dark dark:text-picto-red-medium' : ''
              }`}
            >
              Mental Health
            </Link>
            <ThemeToggle />
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="ml-2 p-2 rounded-full text-picto-gray-dark dark:text-gray-300 hover:bg-picto-gray-lightest dark:hover:bg-gray-800 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-picto-gray-light dark:border-gray-700 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`px-4 py-2 text-picto-gray-dark dark:text-gray-200 hover:bg-picto-gray-lightest dark:hover:bg-gray-800 rounded-md transition-colors ${
                  location.pathname === '/' ? 'font-medium bg-picto-gray-lightest dark:bg-gray-800' : ''
                }`}
              >
                Home
              </Link>
              <Link 
                to="/scan" 
                className={`px-4 py-2 text-picto-gray-dark dark:text-gray-200 hover:bg-picto-gray-lightest dark:hover:bg-gray-800 rounded-md transition-colors ${
                  location.pathname === '/scan' ? 'font-medium bg-picto-gray-lightest dark:bg-gray-800' : ''
                }`}
              >
                Disease Detection
              </Link>
              <Link 
                to="/chat" 
                className={`px-4 py-2 text-picto-gray-dark dark:text-gray-200 hover:bg-picto-gray-lightest dark:hover:bg-gray-800 rounded-md transition-colors ${
                  location.pathname === '/chat' ? 'font-medium bg-picto-gray-lightest dark:bg-gray-800' : ''
                }`}
              >
                Mental Health
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
