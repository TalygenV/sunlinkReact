


import React from 'react';
import { getAuth } from "firebase/auth";
import { app } from "../src/firebasedata/firebase";
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';

import SignUp from './pages/SignUp';

import Installation from './pages/SolarCustomization';
import { FormContext } from './context/FormContext';
import Resources from './pages/Resources';
import BatterySelection from './pages/BatterySelection';

import SignInModal from './pages/SignInModal';
import GlobalSpinner from "./components/GlobalSpinner";
import SystemOverview from './SystemOverview/SystemOverview';
import CompleteDocumentSignModal from './Plan/CompleteDocumentSign';
import Home from './staticPage/Home';
import About from './staticPage/About';
import Contact from './pages/Contact';
import Financing from './staticPage/Financing';
import HowWeVet from './staticPage/HowWeVet';
import PrivacyPolicy from './staticPage/PrivacyPolicy';
import SignIn from './staticPage/SignIn';
import ProductStorage from './staticPage/ProductStorage';
import ProductSolarStorage from './staticPage/ProductSolarStorage';
import ProductSolar from './staticPage/ProductSolar';
import Products from './staticPage/Products';
 

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
          
           <Route path="/singup" element={<SignUp />} />
          <Route path="/installation" element={<Installation />} />
          <Route path="/System-Overview" element={<SystemOverview />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/system-design" element={<BatterySelection />} />
          <Route path="/success-page" element={<CompleteDocumentSignModal />} />
          {/* <Route path="services" element={<Services />} /> */}
          <Route path="/how-we-vet" element={<HowWeVet />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product-solar" element={<ProductSolar />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/product-storage" element={<ProductStorage />} />
          <Route path="/product-solar-storage" element={<ProductSolarStorage />} />
    


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
