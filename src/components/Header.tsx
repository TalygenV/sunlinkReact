import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, MapPin, ChevronDown } from 'lucide-react';
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [openInstallation, setOpenInstallation] = useState(false);
  const [openResources, setOpenResources] = useState(false);
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
 useEffect(() => {
    // Close menus when route changes
    setMobileOpen(false);
    setOpenProducts(false);
    setOpenInstallation(false);
    setOpenResources(false);
  }, [location]);
  
 const toggleDropdown = (menu: 'products' | 'installation' | 'resources') => {
    setOpenProducts(menu === 'products' ? !openProducts : false);
    setOpenInstallation(menu === 'installation' ? !openInstallation : false);
    setOpenResources(menu === 'resources' ? !openResources : false);
  };
  const handleSignOut = () => {
    localStorage.clear();
    setUserData(null);
    setIsAuthenticated(false);
    window.location.href = '/'; // optional: redirect to homepage
  };
 const isHomePage = location.pathname === '/';
  return (
      <header className="inset-x-0 top-0 z-50">
      {/* Top Bar */}
      <div className="header-top hidden lg:flex flex-wrap items-center justify-between p-2 lg:px-8 text-sm text-gray-700 bg-white">
        <div className="flex items-center space-x-2">
          <Link to="/#contactinfo" className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Enter your location
          </Link>
        </div>
        <div className="flex items-center space-x-2 text-center">
          Join 1000+ homeowners who've gone solar and spent $0 in sales commissions
          <span className="ml-1 mt-1">→</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4 mr-1" />
          Call us at +1 (801) 897-4270
        </div>
      </div>

      {/* Main Nav */}
      <nav
        className={`${isHomePage ? 'absolute' : 'relative'} w-full flex items-center justify-between p-6 lg:px-8 text-white transition-all duration-300 ${isScrolled ? 'bg-gray-900 shadow-lg' : ''}`}
        style={{ backgroundColor: !isHomePage ? '#1F2937' : isScrolled ? '#1F2937' : 'transparent' }}
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img className="h-8 w-auto" src={logo} alt="Sunlink Logo" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex align-center lg:gap-x-2 xl:gap-x-4 2xl:gap-x-12 uppercase">
          <Link to="/about" className="text-base font-normal text-white p-2 hover:text-orange-400 transition">
            About
          </Link>

          {/* Products Dropdown */}
          <div className="relative pt-2">
            <button
              onClick={() => toggleDropdown('products')}
              className="text-base font-normal hover:text-blue-400 transition p-2 flex items-center"
            >
              Products <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${openProducts ? 'rotate-180' : ''}`} />
            </button>
            {openProducts && (
              <div className="absolute left-0 mt-2 w-64 bg-white text-black rounded shadow-lg z-50">
                <Link to="/product-solar" className="block px-4 py-2 hover:bg-blue-100">Solar Savings Plan</Link>
                <Link to="/product-solar-storage" className="block px-4 py-2 hover:bg-blue-100">Solar and Storage Plans</Link>
                <Link to="/product-storage" className="block px-4 py-2 hover:bg-blue-100">Storage Only Plans</Link>
              </div>
            )}
          </div>

           {/* Installation Dropdown */}
          <div className="relative pt-2">
            <button
              onClick={() => toggleDropdown('installation')}
              className="text-base font-normal hover:text-blue-400 transition p-2 flex items-center"
            >
              Installation <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${openInstallation ? 'rotate-180' : ''}`} />
            </button>
            {openInstallation && (
              <div className="absolute left-0 mt-2 w-64 bg-white text-black rounded shadow-lg z-50">
                <Link to="/how-we-vet" className="block px-4 py-2 hover:bg-blue-100">How We Vet Partners</Link>
              </div>
            )}
          </div>

          <Link to="/financing" className="text-base font-normal text-white p-2 hover:text-orange-400 transition">
            Financing
          </Link>

           {/* Resources Dropdown */}
          <div className="relative pt-2">
            <button
              onClick={() => toggleDropdown('resources')}
              className="text-base font-normal hover:text-blue-400 transition p-2 flex items-center"
            >
              Resources <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${openResources ? 'rotate-180' : ''}`} />
            </button>
            {openResources && (
              <div className="absolute left-0 mt-2 w-64 bg-white text-black rounded shadow-lg z-50">
                <Link to="/privacy-policy" className="block px-4 py-2 hover:bg-blue-100">Privacy policy</Link>
                <Link to="/terms-of-service" className="block px-4 py-2 hover:bg-blue-100">Terms Of Service</Link>
              </div>
            )}
          </div>

          <Link to="/contact" className="text-base font-normal text-white p-2 hover:text-orange-400 transition">
            Contact
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!isAuthenticated ? (
            <>
              <Link to="/signin" className="text-base font-normal text-white uppercase me-3 mt-1 hover:text-orange-400 transition">
                Sign In
              </Link>
              <Link to="/singup" className="hidden md:block lg:hidden xl:block bg-orange-500 hover:bg-orange-600 py-2 px-4 text-sm font-normal text-white uppercase transition">
                Try Sunlink Now
              </Link>
            </>
          ) : (
            <button onClick={handleSignOut} className="uppercase text-white text-sm">
              Sign Out
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Slide-In Menu */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-4/5 max-w-sm overflow-y-auto bg-white p-6 transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between mb-6">
          <img src={logo} className="h-8" alt="logo" />
          <button onClick={() => setMobileOpen(false)} className="-m-2.5 p-2.5">
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        <nav className="space-y-4">
          {!isAuthenticated ? (
            <>
              <Link to="/about" className="block text-base font-medium text-gray-900" onClick={() => setMobileOpen(false)}>
                About
              </Link>

              <div>
                <button
                  onClick={() => setOpenProducts(!openProducts)}
                  className="flex justify-between items-center w-full text-base font-medium text-gray-900"
                >
                  Products
                  <ChevronDown className={`h-5 w-5 transition-transform ${openProducts ? 'rotate-180' : ''}`} />
                </button>
                {openProducts && (
                  <div className="pl-4 mt-2 space-y-2 bg-gray-100">
                    <Link to="/product-solar" className="block px-4 py-2 hover:bg-blue-100" onClick={() => setMobileOpen(false)}>
                      Solar Savings Plan
                    </Link>
                    <Link to="/product-solar-storage" className="block px-4 py-2 hover:bg-blue-100" onClick={() => setMobileOpen(false)}>
                      Solar and Storage Plans
                    </Link>
                    <Link to="/product-storage" className="block px-4 py-2 hover:bg-blue-100" onClick={() => setMobileOpen(false)}>
                      Storage Only Plans
                    </Link>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => setOpenInstallation(!openInstallation)}
                  className="flex justify-between items-center w-full text-base font-medium text-gray-900"
                >
                  Installation
                  <ChevronDown className={`h-5 w-5 transition-transform ${openInstallation ? 'rotate-180' : ''}`} />
                </button>
                {openInstallation && (
                  <div className="pl-4 mt-2 space-y-2 bg-gray-100">
                    <Link to="/how-we-vet" className="block px-4 py-2 hover:bg-blue-100" onClick={() => setMobileOpen(false)}>
                      How We Vet Partners
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/financing" className="block text-base font-medium text-gray-900" onClick={() => setMobileOpen(false)}>
                Financing
              </Link>

              <div>
                <button
                  onClick={() => setOpenResources(!openResources)}
                  className="flex justify-between items-center w-full text-base font-medium text-gray-900"
                >
                  Resources
                  <ChevronDown className={`h-5 w-5 transition-transform ${openResources ? 'rotate-180' : ''}`} />
                </button>
                {openResources && (
                  <div className="pl-4 mt-2 space-y-2 bg-gray-100">
                    <Link to="/privacy-policy" className="block px-4 py-2 hover:bg-blue-100" onClick={() => setMobileOpen(false)}>
                      Privacy Policy
                    </Link>
                    <Link to="/terms-of-service" className="block px-4 py-2 hover:bg-blue-100" onClick={() => setMobileOpen(false)}>
                      Terms of Service
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/contact" className="block text-base font-medium text-gray-900" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleSignOut();
                setMobileOpen(false);
              }}
              className="uppercase text-white text-sm bg-red-600 px-4 py-2 rounded"
            >
              Sign Out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;





