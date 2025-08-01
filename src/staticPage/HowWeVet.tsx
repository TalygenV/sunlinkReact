import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HowWeVet: React.FC = () => {
  const [activePhase, setActivePhase] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const phase1 = document.getElementById('phase1');
      const phase2 = document.getElementById('phase2');
      const phase3 = document.getElementById('phase3');

      if (phase1 && phase2 && phase3) {
        const scrollY = window.scrollY;
        const phase1Top = phase1.offsetTop - 200;
        const phase2Top = phase2.offsetTop - 200;
        const phase3Top = phase3.offsetTop - 200;

        if (scrollY >= phase3Top) {
          setActivePhase(3);
        } else if (scrollY >= phase2Top) {
          setActivePhase(2);
        } else if (scrollY >= phase1Top) {
          setActivePhase(1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPhase = (phaseNumber: number) => {
    const element = document.getElementById(`phase${phaseNumber}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="overflow-hidden bg-white py-32 h-100 bg-gradient-to-br from-green-900 via-green-800 to-teal-900 relative">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8853470/pexels-photo-8853470.jpeg')] bg-cover bg-center opacity-30"></div>
        <div className="mx-auto max-w-4xl py-14 sm:py-14 lg:py-56 relative z-10">
          <div className="text-center">
            <div className="text-xs mx-auto mb-5 uppercase border border-solid w-max py-2 px-6 rounded-md text-white border-white backdrop-blur-sm bg-white/10">
              <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>
              Our partners program
            </div>
            <h1 className="text-balance text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-white">
              Certified SunLink<br />Installation Partner
            </h1>
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="mx-auto px-6 lg:px-8 py-28 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="max-w-[600px]">
          <div className="text-xs mb-5 uppercase border border-solid w-max py-2 px-6 rounded-md text-orange-500 border-orange-500">
            <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            Our certification
          </div>
          <h1 className="text-4xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-6">
            SunLink's Verified <br />Solar Installer<br />Certification
          </h1>
          <p className="text-gray-800 text-[20px] leading-relaxed max-w-2xl py-4">
            Every Sunlink-approved installer operates on a level playing field with fair, transparent pricing, so there's no confusion, no surprises, and no overpriced systems.
          </p>
        </div>
        <div className="flex justify-center max-w-[600px] ml-auto w-full">
          <div className="w-48 h-48 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-6xl font-bold">SL</span>
          </div>
        </div>
      </section>

      {/* Phase Navigation */}
      <div className="relative">
        <div className="z-10 sticky top-20 bg-white max-w-[1600px] mx-auto mt-10 grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 text-center p-4">
          {[1, 2, 3].map((phase) => (
            <div key={phase} className="phase-btn-box">
              <button
                onClick={() => scrollToPhase(phase)}
                className={`relative overflow-hidden block py-3 px-6 rounded-full border transition-all duration-500 w-full ${
                  activePhase === phase
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'border-gray-300 text-gray-700 hover:border-orange-500'
                }`}
              >
                <span className="relative z-10">Phase 0{phase}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Phase Sections */}
        {[
          {
            id: 'phase1',
            title: 'Design your perfect solar system',
            items: ['Choose your equipment', 'Design your solar system', 'Secure financing']
          },
          {
            id: 'phase2',
            title: 'Connect with your verified installer',
            description: "Once your design is complete and contracts are signed, we connect you with a pre-vetted, licensed installer in your area. Our verified partners handle all permits, utility coordination, and professional installation."
          },
          {
            id: 'phase3',
            title: 'Install and power up your home',
            items: [
              'Get access to your SunLink customer portal',
              'Utility, City, HOA approval',
              'Installation of equipment',
              'Final inspections and system activation'
            ]
          }
        ].map((phase, index) => (
          <section
            key={phase.id}
            id={phase.id}
            className="mx-auto px-6 lg:px-8 py-28 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          >
            <div className="max-w-[600px]">
              <h2 className="text-[50px] md:text-4xl lg:text-5xl xl:text-[50px] leading-tight mb-6">
                {phase.title}
              </h2>
              {phase.items ? (
                <ul className="mt-6 text-xl space-y-3 py-4">
                  {phase.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-orange-500 mr-3 mt-1">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[18px] py-4">{phase.description}</p>
              )}
              <div className="mt-4 flex gap-x-1">
                <Link
                  to="#"
                  className="bg-orange-500 hover:bg-orange-600 py-4 px-5 me-2 mb-2 text-sm font-normal text-white uppercase font-mono transition"
                >
                  Try Sunlink Now
                </Link>
              </div>
            </div>
            <div className="flex justify-center bg-gray-100 h-[500px] rounded-2xl max-w-[600px] ml-auto w-full">
              <img
                src={`https://images.pexels.com/photos/885347${index + 5}/pexels-photo-885347${index + 5}.jpeg`}
                alt={`Phase ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </section>
        ))}
      </div>

      {/* Partner Requirements Section */}
      <section className="py-24">
        <div className="mx-auto w-full px-6">
          <div className="text-xs mx-auto mb-5 uppercase border border-solid w-max py-2 px-6 rounded-md text-orange-500 border-orange-500">
            <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            Our Partner Requirements
          </div>
          <h2 className="mx-auto mt-2 max-w-xl text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center tracking-tight text-balance text-gray-950">
            Who installs your solar with SunLink
          </h2>
          <p className="mx-auto text-center max-w-lg mt-6 text-lg/8 text-gray-700">
            Every SunLink project is installed by a carefully vetted partner who meets our quality, safety, and service standards–so you can feel confident your home is in good hands.
          </p>

          <div className="max-w-[1400px] mx-auto mt-10 grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-3 md:grid-cols-2">
            {[
              {
                title: "3+ years Time in Business",
                description: "Demonstrated business stability and longevity in the solar industry."
              },
              {
                title: "4+ star ratings on Google",
                description: "Maintaining excellent customer satisfaction scores that reflect quality workmanship, service, and CX."
              },
              {
                title: "Must be licensed and insured",
                description: "Valid contractor licenses and insurance for your operating regions."
              },
              {
                title: "Must have proof of 500+ solar installations",
                description: "Extensive experience with documented solar project completions."
              },
              {
                title: "Dedicated project management team",
                description: "To oversee installations from start to finish, ensuring proper scheduling, quality control, etc."
              },
              {
                title: "Must be NAPCEB-certified",
                description: "The industry gold standard that validates technical competency and adherence to best practices in solar installation."
              }
            ].map((requirement, index) => (
              <div key={index} className="mx-auto flex flex-col gap-y-3 border border-solid rounded-2xl bg-gray-50 hover:shadow-lg transition-shadow">
                <div className="px-8 pt-8 pb-8 sm:px-6 sm:pt-10">
                  <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                    <span className="text-orange-500 text-2xl">⚡</span>
                  </div>
                  <h4 className="mt-8 text-3xl font-normal tracking-tight text-gray-950">
                    {requirement.title}
                  </h4>
                  <p className="mt-2 max-w-lg text-xl text-gray-600">
                    {requirement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Going Solar Section */}
      <section className="overflow-hidden bg-white py-24 sm:py-32 bg-gradient-to-r from-gray-900 to-gray-800 relative">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8853477/pexels-photo-8853477.jpeg')] bg-cover bg-center opacity-30"></div>
        <div className="mx-auto w-full px-6 lg:px-8 relative z-10">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <div className="text-xs mb-5 uppercase border border-solid w-max py-2 px-6 rounded-md text-white border-white backdrop-blur-sm bg-white/10">
                  <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>
                  Who we are
                </div>
                <h2 className="mt-2 text-6xl sm:text-4xl font-normal tracking-tight text-pretty text-white">
                  Going solar has never been easier
                </h2>
                <p className="mt-6 text-xl text-white">
                  SunLink revolutionizes the solar industry by putting the power back in your hands. Our innovative platform eliminates high-pressure sales tactics and inflated commissions, allowing homeowners to design, customize, and purchase their solar system entirely online – at a fraction of traditional costs.
                </p>
                <div className="mt-10 gap-x-6">
                  <Link
                    to="/about"
                    className="bg-white hover:bg-gray-100 py-4 px-5 me-2 mb-2 text-sm font-semibold uppercase font-mono text-gray-900 transition"
                  >
                    About Sunlink
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Map Section would go here - using USMap component */}
    </div>
  );
};

export default HowWeVet;