// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { ChevronDown, MapPin, Phone, Menu, X } from 'lucide-react';
// import logo from '../assets/images/sunlink-logo.svg';
// import locationlogo from '../assets/images/location.svg'
// import callIcon from '../assets/images/call_svgrepo.com.svg';
// import phone from '../assets/images/call_svgrepo.com.svg';
// import arrow from '../assets/images/ht-arrow.svg'

// const Header = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const location = useLocation();
//   React.useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 0);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const isActive = (path: string) => location.pathname === path;

//   return (
//     <div className="bg-white">
//       <header className={`inset-x-0 top-0 z-50 ${isScrolled ? 'shadow-md' : ''}`}>
//         {/* Top Bar */}
//         <div
//           className={`header-top hidden lg:flex flex-wrap items-center justify-between p-2 lg:px-8 text-sm text-gray-700 bg-[rgba(255,249,241,1)] transition-all duration-300 ${isScrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto opacity-100'
//             }`}
//         >
//           <div className="flex items-center space-x-2">
//             <img src={locationlogo} className="pe-1" alt="Location" />
//             <span>Enter your location</span>
//           </div>
//           <div className="flex items-center space-x-2 text-center">
//             Join 1000+ homeowners who’ve gone solar and spent $0 in sales commissions
//             <img src={arrow} className="ps-1 mt-1" alt="Arrow" />

//           </div>
//           <div className="flex items-center space-x-2">
//             <img src={phone} className="pe-1" alt="Phone" />
//             <span>Call us at +1 (801) 897-4270</span>
//           </div>
//         </div>

//         {/* Sticky call section for mobile (optional) */}
//         <div className="flex lg:hidden items-center gap-2 px-4 py-2 bg-white text-black border-t border-gray-200">
//           <Phone className="w-4 h-4" />
//           <span className="text-sm">Call us at +1 (801) 897-4270</span>
//         </div>
//       </header>

//       <nav id="mainNav" className="absolute w-full flex items-center justify-between p-6 lg:px-8  text-white"
//         aria-label="Global">
//         <div className="flex lg:flex-1">
//           <a href="index.html" className="-m-1.5 p-1.5">
//             <img className="h-8 w-auto" src={logo} alt="Sunlink Logo" />

//           </a>
//         </div>

//         {/* Mobile Hamburger */}
//         <div className="flex lg:hidden">
//           <button onClick={() => setIsMobileMenuOpen(true)} type="button"
//             className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white">
//             <span className="sr-only">Open main menu</span>
//             <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
//                 d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
//             </svg>
//           </button>
//         </div>

//         {/* Desktop Nav */}
//         <div className="hidden lg:flex align-center lg:gap-x-2  xl:gap-x-4 2xl:gap-x-12 uppercase">
//           <a href="about.html" className="text-base font-normal text-white p-2">About</a>
//           {/* Products Dropdown */}
//           <div className="group relative pt-2">
//             <a href="products.html" className="text-base font-normal hover:text-blue-400 transition p-2">Products <i
//               className="fas fa-chevron-down"></i></a>
//             <div className="absolute left-0 mt-2 hidden w-64 bg-white text-black rounded shadow-lg group-hover:block z-50">
//               <a href="product-solar.html" className="block px-4 py-2 hover:bg-blue-100">Solar Savings Plan</a>
//               <a href="product-solar-storage.html" className="block px-4 py-2 hover:bg-blue-100">Solar and Storage Plans</a>
//               <a href="product-storage.html" className="block px-4 py-2 hover:bg-blue-100">Storage Only Plans</a>
//             </div>
//           </div>
//           <a href="#" className="text-base font-normal text-white p-2">Installation</a>
//           <a href="financing.html" className="text-base font-normal text-white p-2">Financing</a>
//           <div className="group relative pt-2">
//             <a href="#" className="text-base font-normal hover:text-blue-400 transition p-2">Resources <i
//               className="fas fa-chevron-down"></i></a>
//             <div className="absolute left-0 mt-2 hidden w-64 bg-white text-black rounded shadow-lg group-hover:block z-50">
//               <a href="privacy-policy.html" className="block px-4 py-2 hover:bg-blue-100">Privacy Policy</a>
//               <a href="terms-of-service.html" className="block px-4 py-2 hover:bg-blue-100">Terms of use</a>

//             </div>
//           </div>


//           <a href="#" className="text-base font-normal text-white p-2">Contact</a>
//         </div>

//         {/* Desktop CTA */}
//         <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//           <a href="signin.html" className="text-base font-normal text-white uppercase me-3 mt-1">Log in</a>
//           <a href="#"
//             className="hidden md:block lg:hidden xl:block bg-orange hover:bg-orange   py-2 px-4 text-sm font-normal text-white uppercase">Try
//             Sunlink Now</a>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Header;


import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import logo from '../assets/images/sunlink-logo.svg';
import locationIcon from '../assets/images/location.svg';
import callIcon from '../assets/images/call_svgrepo.com.svg';
import arrow from '../assets/images/ht-arrow.svg';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="relative z-50 bg-white">
      {/* Top Bar */}
      <div
        className={`header-top hidden lg:flex items-center justify-between px-8 py-2 text-sm text-gray-700 bg-[rgba(255,249,241,1)] transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-auto opacity-100'
          }`}
      >
        <div className="flex items-center space-x-2">
          <img src={locationIcon} className="pe-1" alt="Location" />
          <span>Enter your location</span>
        </div>
        <div className="flex items-center space-x-2 text-center">
          Join 1000+ homeowners who’ve gone solar and spent $0 in sales commissions
          <img src={arrow} className="ps-1 mt-1" alt="Arrow" />
        </div>
        <div className="flex items-center space-x-2">
          <img src={callIcon} className="pe-1" alt="Phone" />
          <span>Call us at +1 (801) 897-4270</span>
        </div>
      </div>

      {/* Main Nav */}

      <div className={` fixed top-10 w-full flex topnavscrolled items-center justify-between p-6 lg:px-8 text-white bg-[#0c1a23] transition-all duration-300 z-50 ${isScrolled ? 'shadow-md scrolling' : ''}`}>
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
        <nav className="hidden lg:flex align-center lg:gap-x-2  xl:gap-x-4 2xl:gap-x-12 uppercase">
          <Link to="/about" className={isActive('/about') ? 'text-blue-400' : 'text-white'}>
            About
          </Link>
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

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-x-3">
          <Link to="/signin" className="uppercase text-white text-sm">
            Log in
          </Link>
          <Link
            to="/signup"
            className="hidden xl:block bg-orange-500 hover:bg-orange-600 text-white text-sm uppercase px-4 py-2 rounded"
          >
            Try Sunlink Now
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white text-black px-6 py-4 space-y-4">
          <Link to="/about" className="block">
            About
          </Link>
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
          <Link to="/signin" className="block">
            Log in
          </Link>
          <Link to="/signup" className="block bg-orange-500 text-white text-center py-2 rounded">
            Try Sunlink Now
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
