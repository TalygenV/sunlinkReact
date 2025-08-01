import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';
import sinIn from '../assets/images/signin-bx.jpg'

const SignIn: React.FC = () => {
  const [useEmail, setUseEmail] = useState(false);

  return (
    <div className="bg-white">
      <section className="overflow-hidden py-4 px-4 md:px-1 lg:px-4">
        <form action="#" method="POST" className="formlayout mt-4 mb-4 relative">
          <div className="mx-auto max-w-8xl lg:px-4 md:px-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr] lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_0.9fr] gap-8 items-center">
              
              {/* Left Column */}
              <div className="lg:pt-4 lg:pr-8 w-full md:w-full lg:max-w-md">
                <img src="/api/placeholder/150/50" alt="logo-orange"/>
                <h2 className="mt-6 mb-2 text-4xl sm:text-4xl md:text-4xl lg:text-6xl font-normal tracking-tight text-pretty">
                  Welcome back
                </h2>
                
                {/* Form Container */}
                <div className="relative h-[320px] sm:h-[300px] md:h-[340px] overflow-hidden">
                  
                  {/* Phone Input */}
                  {!useEmail && (
                    <div className="absolute inset-0 transition-all duration-500 ease-out">
                      <p className="text-gray-700">Enter your phone number to sign in</p>
                      <div className="relative mt-4">
                        <div className="absolute inset-y-0 left-0 w-[50px] flex items-center pointer-events-none">
                          <Phone className="w-6 h-6 mx-auto text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          placeholder="(555) 555-5555"
                          className="mt-1 w-full pl-11 pr-4 py-2 border rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange"
                          required
                        />
                      </div>
                      
                      <div className="mb-8 mt-8">
                        <button 
                          type="button"
                          className="bg-orange hover:bg-orange py-4 px-5 me-2 mb-2 text-sm font-normal text-white uppercase transition-colors"
                        >
                          Send code
                        </button>
                      </div>
                      
                      <p className="text-gray-500 text-sm mb-2 mt-2">
                        By logging into my account, I agree to{' '}
                        <Link to="/terms-of-service" className="text-gray-900 underline">SunLink's Terms of Use</Link>{' '}
                        and <Link to="/privacy-policy" className="text-gray-900 underline">Privacy Policy</Link>
                      </p>
                      <p className="text-gray-500 text-sm mt-0">
                        Click here to{' '}
                        <button 
                          type="button"
                          onClick={() => setUseEmail(true)}
                          className="text-gray-900 underline hover:text-orange transition-colors"
                        >
                          sign in with email
                        </button>
                      </p>
                    </div>
                  )}

                  {/* Email Input */}
                  {useEmail && (
                    <div className="absolute inset-0 transition-all duration-500 ease-out">
                      <p className="text-gray-700">Enter your email address to sign in</p>
                      <div className="relative mt-4">
                        <div className="absolute inset-y-0 left-0 w-[50px] flex items-center pointer-events-none">
                          <Mail className="w-6 h-6 mx-auto text-gray-400" />
                        </div>
                        <input
                          type="email"
                          placeholder="brandon@sunlink-app.com"
                          className="mt-1 w-full pl-11 pr-4 py-2 border rounded placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange"
                          required
                        />
                      </div>
                      
                      <div className="mb-8 mt-8">
                        <button 
                          type="button"
                          className="bg-orange hover:bg-orange py-4 px-5 me-2 mb-2 text-sm font-normal text-white uppercase transition-colors"
                        >
                          Send code
                        </button>
                      </div>
                      
                      <p className="text-gray-500 text-sm mb-2 mt-2">
                        By logging into my account, I agree to{' '}
                        <Link to="/terms-of-service" target="_blank" className="text-gray-900 underline">SunLink's Terms of Use</Link>{' '}
                        and <Link to="/privacy-policy" target="_blank" className="text-gray-900 underline">Privacy Policy</Link>
                      </p>
                      <p className="text-gray-500 text-sm mt-0">
                        Click here to{' '}
                        <button 
                          type="button"
                          onClick={() => setUseEmail(false)}
                          className="text-gray-900 underline hover:text-orange transition-colors"
                        >
                          sign in with phone
                        </button>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="imgbx h-auto sm:h-auto pt-20 lg:pt-0 flex justify-end relative w-full md:w-full md:max-w-full lg:max-w-[700px] ml-auto">
                
                {/* Toggle Arrows */}
                <div className="absolute top-0 left-0 xs:-left-28 sm:-left-0 sm:top-0 sm:bottom-auto md:-left-0 md:bottom-auto md:top-0 lg:-left-28 lg:bottom-0 lg:top-auto flex items-center gap-2 slidebutton">
                  <button
                    type="button"
                    onClick={() => setUseEmail(false)}
                    className={`transition duration-300 p-2 rounded-full ${
                      !useEmail ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseEmail(true)}
                    className={`transition duration-300 p-2 rounded-full ${
                      useEmail ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                <img 
                  className="w-full rounded-xl" 
                  src={sinIn} 
                  alt="design-system"
                />

                <div className="testimonialbx absolute bottom-10 p-4 text-white bg-white/10 backdrop-blur-[21px] rounded-2xl">
                  <p className="text-[16px] md:text-[18px] lg:text-[25px] text-white">
                    "Working with SunLink was a positive experience. They're very knowledgeable about residential solar and helped us design a system that is large enough to handle our current electric needs and ready for our future plans."
                  </p>
                  <p className="text-base text-white mt-2">
                    Chuck M., <span className="text-gray-300">Verified Customer</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default SignIn;