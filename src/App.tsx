


import React from 'react';
import { getAuth } from "firebase/auth";
import { app } from "../src/firebasedata/firebase";
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';

import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Installation from './pages/SolarCustomization';
import Financing from './pages/CustomizeSolarSystem';
import { FormContext } from './context/FormContext';
import Resources from './pages/Resources';
import BatterySelection from './pages/BatterySelection';
 
import SignInModal from './pages/SignInModal';
import GlobalSpinner from "./components/GlobalSpinner";
import SystemOverview from './SystemOverview/SystemOverview';

const auth = getAuth(app);

function App() {
  const [showSignIn, setShowSignIn] = React.useState(false);
  const location = useLocation();
  const {
    isAuthenticated,
    setIsAuthenticated,
    userData,
    setUserData,
  } = React.useContext(FormContext);

  return (
    <>
      <GlobalSpinner />
      <Header onSignInClick={() => setShowSignIn(true)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />
          <Route path="/installation" element={<Installation />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/System-Overview" element={<SystemOverview />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/system-design" element={<BatterySelection />} />
         
          <Route path="*" element={<div className="p-10 text-center text-2xl">404 - Page Not Found</div>} />
        </Routes>
      </main>

      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSignInSuccess={() => {
          const user = auth.currentUser;
          if (user) {
            setUserData(userData);
          }
          setIsAuthenticated(true);
          setShowSignIn(false);
        }}
      />
    </>
  );
}

export default App;
