import React from 'react';
import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import FAQ from '../components/FAQ';
import USMap from '../components/USMap';

const Home: React.FC = () => {
  const faqItems = [
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
      answer: "You can save 50–90% on your electricity bills depending on your system size, usage, and location."
    },
    {
      id: 4,
      question: "Do I need to maintain my solar panels?",
      answer: "Solar panels require minimal maintenance. Occasional cleaning and professional inspections are recommended."
    },
    {
      id: 5,
      question: "What happens during a power outage?",
      answer: "With battery backup, your solar system can continue powering your home during outages."
    },
    {
      id: 6,
      question: "How quickly can my system be installed?",
      answer: "Most systems are installed and activated within one day after all permits are approved."
    },
    {
      id: 7,
      question: "What financing options are available?",
      answer: "We offer $0 down financing options with competitive rates and flexible terms."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-banner relative isolate px-6 pt-14 lg:px-8 overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0  bg-cover bg-center opacity-20"></div>
        <div className="mx-auto max-w-4xl py-32 sm:py-24 lg:py-56 relative z-10">
          <div className="text-center">
            <div className="text-xs mx-auto mb-5 uppercase border border-solid w-auto sm:w-max lg:w-max py-2 px-6 rounded-md text-white border-white backdrop-blur-sm bg-white/10 whitespace-normal sm:whitespace-nowrap">
              <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>
              Sunlink: America's #1 trusted solar partner
            </div>
            <h1 className="text-balance text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-white">
              America's #1 solar platform for customers, not sales people
            </h1>
            <p className="mt-8 text-pretty text-sm font-medium text-gray-100 uppercase space-y-2 sm:space-y-0 sm:space-x-4">
              <span className="block sm:inline">helped 1000+ clients save money</span>
              <span className="block sm:inline">100+ verified install partners</span>
              <span className="block sm:inline">98% satisfaction rate</span>
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/singup"
                className="uppercase bg-white hover:bg-gray-100 py-4 px-5 me-2 mb-2 text-sm font-semibold text-gray-900 transition"
              >
                Try Sunlink Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white py-24 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-6 font-mono">
            <h2 className="text-gray-700">SUNLINK IN NUMBERS</h2>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div className="mx-auto flex max-w-xs flex-col gap-y-3">
              <dt className="text-base/7 text-gray-600">installations completed</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl text-center lg:text-left">
                <Counter target={500} suffix="+" />
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-3">
              <dt className="text-base/7 text-gray-600">average ratings</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl text-center lg:text-left">
                <Counter target={4.9} />
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-3">
              <dt className="text-base/7 text-gray-600">satisfaction rate</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl text-center lg:text-left">
                <Counter target={98} suffix="%" />
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-3">
              <dt className="text-base/7 text-gray-600">down payment</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl text-center lg:text-left">
                <Counter target={0} prefix="$" />
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-3">
              <dt className="text-base/7 text-gray-600">verified installation partners</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl text-center lg:text-left">
                <Counter target={100} suffix="+" />
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Who We Are Section */}
      <section className="overflow-hidden bg-white py-24 bg-wrapimg">
        <div className="absolute inset-0  bg-cover bg-center opacity-30"></div>
        <div className="mx-auto w-full px-6 lg:px-8 relative z-10">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <div className="text-xs mb-5 uppercase border border-solid w-max py-2 px-6 rounded-md text-white border-white backdrop-blur-sm bg-white/10">
                  <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>
                  Who we are
                </div>
                <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-pretty text-white">
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

      {/* Product Preview Section */}
      <section className="overflow-hidden bg-white py-24 pb-0 sm:pt-10 sm:pb-0 lg:py-20">
        <div className="mx-auto w-full px-5 lg:px-7">
          <div className="mx-auto">
            <div className="w-full">
              <div className="lg:max-w-4xl">
                <h2 className="mt-2 max-w-7xl text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight text-pretty text-gray-900">
                  Solar installation, simplified. Sunlink is all you need.
                </h2>
                <p className="mt-6 text-lg/8 text-gray-700">
                  Create your custom solar setup in minutes with our advanced design tool.
                  <br />
                  Get instant cost estimates and see your savings in real-time.
                </p>
              </div>
              <div className="mt-4 w-full">
                <img
                  src="https://images.pexels.com/photos/8853477/pexels-photo-8853477.jpeg"
                  alt="Solar design interface"
                  className="w-full rounded-xl shadow-lg"
                />
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
                icon: "https://images.pexels.com/photos/8853465/pexels-photo-8853465.jpeg",
                title: "100+ vetted installation partners across the nation",
                description: "Our network consists of certified solar professionals who have been carefully selected and verified through our rigorous vetting process."
              },
              {
                icon: "https://images.pexels.com/photos/8853464/pexels-photo-8853464.jpeg",
                title: "25-year warranty that outlasts competition",
                description: "Your solar investment is protected by industry-leading warranty coverage that includes both equipment and workmanship guarantees."
              },
              {
                icon: "https://images.pexels.com/photos/8853463/pexels-photo-8853463.jpeg",
                title: "Quick setup from design to power generation",
                description: "Once you've designed your system online and completed financing, our verified partners handle all permitting and professional installation."
              },
              {
                icon: "https://images.pexels.com/photos/8853462/pexels-photo-8853462.jpeg",
                title: "Go solar with 0% down payment and flexible terms",
                description: "Build and secure your solar investment without any upfront costs through our partnership with leading solar financing providers."
              }
            ].map((feature, index) => (
              <div key={index} className="mx-auto flex flex-col gap-y-3 border border-solid rounded-2xl bg-gray-50 hover:shadow-lg transition-shadow">
                <div className="px-8 pt-8 pb-8 sm:px-6 sm:pt-10">
                  <img className="w-16 h-16 object-cover rounded-lg mb-6" src={feature.icon} alt="feature" />
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
            to="/singup"
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
                      description: "Once your design is complete, we connect you with a pre-vetted, licensed installer in your area."
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

      {/* Pricing Section */}
      <section className="overflow-hidden bg-white py-24 sm:py-64 bg-gradient-to-l from-gray-900 to-gray-800 relative">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8853477/pexels-photo-8853477.jpeg')] bg-cover bg-center opacity-30"></div>
        <div className="mx-auto w-full px-6 lg:px-8 relative z-10">
          <div className="flex justify-end">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <div className="text-xs mb-5 uppercase border border-solid w-max py-2 px-6 rounded-md text-white border-white backdrop-blur-sm bg-white/10">
                  <span className="inline-block w-2 h-2 bg-white rounded-full mr-2"></span>
                  Our Pricing
                </div>
                <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-pretty text-white">
                  No sales team, just quality installations
                </h2>
                <p className="mt-6 text-xl text-white">
                  Solar isn't small medium or large, it's customized directly for you and your home. Use our advanced tool and unlock your solar potential.
                </p>
                <div className="mt-10 gap-x-6">
                  <Link
                    to="/contact"
                    className="bg-white hover:bg-gray-100 py-4 px-5 me-2 mb-2 text-sm font-semibold uppercase text-gray-900 transition"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design System Section */}
      <section className="overflow-hidden bg-gray-900 py-16 px-4 md:px-4 lg:px-4 xl:px-14">
        <div className="mx-auto max-w-8xl px-6 lg:px-8 md:px-2">
          <div className="grid grid-cols-1 xl:grid-cols-[0.8fr_1.5fr] lg:grid-cols-[1fr_1fr] gap-8 items-center">
            <div className="lg:pt-4 lg:pr-8">
              <div className="text-xs mb-5 bg-gray-700 uppercase border border-solid w-max py-2 px-6 rounded-md text-gray-300 border-white backdrop-blur-sm bg-white/10">
                <span className="inline-block w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                Step 1 of 6
              </div>
              <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-pretty text-white">
                Design Your Solar System
              </h2>
              <form className="space-y-6 mt-8">
                <div className="mb-8 relative">
                  <label className="block text-base font-medium text-gray-400">Enter your address</label>
                  <div className="relative mt-2">
                    <input
                      type="text"
                      placeholder="E.g. 123 Main Street"
                      className="w-full pl-4 pr-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    />
                  </div>
                </div>
                <div className="mb-8 relative">
                  <label className="block text-base font-medium text-gray-400">Average electric bill</label>
                  <div className="relative mt-2">
                    <input
                      type="text"
                      placeholder="E.g. 150"
                      className="w-full pl-4 pr-12 py-2 border rounded focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    />
                    <div className="absolute inset-y-0 right-0 text-center w-[50px] flex items-center pointer-events-none text-base text-gray-400">
                      /mo
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="bg-white hover:bg-gray-100 py-4 px-5 me-2 mb-2 text-sm font-normal uppercase font-mono text-gray-900 transition"
                  >
                    Next Step
                  </button>
                </div>
              </form>
            </div>
            <div className="h-auto">
              <img
                className="w-auto rounded-xl shadow-lg"
                src="https://images.pexels.com/photos/8853477/pexels-photo-8853477.jpeg"
                alt="Solar design system"
              />
            </div>
          </div>
        </div>
      </section>

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

      {/* FAQ Section */}
      <section className="bg-gray-900 py-20 px-4 md:px-8 lg:px-14">
        <div className="w-full mx-auto">
          <h2 className="font-bold text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-10">FAQs</h2>
          <FAQ items={faqItems} isDark={true} />
          <div className="w-full mx-auto mt-10 pt-12">
            <p className="text-base font-medium text-gray-400 text-center">
              Have a different question?{' '}
              <Link to="/contact" className="text-gray-100 underline hover:text-orange-500 transition">
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Coverage Map Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto w-full px-6">
          <div className="text-xs mx-auto mb-5 uppercase border border-solid w-max py-2 px-6 rounded-md text-orange-500 border-orange-500">
            <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            Our coverage
          </div>
          <h2 className="mx-auto mt-2 max-w-3xl text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center tracking-tight text-balance text-gray-950">
            We're available nationwide and quickly expanding
          </h2>
          <p className="mx-auto text-center max-w-3xl mt-6 text-lg/8 text-gray-700">
            Verified partners delivering global coverage you can trust.{' '}
            <Link to="/how-we-vet" className="underline hover:text-orange-500 transition">
              See how we choose our installation partners to be on our platform
            </Link>
            .
          </p>
          <USMap />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 sm:pb-32 pt-0" id="contactinfo">
        <div className="mx-auto w-full px-6">
          <h2 className="mx-auto mt-2 max-w-6xl w-full text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight text-balance text-gray-950">
            Don't see your state here?<br />No need to worry.
          </h2>
          <p className="mx-auto text-center max-w-3xl mt-6 text-lg/8 text-gray-700">
            Fill out your information and we'll link you to our verified install partner.
          </p>
          <div className="xl:container mx-auto mt-10">
            <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] lg:grid-cols-[1.8fr_1.5fr] gap-8">
              <div className="contactform py-10 px-5 lg:px-10 bg-gray-50 rounded-2xl">
                <h4 className="text-2xl mb-2">Send us a message</h4>
                <p>Fill out your information via this form and we'll get in contact with you.</p>
                <form className="space-y-6 mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-base font-normal text-gray-700">Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Brandon"
                        className="mt-1 w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-base font-medium text-gray-700">Contact number</label>
                      <input
                        type="tel"
                        placeholder="e.g. (555) 555-5555"
                        className="mt-1 w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-700">Email address</label>
                    <input
                      type="email"
                      placeholder="e.g. brandon@sunlink-app.com"
                      className="mt-1 w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-base font-medium text-gray-700">Country</label>
                      <select className="mt-1 w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500 text-gray-500" required>
                        <option value="" disabled selected hidden>Select</option>
                        <option value="us">United States</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-base font-medium text-gray-700">State</label>
                      <select className="mt-1 w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500 text-gray-500" required>
                        <option value="" disabled selected hidden>Select</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-base font-medium text-gray-700">City</label>
                      <select className="mt-1 w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500 text-gray-500" required>
                        <option value="" disabled selected hidden>Select</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      By logging into my account, I agree to{' '}
                      <Link to="/terms" className="underline hover:text-orange-500 transition">
                        SunLink's Terms of Use
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy-policy" className="underline hover:text-orange-500 transition">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="bg-gray-900 text-white py-2 px-4 hover:bg-gray-700 transition font-mono uppercase"
                    >
                      Submit Form
                    </button>
                  </div>
                </form>
              </div>
              <div className="contactform py-10 px-6 lg:px-10 bg-gray-900 text-gray-100 rounded-2xl flex items-end">
                <div className="flex justify-between w-full h-auto">
                  <div className="ms-3">
                    <h3 className="text-xl font-normal text-gray-100 mb-2">Prefer to email?</h3>
                    <p className="text-xl text-gray-400">info@sunlink.solar</p>
                  </div>
                  <div className="">
                    <span className="text-4xl">→</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;