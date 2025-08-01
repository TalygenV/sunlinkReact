import React from 'react';
import { Link } from 'react-router-dom';
import { Sun } from 'lucide-react';
import FAQSection from './FAQSection';

const ProductStorage: React.FC = () => {
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
      <section className="overflow-hidden bg-white py-32 h-100 storage-slide relative">
        <div className="mx-auto w-full px-6 lg:px-10 xl:px-20 relative py-10 sm:py-26 xl:py-28">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-1 xl:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-xl">
                <h2 className="mt-2 text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-pretty text-white">
                  Battery Storage Plan
                </h2>
                <p className="mt-6 text-xl text-white">
                  For homeowners with existing solar systems who want<br /> reliable backup power and complete energy independence.
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
            <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight text-balance text-gray-950">
              Why get battery storage?
            </h2>
          </div>
          <div className="max-w-[1300px] mx-auto mt-12 grid grid-cols-1 gap-x-4 gap-y-5 lg:grid-cols-1 md:grid-cols-1">
            <div className="mx-auto flex gap-y-3 bg-gray-900 p-4 w-full rounded-2xl h-[300px] sm:h-[300px] md:h-[600px] lg:h-[650px]">
              {/* Video or image placeholder */}
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-14 lg:py-24">
        <div className="mx-auto w-full px-6">
          <div className="text-xs mx-auto mb-5 uppercase border border-solid w-max py-2 px-6 rounded-md text-orange border-orange">
            <span className="circlebx bg-orange"></span> Everything you need
          </div>
          <h2 className="mx-auto mt-2 max-w-xl text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight text-balance text-gray-950">
            What's included?
          </h2>
          <p className="mx-auto text-center max-w-lg mt-6 text-lg/8 text-gray-700">
            We partner with battery brands such as Tesla, Solar Edge, and FranklinWH to deliver top-of-the-line hardware.
          </p>
          <div className="max-w-[1400px] mx-auto mt-10 grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-2 md:grid-cols-2">
            <div className="flex flex-col gap-y-3 border border-solid rounded-2xl lightgrey">
              <div className="px-8 pt-8 pb-8 sm:px-6 sm:pt-10">
                <Sun className="icon-img w-12 h-12 text-orange" />
                <h4 className="mt-8 text-3xl font-normal tracking-tight text-gray-950">Reliable Power, Day or Night</h4>
                <p className="mt-2 text-xl text-gray-600">
                  A solar battery backup gives you peace of mind by keeping your lights on during unexpected power outages — and saves you money by storing solar energy to use during high-demand, high-rate utility hours. Gain true energy independence while protecting your home from rising costs and grid instability.
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
      <section className="overflow-hidden bg-white py-24 sm:py-48 bg-realchanger relative">
        <div className="mx-auto w-full px-6 lg:px-8 relative">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <div className="text-xs mb-5 uppercase border border-solid w-max py-2 px-6 rounded-md text-white border-white overlayblur">
                  <span className="circlebx bg-white"></span> Power your life
                </div>
                <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-pretty text-white">
                  A real game-changer
                </h2>
                <p className="mt-6 text-xl text-white">
                  Solar with storage helps you reduce your reliance on the utility, enabling you to use more of the power you produce during outages or nighttime hours.* With stored clean energy, you stay powered when you need it most.
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

      <FAQSection title="Battery Storage FAQs" faqs={faqs} />
    </div>
  );
};

export default ProductStorage;