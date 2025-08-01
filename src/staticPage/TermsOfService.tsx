import React, { useState, useEffect } from 'react';

import Footer from '../components/Footer';

const TermsOfService: React.FC = () => {
  const [activeSection, setActiveSection] = useState('section1');

  const sections = [
    { id: 'section1', title: '1. Applicability' },
    { id: 'section2', title: '2. General Provisions' },
    { id: 'section3', title: '3. Information Provided On the Site or Through the Services' },
    { id: 'section4', title: '4. Use of the Site and Services' },
    { id: 'section5', title: '5. Third Party Sites' },
    { id: 'section6', title: '6. Billing' },
    { id: 'section7', title: '7. Digital Millennium Copyright Act Notice' },
    { id: 'section8', title: '8. Disputes; Governing Law; Jurisdiction' },
    { id: 'section9', title: '9. Disclaimer and Limitation of Liability' },
    { id: 'section10', title: '10. Indemnity' },
    { id: 'section11', title: '11. Termination' },
    { id: 'section12', title: '12. Notices, Questions, and Customer Service' },
    { id: 'section13', title: '13. Miscellaneous' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white"> 
      {/* Hero Section */}
      <section className="overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 py-32 h-100 relative">
        <div className="mx-auto w-full px-6 lg:px-8 relative py-5 sm:py-16 lg:py-16">
          <div className="mx-auto grid w-full grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-1 xl:grid-cols-2">
            <div className="lg:pt-4 lg:pr-8">
              <div className="lg:max-w-lg">
                <h2 className="mt-2 text-5xl lg:text-7xl font-normal tracking-tight text-pretty text-white">
                  Terms of Service
                </h2>
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
          <nav className="md:col-span-2 lg:col-span-1 lg:sticky top-6 space-y-2 h-fit">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                  activeSection === section.id
                    ? 'bg-orange text-white font-medium'
                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange'
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>

          {/* Right Content Area */}
          <div className="md:col-span-2 lg:col-span-3 space-y-8 text-[20px] leading-relaxed">
            
            <section id="section1" className="py-6 bg-white space-y-6 border-b">
              <h2 className="text-2xl font-bold mb-4 uppercase text-gray-900">1. APPLICABILITY</h2>
              <p className="text-gray-600">
                These Terms of Use apply to all websites, including social media properties, and mobile applications that are owned, operated, and maintained by or for SunLink Corporation and its affiliates (collectively, "SunLink," "we," or "our") and upon which these Terms of Use are linked, including www.sunlink-app.com ("Site"). SunLink is a XXX.
              </p>
              <p className="text-gray-600">
                SunLink is a leading solar energy and storage service provider that provides clean, affordable, and reliable energy (the products and associated operations, referred to collectively herein as "Services").
              </p>
              <p className="text-gray-600">
                If you are located in the European Economic Area (EEA), Switzerland, or the United Kingdom, these Terms of Use are between you and SunLink a company subject to the laws of Amsterdam with a registration number of 7353308 and SunLink a company subject to the laws of Germany with a registration number of 72/2023P.
              </p>
            </section>

            <section id="section2" className="py-6 bg-white space-y-6 border-b">
              <h2 className="text-2xl font-bold mb-4 uppercase text-gray-900">2. GENERAL PROVISIONS</h2>
              <p className="text-gray-600">
                These terms of use, together with the Privacy Policy and any supplemental terms, conditions, or rules posted to the site or otherwise made available in connection with the services (collectively, "terms"), set forth the legally binding terms governing your use of the site and services. By accessing or using the site or services, you agree to be bound by these terms and all applicable laws.
              </p>
              <p className="text-gray-600">
                The Site and Services are intended for use only by citizens and legal permanent residents of the United States of America or EEA, United Kingdom or Switzerland residing within the United States of America (including its territories) or EEA, United Kingdom or Switzerland 18 years of age or older.
              </p>
            </section>

            <section id="section3" className="py-6 bg-white space-y-6 border-b">
              <h2 className="text-2xl font-bold mb-4 uppercase text-gray-900">3. Information Provided On the Site or Through the Services</h2>
              <p className="text-gray-600">
                <strong>A. Content.</strong> The Site provides you with information about our Services. All this information and any other information we provide to you through the Site is referred to herein as "Content." Although we and all parties involved in creating, producing, or delivering Content make all reasonable efforts to ensure that it is correct and up to date, we cannot guarantee 100% accuracy.
              </p>
              <p className="text-gray-600">
                <strong>B. Ownership.</strong> All copyrights, trademarks, trade dress, other intellectual property and materials, including images, text, illustrations, formats, logos, designs, icons, photographs, programs, music clips, video clips and written and other materials on our Site or part of the Services are owned, controlled or licensed by SunLink and are protected by U.S. and international trademark, copyright or other intellectual property laws.
              </p>
            </section>

            <section id="section4" className="py-6 bg-white space-y-6 border-b">
              <h2 className="text-2xl font-bold mb-4 uppercase text-gray-900">4. Use of the Site and Services</h2>
              <p className="text-gray-600">
                <strong>A. User Content Submission; Termination of Access.</strong> The Site may let you submit material to us or to third parties: for example, you may be able to upload a photo, send us messages, or post a review about our Services. In these Terms, we use "Submissions" to refer to any material of any kind that you submit to us or third parties through the Site.
              </p>
              <p className="text-gray-600">
                We are not responsible for the content of Submissions provided by you or any other user. We do not endorse any opinion contained in such material. We make no warranties or representations, express or implied, about Submissions, including as to their legality or accuracy.
              </p>
            </section>

            <section id="section5" className="py-6 bg-white space-y-6 border-b">
              <h2 className="text-2xl font-bold mb-4 uppercase text-gray-900">5. THIRD PARTY SITES</h2>
              <p className="text-gray-600">
                This Site may contain links to or be accessed through links that are owned and operated by independent third parties to which these Terms do not apply. We provide links as a convenience and the inclusion of the link does not imply that SunLink endorses or accepts any responsibility for the content on those sites.
              </p>
            </section>

            <section id="section6" className="py-6 bg-white space-y-6 border-b">
              <h2 className="text-2xl font-bold mb-4 uppercase text-gray-900">6. BILLING</h2>
              <p className="text-gray-600">
                All billing information provided by you must be truthful and accurate. YOU REPRESENT AND WARRANT THAT YOU HAVE THE LEGAL RIGHT TO USE ANY CREDIT CARD(S) OR OTHER PAYMENT METHOD(S) UTILIZED IN CONNECTION WITH ANY PAYMENTS. By submitting such information, you grant to SunLink the right to provide such information to third parties for purposes of facilitating the completion of payments initiated by you or on your behalf.
              </p>
            </section>

            <section id="section7" className="py-6 bg-white space-y-6 border-b">
              <h2 className="text-2xl font-bold mb-4 uppercase text-gray-900">7. DIGITAL MILLENNIUM COPYRIGHT ACT NOTICE</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis metus accumsan, venenatis purus ut, eleifend nunc. Ut sit amet malesuada velit. Praesent nec vulputate ex, vel congue libero. Donec nulla quam, facilisis a sem a, venenatis tempor sem.
              </p>
            </section>

            <section id="section8" className="py-6 bg-white space-y-6 border-b">
              <h2 className="text-2xl font-bold mb-4 uppercase text-gray-900">8. DISPUTES; GOVERNING LAW; JURISDICTION</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis metus accumsan, venenatis purus ut, eleifend nunc. Ut sit amet malesuada velit. Praesent nec vulputate ex, vel congue libero.
              </p>
            </section>

            <section id="section9" className="py-6 bg-white space-y-6 border-b">
              <h2 className="text-2xl font-bold mb-4 uppercase text-gray-900">9. DISCLAIMER AND LIMITATION OF LIABILITY</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis metus accumsan, venenatis purus ut, eleifend nunc. Ut sit amet malesuada velit. Praesent nec vulputate ex, vel congue libero.
              </p>
            </section>

            <section id="section10" className="py-6 bg-white space-y-6 border-b">
              <h2 className="text-2xl font-bold mb-4 uppercase text-gray-900">10. INDEMNITY</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis metus accumsan, venenatis purus ut, eleifend nunc. Ut sit amet malesuada velit.
              </p>
            </section>

            <section id="section11" className="py-6 bg-white space-y-6 border-b">
              <h2 className="text-2xl font-bold mb-4 uppercase text-gray-900">11. TERMINATION</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis metus accumsan, venenatis purus ut, eleifend nunc. Ut sit amet malesuada velit.
              </p>
            </section>

            <section id="section12" className="py-6 bg-white space-y-6 border-b">
              <h2 className="text-2xl font-bold mb-4 uppercase text-gray-900">12. NOTICES, QUESTIONS, AND CUSTOMER SERVICE</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis metus accumsan, venenatis purus ut, eleifend nunc. Ut sit amet malesuada velit.
              </p>
            </section>

            <section id="section13" className="py-6 bg-white space-y-6 border-b">
              <h2 className="text-2xl font-bold mb-4 uppercase text-gray-900">13. MISCELLANEOUS</h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis metus accumsan, venenatis purus ut, eleifend nunc. Ut sit amet malesuada velit.
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService;