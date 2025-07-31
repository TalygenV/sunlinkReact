import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import logo from '../assets/images/sunlink-logo.svg';
import locationIcon from '../assets/images/location.svg';
import callIcon from '../assets/images/call_svgrepo.com.svg';
import arrow from '../assets/images/ht-arrow.svg';
import { FormContext, useFormContext } from '../context/FormContext';

interface HeaderProps {
  onSignInClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSignInClick }) => {
  const {
      isAuthenticated,
    } = React.useContext(FormContext);
  const { userData, setUserData, setIsAuthenticated } = useFormContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = () => {
    localStorage.clear();
    setUserData(null);
    setIsAuthenticated(false);
    window.location.href = '/'; // optional: redirect to homepage
  };

  return (
    <header className={`z-50 text-sm transition-all duration-300 ${
  isScrolled ? 'fixed top-0 w-full bg-white shadow-md' : 'relative bg-white'
}`}>
      {/* Top Bar */}
     <div
  className={`header-top hidden lg:flex items-center justify-between px-8 text-gray-700 bg-[rgba(255,249,241,1)] transition-all duration-500 ease-in-out overflow-hidden ${
    isScrolled ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100'
  }`}
>
        <div className="flex items-center text-sm py-2">
          <img src={locationIcon} className="pe-1" alt="Location" />
          <span>Enter your location</span>
        </div>
        <div className="flex items-center space-x-2 text-center py-2">
          Join 1000+ homeowners who’ve gone solar and spent $0 in sales commissions
          <img src={arrow} className="ps-1 mt-1" alt="Arrow" />
        </div>
        <div className="flex items-center py-2">
          <img src={callIcon} className="pe-1" alt="Phone" />
          <span>Call us at +1 (801) 897-4270</span>
        </div>
      </div>

      {/* Main Nav */}
      <div id="mainNav"
        className={`fixed  w-full flex items-center justify-between p-6 lg:px-8 text-white bg-[#090f12] border-b border-[#2a2a2a] transition-all duration-300 z-50 ${
          isScrolled ? 'shadow-md scrolling' : ''
        }`}
      >
        <Link to="/" className="-m-1.5 p-1.5">
          <img src={logo} alt="Sunlink Logo" className="h-8 w-auto" />
        </Link>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center p-2.5"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop Nav */}
        {isAuthenticated === false ? (
          <nav className="hidden lg:flex align-center lg:gap-x-2 xl:gap-x-4 2xl:gap-x-12 uppercase">
            {/* <Link to="/about" className={isActive('/about') ? 'text-blue-400' : 'text-white'}>
              About
            </Link> */}
            <Link to="/products" className={isActive('/products') ? 'text-blue-400' : 'text-white'}>
              Products
            </Link>
            <Link to="/installation" className={isActive('/installation') ? 'text-blue-400' : 'text-white'}>
              Installation
            </Link>
            <Link to="/financing" className={isActive('/financing') ? 'text-blue-400' : 'text-white'}>
              Financing
            </Link>
            <Link to="/resources" className={isActive('/resources') ? 'text-blue-400' : 'text-white'}>
              Resources
            </Link>
            <Link to="/contact" className={isActive('/contact') ? 'text-blue-400' : 'text-white'}>
              Contact
            </Link>
          </nav>
        ) : null}

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-x-3">
          {isAuthenticated ? (
            <button onClick={handleSignOut} className="uppercase text-white text-sm">
              Sign Out
            </button>
          ) : (
            <>
              <button onClick={onSignInClick} className="uppercase text-white text-sm">
                Log in
              </button>
              <Link
                to="/signup"
                className="hidden xl:block bg-orange-500 hover:bg-orange-600 text-white text-sm uppercase px-4 py-2 rounded"
              >
                Try Sunlink Now
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute z-50 top-24 w-full bg-white text-black px-6 py-4 space-y-4">
          {isAuthenticated === false ? (
            <>
              {/* <Link to="/about" className="block">
                About
              </Link> */}
              <Link to="/products" className="block">
                Products
              </Link>
              <Link to="/installation" className="block">
                Installation
              </Link>
              <Link to="/financing" className="block">
                Financing
              </Link>
              <Link to="/resources" className="block">
                Resources
              </Link>
              <Link to="/contact" className="block">
                Contact
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onSignInClick();
                }}
                className="block w-full text-left"
              >
                Log in
              </button>
              <Link to="/signup" className="block bg-orange-500 text-white text-center py-2 rounded">
                Try Sunlink Now
              </Link>
            </>
          ) : (
            <button onClick={handleSignOut} className="block w-full text-left text-red-500 font-semibold">
              Sign Out
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;


