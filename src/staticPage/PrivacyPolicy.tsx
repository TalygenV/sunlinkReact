import React, { useState } from 'react';

const PrivacyPolicy: React.FC = () => {
  const [activeSection, setActiveSection] = useState('section1');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="overflow-hidden bg-white py-32 h-100 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8853463/pexels-photo-8853463.jpeg')] bg-cover bg-center opacity-30"></div>
        <div className="mx-auto w-full px-6 lg:px-8 relative py-5 sm:py-16 lg:py-16 z-10">
          <div className="mx-auto grid w-full grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-1 xl:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="mt-2 text-5xl lg:text-7xl font-normal tracking-tight text-pretty text-white">
                  Privacy Policy
                </h2>
                <p className="mt-6 text-xl text-white">
                  Our Privacy Policy details how we handle with your info. <br />By using SunLink, you agree to these practices.
                </p>
                <p className="mt-6 text-xl text-white">Last updated: April 16, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-16 pt-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 mx-auto p-6 gap-6">
          {/* Left Sidebar Menu */}
          <nav className="md:col-span-2 lg:col-span-1 lg:sticky top-6 space-y-4">
            {[
              { id: 'section1', title: '1. Information We Collect' },
              { id: 'section2', title: '2. How We Collect Information' },
              { id: 'section3', title: '3. Third-Party Data Sources' },
              { id: 'section4', title: '4. Cookies and Interest-Based Advertising' },
              { id: 'section5', title: '5. How We Use and Disclose the Information We Collect' },
              { id: 'section6', title: '6. Data Security' },
              { id: 'section7', title: '7. Children\'s Privacy' },
              { id: 'section8', title: '8. Contact Us' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block px-4 py-2 text-left w-full rounded transition ${
                  activeSection === item.id
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.title}
              </button>
            ))}
          </nav>

          {/* Right Content Area */}
          <div className="md:col-span-2 lg:col-span-3 space-y-8 text-[20px]">
            <section id="section1" className="bg-white space-y-6 border-b pb-6">
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p className="text-gray-600 text-[20px]">
                We collect information that personally identifies, relates to, describes, or is capable of being associated with you ("Personal Information"), including:
              </p>
              <ul className="list-disc text-gray-600 pl-10 text-[20px] space-y-2">
                <li>Identifiers such as name, signature, social security number, driver's license number, mailing address, garaging address, email addresses, phone numbers, fax numbers, and SunLink Group account credentials;</li>
                <li>Characteristics of protected classifications under California or federal law such as age and gender;</li>
                <li>Other demographic information such as any co-owners or co-tenants of your home, and what languages you speak;</li>
                <li>Commercial information such as payment card or bank account information, your utility company and services your utility company provides;</li>
              </ul>
              
              <h3 className="text-2xl font-bold mb-4">Usage Data and Sites Activity</h3>
              <p className="text-gray-600 text-[20px]">
                We automatically collect information in connection with the actions you take on the Sites ("Usage Data"). For example, each time you use the Sites, we automatically collect the type of web browser you use, the type of device you use, your operating system and version, your IP address, the pages you view, referring and exit pages, the date and time of your visit, and the number of clicks to, from, and within the Sites.
              </p>

              <h3 className="text-2xl font-bold mb-4">Communication Recordings</h3>
              <p className="text-gray-600 text-[20px]">
                We may record calls and retain the content of text messages, chat transcripts, or other written/electronic communications between you and us. By communicating with us, you consent to our recording and retention of communications.
              </p>
            </section>

            <section id="section2" className="mt-0 py-6 bg-white space-y-6 border-b">
              <h2 className="text-2xl font-bold mb-4 uppercase">How We Collect Information</h2>
              <p className="text-gray-600 text-[20px]">
                We may ask you to provide us with Personal Information when you communicate with us online or offline, including events, surveys, and marketing or promotional programs. You are not required to provide us your Personal Information; however, if you choose not to provide the requested information, you may not be able to use some or all of the features of the Sites or Services.
              </p>
            </section>

            <section id="section3" className="py-6 bg-white space-y-6 border-b">
              <h2 className="text-2xl font-bold mb-4 uppercase">Third-Party Data Sources</h2>
              <p className="text-gray-600 text-[20px]">
                We may collect Personal Information from third-party data sources such as marketing agencies, lead generators, other SunLink Group customers, fulfillment and account servicing companies, (including sales and/or installation dealers), equipment manufacturers, credit bureaus and/or reporting agencies, analytics firms, map and/or satellite imagery providers, public records, and government agencies.
              </p>
            </section>

            <section id="section4" className="py-6 bg-white space-y-6 border-b">
              <h2 className="text-2xl font-bold mb-4 uppercase">Cookies and Interest-Based Advertising</h2>
              <p className="text-gray-600 text-[20px]">
                We use cookies (a small text file placed on your computer to identify your computer and browser) and other automated tools such as pixels to track your interaction with our Sites and to improve the experience of the Sites and Services.
              </p>
              
              <h3 className="text-2xl font-bold mb-4">Interest-Based Advertising</h3>
              <p className="text-gray-600 text-[20px]">
                We may work with third-party advertisers, search providers, and ad networks ("Advertisers") to learn more about you and show you ads or other content that we believe would be relevant to you.
              </p>
            </section>

            <section id="section5" className="py-6 bg-white space-y-6 border-b">
              <h2 className="text-2xl font-bold mb-4 uppercase">How We Use and Disclose the Information We Collect</h2>
              <p className="text-gray-600 text-[20px]">We use Personal Information for business purposes, such as:</p>
              <ul className="list-disc text-gray-600 pl-10 text-[20px] space-y-2">
                <li>Account creation, fulfillment, servicing, and customer support</li>
                <li>Marketing and market research</li>
                <li>Collection and credit reporting</li>
                <li>Surveys, promotional events, contests</li>
                <li>Other company communications</li>
                <li>Website use and analytics</li>
              </ul>
            </section>

            <section id="section6" className="py-6 bg-white space-y-6 border-b">
              <h2 className="text-2xl font-bold mb-4 uppercase">Data Security</h2>
              <p className="text-gray-600 text-[20px]">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section id="section7" className="py-6 bg-white space-y-6 border-b">
              <h2 className="text-2xl font-bold mb-4 uppercase">Children's Privacy</h2>
              <p className="text-gray-600 text-[20px]">
                Our services are not intended for children under 13 years of age, and we do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section id="section8" className="py-6 bg-white space-y-6">
              <h2 className="text-2xl font-bold mb-4 uppercase">Contact Us</h2>
              <p className="text-gray-600 text-[20px]">
                If you have any questions about this Privacy Policy, please contact us at info@sunlink.solar
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;