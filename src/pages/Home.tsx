import React from 'react';
import SolarForm from '../components/SolarForm';

const Home = () => {
  return (
    <section className="pt-[100px] py-24 sm:py-48 bg-black-custom relative">
      <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-8 relative">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">

          {/* Left Content */}
          <div className="lg:pt-4 lg:pr-8 sticky top-20 h-screen">
            <div className="lg:max-w-lg">
              <p className="text-sm text-color font-mono">GO SOLAR</p>
              <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-pretty text-color">
                Solar for you, not salesperson
              </h2>
              <p className="mt-6 text-xl text-color">
                Get instant quote and linked to a pre-screened, certified installer who delivers quality results without the high pressure sales tactics.
              </p>
              <ul className="mt-6 text-xl text-white space-y-2 list">
                <li>Competitive pricing with completely transparent quotes and no hidden fees or surprises.</li>
                <li>Receive your solar quote in minutes, not weeks, so you can start saving sooner.</li>
                <li>
                  Licensed, insured, and background-checked installers.{' '}
                  <a href="#" className="underline">
                    Read more
                  </a>
                </li>
              </ul>
              <div className="mt-10 gap-x-6 relative">
                <p className="sm-testimonial py-4 px-5 me-2 mb-2 text-lg text-center text-white">
                  "No pushy sales calls. No surprise fees. Just honest, professional solar solutions tailored to your home."
                </p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:pt-4 lg:pr-8">
            <SolarForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
