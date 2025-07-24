import React from 'react';
import { Link } from 'react-router-dom';
import circle from '../assets/images/info-circle_svgrepo.com.svg';
import home from '../assets/images/home-2_svgrepo.com.svg';
import graph from '../assets/images/graph_svgrepo.svg';
import dollar from '../assets/images/badge-dollar.svg';
import sun from '../assets/images/sun-2_svgrepo.svg';
import sunlinkicon from '../assets/images/sunlinkicon.svg';
import gift1 from '../assets/images/gift.svg';

const About = () => {
  return (
    <section className="overflow-hidden py-24 sm:py-48 bg-black-custom relative">
      <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-8 relative">
        <p className="text-center mb-4">
          <img className="mx-auto" src={sunlinkicon} alt="Sunlink" />
        </p>
        <h1 className="text-5xl md:text-5xl font-semibold text-gray-300 text-center mb-8">
          Your Personalized Solar Solution
        </h1>
        <p className="text-center text-lg md:text-base text-gray-300 mb-10">
          Here’s what SunLink recommends.
        </p>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {/* Left Panel */}
          <div className="lg:pt-4 lg:pr-8 custom-formcls_HS p-10 rounded-xl max-w-[700px] ml-auto border border-neutral-700">
            <h3 className="text-gray-300 text-3xl mb-3 flex justify-between">
              Our recommended Setup <img src={sun} alt="Sun" />
            </h3>

            <div className="space-y-2 mb-6 mt-6">
              <div className="flex justify-between text-gray-300 text-xl">
                <span>System Size</span>
                <span className="text-gray-100 text-2xl">6kW</span>
              </div>
              <div className="flex justify-between text-gray-300 text-xl">
                <span>Solar Panels</span>
                <span className="text-gray-100 text-2xl">15 Panels</span>
              </div>
              <div className="flex justify-between text-gray-300 text-xl">
                <span>Annual Production</span>
                <span className="text-gray-100 text-2xl">8,581 kWh</span>
              </div>
            </div>

            {/* Incentives */}
            <div className="custom-midpanel rounded-xl p-10">
              <h3 className="text-xl mb-8 text-center text-white">Available Incentives</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="disclaimer-bg p-3 rounded-2xl border border-neutral-600 sm-boxes custom-bod text-center text-white relative">
                  <p className="opacity-60 text-sm flex justify-center">
                    <img className="mr-2 w-4" src={dollar} alt="Info" />Federal Tax Credit
                  </p>
                  <p className="text-xl text-gray-500">$4,500</p>
                  <p className="opacity-60 text-sm">30% of system cost</p>
                </div>

                <div className="disclaimer-bg p-3 rounded-2xl border border-neutral-600 sm-boxes custom-bod text-center text-white">
                  <p className="opacity-60 text-sm flex justify-center">
                    <img className="mr-2 w-4" src={gift1} alt="Info" />Local Incentives
                  </p>
                  <p className="text-xl text-gray-500">$0.00</p>
                  <p className="opacity-60 text-sm">State & utility rebates</p>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-600 mt-5 py-[15px] px-[10px] text-sm font-normal text-center text-gray-500">
                TOTAL INCENTIVES: $4,500.00
              </div>

              <div className="disclaimer-bg p-3 rounded-2xl border-0 mt-5 sm-boxes text-left text-white text-xs/[18px] font-normal flex items-start">
                <img className="mr-2 mt-1 w-4" src={circle} alt="Info" /> Important: SunLink does not guarantee any incentives. Incentive availability and amounts vary by location, income, and other factors. Please consult with your installer and tax advisor to confirm your eligibility for specific incentives.
              </div>

              <div className="disclaimer-bg p-3 rounded-2xl border-0 mt-5 sm-boxes text-left text-white text-xs/[18px] font-normal flex items-start">
                <img className="mr-2 mt-1 w-4" src={circle} alt="Info" /> Tax Credit Disclaimer: The federal solar tax credit allows you to deduct 30% of the cost of installing a solar energy system from your federal taxes. This credit is available through 2032, then decreases to 26% in 2033 and 22% in 2034. Consult your tax advisor to determine your eligibility.
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:pt-4 lg:pr-8 custom-formcls_right p-10 rounded-xl ml-auto border border-neutral-700">
            <h3 className="text-gray-300 text-3xl mb-3 flex justify-between">
              Without Solar <img src={graph} alt="Graph" />
            </h3>

            <div className="space-y-2 mb-6 mt-6 plain-black-bg p-5 rounded-2xl border-0">
              <div className="text-gray-300 text-xl flex items-center">
                <img className="mr-2" src={home} alt="Home" />
                <span>Current Monthly Bill</span>
              </div>
              <div className="text-gray-300 text-xl">
                <span className="text-gray-100 text-2xl">$350/month</span>
              </div>
            </div>

            <div className="plain-black-bg p-10 rounded-2xl border-0">
              <h3 className="text-xl mb-3 text-center text-white">Rising Utility Costs</h3>
              <div className="bg-neutral-400 p-3 text-center text-white">
                <p className="text-white text-xl text-sm py-12">Graph</p>
              </div>
            </div>

            <div className="space-y-2 mb-6 mt-6 plain-black-bg p-5 rounded-2xl border-0">
              <div className="text-gray-300 text-center text-xl flex justify-center">
                <img className="mr-3" src={graph} alt="Graph" />
                30-Year Projected Spending
              </div>
              <div className="text-gray-100 text-center text-3xl">$76,138</div>
              <div className="text-gray-300 text-center text-lg">
                Based on 3% annual rate increases
              </div>
            </div>

            <div className="mb-6 mt-6 plain-black-bg p-5 rounded-2xl border-0 font-normal flex items-start text-white">
              <img className="mr-4 mt-1 w-4" src={circle} alt="Info" />
              <div className="text-xs/[18px]">
                <span className="text-lg block">Rising Utility Rates</span>
                Utility rates increase every year. Lock in your energy costs with solar and avoid these rising expenses.
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-10 text-center">
          <Link to="/financing" className="orangegradbtn rounded-xl py-4 px-5 mb-2 text-lg font-normal text-white">
            Customise my solar system
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
