import React from 'react';
import { Link } from 'react-router-dom';
import { Sun } from 'lucide-react';
import FAQSection from './FAQSection';

const ProductSolarStorage: React.FC = () => {
  const faqs = [
    {
      id: 1,
      question: "Will an energy storage system allow me to go off grid?",
      answer: "Solar panels typically last 25 to 30 years or more — but that doesn't mean they stop working after that."
    },
    {
      id: 2,
      question: "How do home solar batteries work?",
      answer: "If you decide to move, solar can increase your home's value and you have options to transfer or remove it."
    },
    {
      id: 3,
      question: "What brands of solar batteries are available?",
      answer: "If you decide to move, solar can increase your home's value and you have options to transfer or remove it."
    },
    {
      id: 4,
      question: "How much can I save with solar?",
      answer: "If you decide to move, solar can increase your home's value and you have options to transfer or remove it."
    },
    {
      id: 5,
      question: "How much can I save with solar?",
      answer: "If you decide to move, solar can increase your home's value and you have options to transfer or remove it."
    },
    {
      id: 6,
      question: "How much can I save with solar?",
      answer: "If you decide to move, solar can increase your home's value and you have options to transfer or remove it."
    },
    {
      id: 7,
      question: "How much can I save with solar?",
      answer: "If you decide to move, solar can increase your home's value and you have options to transfer or remove it."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="overflow-hidden bg-white py-32 h-100 solar-storage-slide relative">
        <div className="mx-auto w-full px-6 lg:px-10 xl:px-20 relative py-10 sm:py-26 xl:py-28">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-1 xl:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-xl">
                <h2 className="mt-2 text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-pretty text-white">
                  Solar and Backup Storage Plan
                </h2>
                <p className="mt-6 text-xl text-white">
                  For homeowners who want to maximize <br /> everything solar power and storage can deliver.
                </p>
                <div className="mt-10 gap-x-6">
                  <Link to="#" className="bg-white py-4 px-5 me-2 mb-2 text-sm uppercase font-mono">
                    Design my system
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="pb-16 pt-16">
        <div className="mx-auto w-full px-6">
          <div className="max-w-[1300px] mx-auto mt-10">
            <h2 className="mt-2 text-4xl md:text-5xl lg:text-5xl xl:text-6xl tracking-tight text-balance text-gray-950">
              Take complete control of <br /> your energy future
            </h2>
          </div>
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 gap-x-4 gap-y-5 lg:grid-cols-3 md:grid-cols-2 mt-10">
            <div className="mx-auto flex flex-col gap-y-3">
              <div className="px-0 pb-8 sm:px-1">
                <img className="rounded-2xl" src="https://images.pexels.com/photos/9875848/pexels-photo-9875848.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" alt="power-outage" />
                <h4 className="mt-8 text-2xl lg:text-3xl font-medium tracking-tight text-gray-950">Power through any outage</h4>
                <p className="mt-2 text-xl text-gray-600">
                  Gain reliable backup power during outages and reduce dependence on the electrical grid. Solar batteries ensure your home stays powered when you need it most, providing peace of mind and protecting your family during emergencies.
                </p>
              </div>
            </div>
            <div className="mx-auto flex flex-col gap-y-3">
              <div className="px-0 pb-8 sm:px-1">
                <img className="rounded-2xl" src="https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" alt="cut-energy-bill" />
                <h4 className="mt-8 text-2xl lg:text-3xl font-medium tracking-tight text-gray-950">Cut your energy bills</h4>
                <p className="mt-2 text-xl text-gray-600">
                  Maximize your solar investment by storing excess energy generated during peak sunlight hours for use during expensive evening peak-rate periods. This helps you avoid high utility costs and creates more predictable monthly energy expenses.
                </p>
              </div>
            </div>
            <div className="mx-auto flex flex-col gap-y-3">
              <div className="px-0 pb-8 sm:px-1">
                <img className="rounded-2xl" src="https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" alt="go-green" />
                <h4 className="mt-8 text-2xl lg:text-3xl font-medium tracking-tight text-gray-950">Go green and stay Independent</h4>
                <p className="mt-2 text-xl text-gray-600">
                  Capture and utilize more of your solar system's clean energy production instead of sending it back to the grid. Battery storage allows you to be more self-sufficient with renewable energy, reducing your carbon footprint while maintaining modern comfort and convenience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-24">
        <div className="mx-auto w-full px-6">
          <div className="text-xs mx-auto mb-5 uppercase border border-solid w-max py-2 px-6 rounded-md text-orange border-orange">
            <span className="circlebx bg-orange"></span> Everything you need
          </div>
          <h2 className="mx-auto mt-2 max-w-xl text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight text-balance text-gray-950">
            What's included?
          </h2>
          <p className="mx-auto text-center max-w-lg mt-6 text-lg/8 text-gray-700">
            We take care of everything from equipment selection to professional installation and ongoing system management.
          </p>
          <div className="max-w-[1400px] mx-auto mt-10 grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-2 md:grid-cols-2">
            <div className="flex flex-col gap-y-3 border border-solid rounded-2xl lightgrey">
              <div className="px-8 pt-8 pb-8 sm:px-6 sm:pt-10">
                <Sun className="icon-img w-12 h-12 text-orange" />
                <h4 className="mt-8 text-3xl font-normal tracking-tight text-gray-950">Tier 1 black-on-black panels</h4>
                <p className="mt-2 text-xl text-gray-600">
                  Tier 1 black-on-black solar panels combine cutting-edge efficiency with a modern, seamless aesthetic that complements any roof. Backed by top-tier warranties and trusted manufacturing, these panels deliver exceptional energy production while blending beautifully with your home's architecture.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-3 border border-solid rounded-2xl lightgrey">
              <div className="px-8 pt-8 pb-8 sm:px-6 sm:pt-10">
                <Sun className="icon-img w-12 h-12 text-orange" />
                <h4 className="mt-8 text-3xl font-normal tracking-tight text-gray-950">Solar Battery Backup</h4>
                <p className="mt-2 text-xl text-gray-600">
                  SunLinks verified installer network provides the top of the line battery backup systems like Tesla, Enphase, Solar Edge, and FranklinWH.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-3 border border-solid rounded-2xl lightgrey">
              <div className="px-8 pt-8 pb-8 sm:px-6 sm:pt-10">
                <Sun className="icon-img w-12 h-12 text-orange" />
                <h4 className="mt-8 text-3xl font-normal tracking-tight text-gray-950">24/7 system monitoring</h4>
                <p className="mt-2 text-xl text-gray-600">
                  Our best-in-class monitoring proactively informs us of possible issues, so your system can operate at its best.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-3 border border-solid rounded-2xl lightgrey">
              <div className="px-8 pt-8 pb-8 sm:px-6 sm:pt-10">
                <Sun className="icon-img w-12 h-12 text-orange" />
                <h4 className="mt-8 text-3xl font-normal tracking-tight text-gray-950">$0 down financing</h4>
                <p className="mt-2 text-xl text-gray-600">
                  Our partnership with solar financing providers such as Sunlight Financial provides financing options with $0 out-of-pocket to make solar accessible to homeowners regardless of their current cash flow situation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="overflow-hidden bg-white py-24 sm:py-48 bg-harness-power relative">
        <div className="mx-auto w-full px-6 lg:px-8 relative">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <div className="text-xs mb-5 uppercase border border-solid w-max py-2 px-6 rounded-md text-white border-white overlayblur">
                  <span className="circlebx bg-white"></span> Power your life
                </div>
                <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-pretty text-white">
                  Harness the power of solar with battery storage
                </h2>
                <p className="mt-6 text-xl text-white">
                  While 95% of US households rely on an outdated power grid to power their homes, Sunlink is here to change that. Solar panels produce electricity when the sun shines, but battery storage captures excess energy for later use. This means you can power your home with your own clean energy during nighttime hours, cloudy days, or power outages, maximizing your energy independence and savings.
                </p>
                <ul className="mt-6 text-xl text-white list">
                  <li>Protect your home against power outages</li>
                  <li>Increase energy independence</li>
                  <li>Get premium hardware and warranties</li>
                </ul>
                <div className="mt-10 gap-x-6">
                  <Link to="#" className="bg-white py-4 px-5 me-2 mb-2 text-sm uppercase font-mono">
                    Design my system
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection title="Solar with Battery Storage FAQs" faqs={faqs} />
    </div>
  );
};

export default ProductSolarStorage;