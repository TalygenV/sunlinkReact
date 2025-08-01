import React from 'react';
import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import FAQ from '../components/FAQ';

const About: React.FC = () => {
  const faqItems = [
    {
      id: 1,
      question: "How long do solar panels last?",
      answer: "Solar panels typically last 25 to 30 years or more — but that doesn't mean they stop working after that."
    },
    {
      id: 2,
      question: "What happens if I decide to move?",
      answer: "You can save 50–90% on your electricity bills depending on your system size, usage, and location."
    },
    {
      id: 3,
      question: "How much can I save with solar?",
      answer: "You can save 50–90% on your electricity bills depending on your system size, usage, and location."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-banner about relative isolate px-6 pt-14 lg:px-8 min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg')] bg-cover bg-center opacity-20"></div>
        <div className="mx-auto max-w-3xl py-32 sm:py-24 lg:py-56 relative z-10">
          <div className="text-center">
            <div className="text-xs mx-auto mb-5 uppercase border border-solid w-max py-2 px-6 rounded-md text-white border-white backdrop-blur-sm bg-white/10">
              <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>
              Why Sunlink
            </div>
            <h1 className="text-balance text-4xl md:text-4xl lg:text-5xl xl:text-[80px] font-normal tracking-tight text-white">
              Going solar has never been easier with SunLink
            </h1>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="#"
                className="uppercase bg-white hover:bg-gray-100 py-4 px-5 me-2 mb-2 text-sm font-semibold uppercase font-mono text-gray-900 transition"
              >
                Try Sunlink Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Manufacturers Section */}
      <div className="bg-white pt-14 lg:pt-24">
        <div className="mx-auto w-full px-6 lg:px-8">
          <div className="text-center mb-6 font-mono">
            <h2 className="text-gray-700">MANUFACTURERS WE WORK WITH</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
            {[
              'Tesla', 'Enphase', 'Jinko', 'Franklin',
              'EG4', 'QCell', 'Generac', 'Sol'
            ].map((brand, index) => (
              <div key={index} className="flex items-center justify-center p-4">
                <span className="text-gray-600 font-semibold">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="w-full mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="text-xs mb-5 uppercase border border-solid w-max py-2 px-6 rounded-md text-orange-500 border-orange-500">
            <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            Our story
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
            The solar experience<br />
            needed a reset.<br />
            <span className="text-gray-900">SunLink is bringing it.</span>
          </h1>
          <p className="text-gray-600 text-[20px] leading-relaxed max-w-2xl">
            With an open, transparent, and pressure-free buying process, SunLink empowers homeowners to take control. No overpriced systems, no pushy commissions — just honest, fair solar solutions that connect you directly with vetted installers you can trust.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src="https://images.pexels.com/photos/8852903/pexels-photo-8852903.jpeg"
            alt="Family Solar Experience"
            className="rounded-xl w-full h-auto object-cover shadow-md"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full mx-auto px-6 lg:px-8 bg-gray-900 text-gray-400 flex py-8">
        <div className="max-w-3xl space-y-6 py-8">
          <div className="text-xs mb-5 uppercase border border-solid w-max py-2 px-6 rounded-md text-white border-white backdrop-blur-sm bg-white/10">
            <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>
            OUR MISSION
          </div>
          <h2 className="text-[30px] md:text-[30px] lg:text-[40px] xl:text-[50px] font-semibold fade-in">
            Our mission is simple:
          </h2>
          <p className="text-[24px] md:text-[30px] lg:text-[40px] xl:text-[50px] fade-in">
            To make solar energy accessible to every homeowner without the stress, uncertainty, and inflated costs that come with traditional solar sales.
            <br /><br />
            We believe that choosing solar should be straightforward—a smart financial decision that saves you money from day one.
            <br /><br />
            By removing the barriers that have made solar feel complicated and expensive, we're creating a new standard for how homeowners experience solar energy.
          </p>
        </div>
      </section>

      {/* Traditional vs SunLink Section */}
      <section className="overflow-hidden bg-white py-32 sm:py-24 lg:py-56 bg-gradient-to-r from-gray-900 to-gray-800 relative">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg')] bg-cover bg-center opacity-30"></div>
        <div className="hidden lg:block w-full sm:w-1/1 md:w-1/3 lg:w-1/4 xl:w-1/2"></div>
        <div className="w-full w-3/4 sm:w-full md:w-full lg:w-3/4 xl:w-3/4 2xl:w-1/2 relative p-3 z-10">
          <div className="text-xs mb-5 uppercase border border-solid w-max py-2 px-6 rounded-md text-white border-white backdrop-blur-sm bg-white/10">
            <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>
            How we're different
          </div>
          <h2 className="mt-2 text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-pretty text-white">
            Traditional Solar <br />vs. SunLink
          </h2>
          <div className="flex flex-col sm:flex-row md:flex-row py-8 gap-6">
            <div className="w-full sm:w-1/2 sm:pe-6">
              <div className="bg-red-900/80 backdrop-blur-sm rounded-xl p-6 text-left text-white space-y-4">
                <div className="flex items-center space-x-3 text-white text-lg font-semibold">
                  <span>❌</span>
                </div>
                <h3 className="text-3xl">Traditional Solar</h3>
                <ul className="pl-5 space-y-2 text-[20px]">
                  <li>❌ High-pressure sales tactics</li>
                  <li>❌ Inflated prices to cover sales commissions</li>
                  <li>❌ Limited installer options</li>
                  <li>❌ Pushy follow-up calls</li>
                  <li>❌ Unknown contractor quality</li>
                </ul>
              </div>
            </div>
            <div className="w-full sm:w-1/2 sm:pe-6 relative">
              <div className="absolute -top-4 right-4 bg-green-500 text-white uppercase font-mono text-xs px-3 py-1 rounded-full">
                Modern solar solutions
              </div>
              <div className="bg-green-900/80 backdrop-blur-sm h-full rounded-xl p-6 text-left text-white space-y-4">
                <div className="flex items-center space-x-3 text-white text-lg font-semibold">
                  <span>✅</span>
                </div>
                <h3 className="text-3xl">SunLink</h3>
                <ul className="pl-5 space-y-2 text-[20px]">
                  <li>✅ Get your solar online</li>
                  <li>✅ No sales commissions</li>
                  <li>✅ Carefully vetted installer network</li>
                  <li>✅ No pressure, just transparency</li>
                  <li>✅ Peace of mind from start to finish</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pb-24 pt-20">
        <div className="mx-auto w-full px-6">
          <div className="text-xs mx-auto mb-5 uppercase border border-solid w-max py-2 px-6 rounded-md text-orange-500 border-orange-500">
            <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            Deploy faster
          </div>
          <h2 className="mx-auto mt-2 max-w-xl text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center tracking-tight text-balance text-gray-950">
            Expert installations by certified experts
          </h2>
          <p className="mx-auto text-center max-w-lg mt-6 text-xl text-gray-700">
            Our network of certified installers ensures your solar system is set up correctly, safely, and efficiently—maximizing your energy production from day one.
          </p>

          <div className="max-w-[1400px] mx-auto mt-10 grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-4 md:grid-cols-2">
            {[
              {
                title: "100+ vetted installation partners across the nation",
                description: "Our network consists of certified solar professionals who have been carefully selected and verified through our rigorous vetting process."
              },
              {
                title: "25-year warranty that outlasts competition",
                description: "Your solar investment is protected by industry-leading warranty coverage that includes both equipment and workmanship guarantees."
              },
              {
                title: "Quick setup from design to power generation",
                description: "Once you've designed your system online and completed financing, our verified partners handle all permitting, utility interconnection, and scheduling efficiently."
              },
              {
                title: "Go solar with 0% down payment and flexible terms",
                description: "Build and secure your solar investment without any upfront costs through our partnership with leading solar financing providers."
              }
            ].map((feature, index) => (
              <div key={index} className="mx-auto flex flex-col gap-y-3 border border-solid rounded-2xl bg-gray-50 hover:shadow-lg transition-shadow">
                <div className="px-8 pt-8 pb-8 sm:px-6 sm:pt-10">
                  <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                    <span className="text-orange-500 text-2xl">⚡</span>
                  </div>
                  <h4 className="mt-8 text-[22px] font-medium tracking-tight text-gray-950">
                    {feature.title}
                  </h4>
                  <p className="mt-2 max-w-lg text-xl text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-20 flex items-center justify-center gap-x-6">
          <Link
            to="#"
            className="bg-orange-500 hover:bg-orange-600 py-4 px-5 me-2 mb-2 text-sm font-normal text-white uppercase transition"
          >
            Try Sunlink Now
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <div className="overflow-hidden bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-xs mx-auto mb-5 uppercase border border-solid w-max py-2 px-6 rounded-md text-white border-white backdrop-blur-sm bg-white/10">
            <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>
            How it works
          </div>
          <h2 className="mt-2 text-center max-w-xl mx-auto text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-pretty text-white">
            You're in control from start to finish
          </h2>
          <p className="mt-6 text-lg/8 max-w-lg mx-auto text-center text-gray-300">
            Design your perfect solar system in minutes.
          </p>

          <div className="mx-auto m-auto">
            <div className="lg:max-w-3xl m-auto">
              <div className="relative">
                <div className="absolute left-[10px] top-0 w-px bg-gray-300 z-0 h-full"></div>
                <dl className="relative mt-10 max-w-xl sm:max-w-full space-y-14 text-base/7 text-gray-400 lg:max-w-none pl-16">
                  {[
                    {
                      title: "Enter your address",
                      description: "Simply input your home address and our advanced satellite mapping technology instantly analyzes your roof's solar potential."
                    },
                    {
                      title: "Choose Your Equipment",
                      description: "Browse and select from premium solar panels, inverters, and mounting systems from top manufacturers."
                    },
                    {
                      title: "Design Solar Layout on Your Home",
                      description: "Use our interactive design tool to place panels exactly where you want them on your roof."
                    },
                    {
                      title: "Get Installed by Verified SunLink Install Partners",
                      description: "Once your design is complete and contracts are signed, we connect you with a pre-vetted, licensed installer in your area."
                    }
                  ].map((step, index) => (
                    <div key={index} className="relative pl-8">
                      <dt className="relative font-normal text-2xl text-white">
                        <div className="absolute -left-16 top-2 w-5 h-5 bg-orange-500 rounded-full"></div>
                        {step.title}
                      </dt>
                      <dd className="text-gray-300 mt-4">{step.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <div className="mt-20 flex items-center justify-center gap-x-6">
            <Link
              to="#"
              className="bg-orange-500 hover:bg-orange-600 py-4 px-5 me-2 mb-2 text-sm font-normal text-white uppercase transition"
            >
              Try Sunlink Now
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto w-full px-6">
          <div className="text-xs mx-auto mb-5 uppercase border border-solid w-max py-2 px-6 rounded-md text-orange-500 border-orange-500">
            <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            Testimonials
          </div>
          <h2 className="mx-auto mt-2 max-w-3xl text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center font-semibold tracking-tight text-balance text-gray-950">
            They took control. Here's what happened.
          </h2>
          <p className="mx-auto text-center max-w-3xl mt-6 text-lg/8 text-gray-700">
            1000+ homeowners are already enjoying the benefits of Sunlink.
          </p>
          <div className="xl:container mx-auto mt-10 relative w-full">
            <TestimonialsCarousel />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-5 md:grid-cols-3">
          <div className="mx-auto flex max-w-xs flex-col gap-y-3">
            <dt className="text-base/7 text-gray-600">installations completed</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              <Counter target={500} suffix="+" />
            </dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-3">
            <dt className="text-base/7 text-gray-600">average ratings</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              <Counter target={4.9} />
            </dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-3">
            <dt className="text-base/7 text-gray-600">satisfaction rate</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              <Counter target={98} suffix="%" />
            </dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-3">
            <dt className="text-base/7 text-gray-600">down payment</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              <Counter target={0} prefix="$" />
            </dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-3">
            <dt className="text-base/7 text-gray-600">verified installation partners</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              <Counter target={100} suffix="+" />
            </dd>
          </div>
        </dl>
      </div>

      {/* Ready to See Section */}
      <section className="overflow-hidden bg-white py-24 sm:py-32 bg-gradient-to-r from-gray-900 to-gray-800 relative">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8853477/pexels-photo-8853477.jpeg')] bg-cover bg-center opacity-30"></div>
        <div className="mx-auto w-full px-6 lg:px-8 relative z-10">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <div className="text-xs mb-5 uppercase border border-solid w-max py-2 px-6 rounded-md text-white border-white backdrop-blur-sm bg-white/10">
                  <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>
                  Go solar
                </div>
                <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-pretty text-white">
                  Ready to see the difference?
                </h2>
                <p className="mt-6 text-xl text-white">
                  Going solar should be about saving money on a bill you're already paying—nothing more, nothing less. SunLink makes that possible by removing the obstacles, eliminating the pressure, and connecting you with the right professionals to get the job done right.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20 px-4 md:px-8 lg:px-14">
        <div className="w-full mx-auto">
          <h2 className="font-bold text-black text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-10">FAQs</h2>
          <FAQ items={faqItems} />
          <div className="w-full mx-auto mt-10 pt-12">
            <p className="text-base font-medium text-gray-400 text-center">
              Have a different question?{' '}
              <Link to="/contact" className="text-black underline hover:text-orange-500 transition">
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;