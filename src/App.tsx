import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Installation from './pages/SolarCustomization';
import Financing from './pages/CustomizeSolarSystem';

import Resources from './pages/Resources';
import Contact from './pages/Contact';
// import Footer from './components/Footer';
import BatterySelection from './pages/BatterySelection';
import BatterySelectionCustmize from './pages/BatterySelectionCustmize';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/installation" element={<Installation />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/battery-selection" element={<BatterySelection />} />
          <Route path="/battery-selection-customize" element={<BatterySelectionCustmize />} />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<div className="p-10 text-center text-2xl">404 - Page Not Found</div>} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
