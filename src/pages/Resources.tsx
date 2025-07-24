import React from 'react';

import { FileText, HelpCircle, BookOpen, Download } from 'lucide-react';

const Resources = () => {
  const resources = [
    {
      icon: FileText,
      title: "Solar Savings Calculator",
      description: "Calculate your potential savings with our interactive tool",
      link: "#"
    },
    {
      icon: BookOpen,
      title: "Solar Installation Guide",
      description: "Complete guide to the solar installation process",
      link: "#"
    },
    {
      icon: Download,
      title: "Maintenance Checklist",
      description: "Keep your solar system running at peak performance",
      link: "#"
    },
    {
      icon: HelpCircle,
      title: "FAQ Database",
      description: "Answers to the most common solar questions",
      link: "#"
    }
  ];

  const faqs = [
    {
      question: "How long do solar panels last?",
      answer: "Solar panels typically last 25-30 years with minimal degradation. Most manufacturers provide 25-year warranties."
    },
    {
      question: "What happens during power outages?",
      answer: "Standard grid-tied systems shut down during outages for safety. Battery backup systems can provide power during outages."
    },
    {
      question: "How much maintenance do solar panels require?",
      answer: "Solar panels require minimal maintenance. Occasional cleaning and annual inspections are typically sufficient."
    },
    {
      question: "Can I install solar panels myself?",
      answer: "While possible, we recommend professional installation for safety, warranties, and optimal performance."
    }
  ];

  return (
    <main className="bg-gray-900 text-white min-h-screen pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Solar Resources</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about solar energy and making the switch
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {resources.map((resource, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors cursor-pointer">
              <resource.icon className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">{resource.title}</h3>
              <p className="text-gray-300 mb-4">{resource.description}</p>
              <button className="text-orange-500 hover:text-orange-400 font-semibold">
                Learn More →
              </button>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3 text-orange-500">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8">Latest Blog Posts</h2>
            <div className="space-y-6">
              <article className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">Solar Panel Efficiency: What You Need to Know</h3>
                <p className="text-gray-300 mb-4">Understanding efficiency ratings and how they impact your solar investment...</p>
                <span className="text-orange-500 text-sm">Read more →</span>
              </article>

              <article className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">The Solar Tax Credit: Maximizing Your Savings</h3>
                <p className="text-gray-300 mb-4">Learn how to take full advantage of federal and state solar incentives...</p>
                <span className="text-orange-500 text-sm">Read more →</span>
              </article>

              <article className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-2">Solar Battery Storage: Is It Worth It?</h3>
                <p className="text-gray-300 mb-4">Exploring the benefits and costs of adding battery storage to your solar system...</p>
                <span className="text-orange-500 text-sm">Read more →</span>
              </article>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl mb-6">
            Our solar experts are here to help you make the best decision for your home
          </p>
          <button className="bg-white text-orange-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors mr-4">
            Schedule Consultation
          </button>
          <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-orange-600 transition-colors">
            Call Now
          </button>
        </div>
      </div>
    </main>
  );
};

export default Resources;