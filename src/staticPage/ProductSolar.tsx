import React from 'react';
import { Link } from 'react-router-dom';
import { Sun } from 'lucide-react';
import FAQSection from './FAQSection';

const ProductSolar: React.FC = () => {
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
      <section className="overflow-hidden bg-white py-32 h-100 solar-slide relative">
        <div className="mx-auto w-full px-6 lg:px-10 xl:px-20 relative py-10 sm:py-26 xl:py-28">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-1 xl:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-xl">
                <h2 className="mt-2 text-4xl md:text-4xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-pretty text-white">
                  Solar <br /> Savings Plan
                </h2>
                <p className="mt-6 text-xl text-white">Built for homeowners ready to experience the benefits of solar energy.</p>
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
              Unlock clean energy for life
            </h2>
          </div>
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 gap-x-4 gap-y-5 lg:grid-cols-3 md:grid-cols-2 mt-10">
            <div className="mx-auto flex flex-col gap-y-3">
              <div className="px-0 pb-8 sm:px-1">
                <img className="rounded-2xl" src="https://images.pexels.com/photos/9875825/pexels-photo-9875825.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" alt="renewable-power" />
                <h4 className="mt-8 text-2xl lg:text-3xl font-medium tracking-tight text-gray-950">Reliable, renewable power</h4>
                <p className="mt-2 text-xl text-gray-600">
                  Solar panels convert sunlight directly into electricity through photovoltaic cells, providing clean energy that reduces your carbon footprint and eliminates dependence on fossil fuels. Your solar installation captures maximum sunlight throughout the day, ensuring consistent power generation for decades to come.
                </p>
              </div>
            </div>
            <div className="mx-auto flex flex-col gap-y-3">
              <div className="px-0 pb-8 sm:px-1">
                <img className="rounded-2xl" src="https://images.pexels.com/photos/9875830/pexels-photo-9875830.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" alt="solar-solution" />
                <h4 className="mt-8 text-2xl lg:text-3xl font-medium tracking-tight text-gray-950">Solar solutions for every home</h4>
                <p className="mt-2 text-xl text-gray-600">
                  We offer several home solar energy plans to help you start your solar journey. Find the ideal fit for your budget and solar energy needs.
                </p>
              </div>
            </div>
            <div className="mx-auto flex flex-col gap-y-3">
              <div className="px-0 pb-8 sm:px-1">
                <img className="rounded-2xl" src="https://images.pexels.com/photos/9875844/pexels-photo-9875844.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" alt="optimal-performance" />
                <h4 className="mt-8 text-2xl lg:text-3xl font-medium tracking-tight text-gray-950">Built for optimal performance</h4>
                <p className="mt-2 text-xl text-gray-600">
                  We partner with the world's best solar suppliers to maximize both energy output and visual appeal. Our precision mounting solutions ensure your panels are positioned for peak efficiency while maintaining the sleek appearance that enhances your home's value and curb appeal for years to come.
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
                <h4 className="mt-8 text-3xl font-normal tracking-tight text-gray-950">Expert installation</h4>
                <p className="mt-2 text-xl text-gray-600">
                  With over 500+ customers and counting, we're the premier installer of home solar and battery systems in America.
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
      <section className="overflow-hidden bg-white py-24 sm:py-48 bg-solarsaving relative">
        <div className="mx-auto w-full px-6 lg:px-8 relative">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <div className="text-xs mb-5 uppercase border border-solid w-max py-2 px-6 rounded-md text-white border-white overlayblur">
                  <span className="circlebx bg-white"></span> Power your life
                </div>
                <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-pretty text-white">
                  Start saving with solar energy
                </h2>
                <p className="mt-6 text-xl text-white">
                  Solar panels convert sunlight into clean electricity for your home, reducing your energy bills and carbon footprint while increasing your property value. With premium Tier 1 panels and professional installation, you get reliable power generation that pays for itself over time.
                </p>
                <ul className="mt-6 text-xl text-white list">
                  <li>The latest in solar energy technology</li>
                  <li>Solar panels built to last</li>
                  <li>Immediate energy savings from day one</li>
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

      <FAQSection title="Solar Panels FAQs" faqs={faqs} />
    </div>
  );
};

export default ProductSolar;