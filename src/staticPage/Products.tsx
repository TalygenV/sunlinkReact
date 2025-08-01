import React from 'react';
import { Link } from 'react-router-dom';
import FAQSection from './FAQSection';

const Products: React.FC = () => {
  const faqs = [
    {
      id: 1,
      question: "How long do solar panels last?",
      answer: "Solar panels typically last 25 to 30 years or more — but that doesn't mean they stop working after that."
    },
    {
      id: 2,
      question: "What happens if I decide to move?",
      answer: "If you decide to move, solar can increase your home's value and you have options to transfer or remove it."
    },
    {
      id: 3,
      question: "How much can I save with solar?",
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
      {/* Solar Savings Plan Section */}
      <section className="overflow-hidden bg-white py-32 h-100 product-slide1 relative">
        <div className="mx-auto w-full px-6 lg:px-8 relative py-32 sm:py-48 lg:py-56">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-pretty text-white">
                  Solar Savings Plan
                </h2>
                <p className="mt-6 text-xl text-white">Create your own power with home solar designed just for you.</p>
                <div className="mt-10 gap-x-6">
                  <Link to="/product-solar" className="bg-white py-4 px-5 me-2 mb-2 text-sm font-semibold uppercase font-mono">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solar and Storage Plans Section */}
      <section className="overflow-hidden bg-white py-24 sm:py-32 product-slide2 relative">
        <div className="mx-auto w-full px-6 lg:px-8 relative py-32 sm:py-48 lg:py-56">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-pretty text-white">
                  Solar and Storage Plans
                </h2>
                <p className="mt-6 text-xl text-white">Increase your energy independence with solar and battery backup.</p>
                <div className="mt-10 gap-x-6">
                  <Link to="/product-solar-storage" className="bg-white py-4 px-5 me-2 mb-2 text-sm font-semibold uppercase font-mono">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Storage Only Plans Section */}
      <section className="overflow-hidden bg-white py-24 sm:py-32 product-slide3 relative">
        <div className="mx-auto w-full px-6 lg:px-8 relative py-32 sm:py-48 lg:py-56">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-pretty text-white">
                  Storage Only Plans
                </h2>
                <p className="mt-6 text-xl text-white">Unlock more control over your power with cutting-edge solar energy storage.</p>
                <div className="mt-10 gap-x-6">
                  <Link to="/product-storage" className="bg-white py-4 px-5 me-2 mb-2 text-sm font-semibold uppercase font-mono">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection title="FAQs" faqs={faqs} />
    </div>
  );
};

export default Products;