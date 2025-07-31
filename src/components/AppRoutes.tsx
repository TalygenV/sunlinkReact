import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Products from '../pages/Products';
import Installation from '../pages/SolarCustomization';
import Financing from '../pages/CustomizeSolarSystem';
import Resources from '../pages/Resources';
import BatterySelection from '../pages/BatterySelection';

import { FormContext } from '../context/FormContext';
import SystemOverview from '../SystemOverview/SystemOverview';

const AppRoutes = () => {
  const location = useLocation();
  const { isAuthenticated } = React.useContext(FormContext);

  return (
    <Routes location={location}>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/about" replace /> : <Home />
        }
      />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/installation" element={<Installation />} />
      <Route path="/financing" element={<Financing />} />
      <Route path="/System-Overview" element={<SystemOverview />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/battery-selection" element={<BatterySelection />} />

      <Route path="*" element={<div className="p-10 text-center text-2xl">404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
