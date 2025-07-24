import React from 'react';
import { CheckCircle, Calendar, Home, Wrench } from 'lucide-react';

const Installation = () => {
  const steps = [
    {
      icon: Calendar,
      title: "Initial Consultation",
      description: "We assess your home's solar potential and energy needs"
    },
    {
      icon: Home,
      title: "Site Survey",
      description: "Professional evaluation of your roof and electrical system"
    },
    {
      icon: CheckCircle,
      title: "Permit & Approval",
      description: "We handle all permits and utility interconnection paperwork"
    },
    {
      icon: Wrench,
      title: "Installation",
      description: "Certified installers complete your system in 1-3 days"
    }
  ];

  return (
    <main className="bg-gray-900 text-white min-h-screen pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Solar Installation Process</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From initial consultation to system activation, we make going solar simple and stress-free
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-10 h-10 text-white" />
              </div>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Why Choose Our Installation Team?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Licensed & Insured</h4>
                  <p className="text-gray-300">All installers are fully licensed, insured, and bonded</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Expert Installation</h4>
                  <p className="text-gray-300">Years of experience with thousands of successful installations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Quality Guarantee</h4>
                  <p className="text-gray-300">Comprehensive workmanship warranty on all installations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Local Support</h4>
                  <p className="text-gray-300">Local teams provide ongoing maintenance and support</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Installation Timeline</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold">Day 1: Preparation</h4>
                <p className="text-gray-300 text-sm">Equipment delivery and site preparation</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold">Day 2-3: Installation</h4>
                <p className="text-gray-300 text-sm">Panel mounting and electrical connections</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold">Day 4: Inspection</h4>
                <p className="text-gray-300 text-sm">Final inspection and system testing</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold">Day 5+: Activation</h4>
                <p className="text-gray-300 text-sm">Utility interconnection and system activation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Installation;