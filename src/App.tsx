import React from 'react';
import { getAuth } from "firebase/auth";
import { app } from "../src/firebasedata/firebase";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Installation from './pages/SolarCustomization';
import Financing from './pages/CustomizeSolarSystem';
import FormContext from './context/FormContext';
import Resources from './pages/Resources';
// import Contact from './pages/Contact';
import BatterySelection from './pages/BatterySelection';
import BatterySelectionCustmize from './pages/BatterySelectionCustmize';
import SignInModal from './pages/SignInModal';
const auth = getAuth(app);

function App() {
  const [showSignIn, setShowSignIn] = React.useState(false);
  const { showForm, setShowForm, isAuthenticated, setIsAuthenticated, userData, setUserData, } = React.useContext(FormContext);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  return (
    <Router>
      <Header onSignInClick={() => setShowSignIn(true)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/installation" element={<Installation />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/battery-selection" element={<BatterySelection />} />
          <Route path="/battery-selection-customize" element={<BatterySelectionCustmize />} />
          <Route path="*" element={<div className="p-10 text-center text-2xl">404 - Page Not Found</div>} />

        </Routes>
      </main>
      <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} onSignInSuccess={() => {
        const user = auth.currentUser;
        if (user) {
          setUserData({
            ...userData,
            name: user.displayName || "User",
            phoneNumber: user.phoneNumber || undefined,
            uid: user.uid,
            address: userData.address || "3811%20S%20Viking%20Rd",
          });
        }
        setIsAuthenticated(true);
        setShowSignIn(false);
      }}
      />
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
