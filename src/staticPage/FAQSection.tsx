import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  faqs: FAQ[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ title, faqs }) => {
  const [selectedFAQ, setSelectedFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setSelectedFAQ(selectedFAQ === id ? null : id);
  };

  return (
    <section className="bg-white py-20 px-4 md:px-8 lg:px-14">
      <div className="w-full mx-auto">
        <h2 className="font-bold text-black text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-10">{title}</h2>
        <div className="space-y-2">
          {faqs.map((faq) => (
            <div key={faq.id} className="p-5 border-b border-b-gray-600 pl-0">
              <div 
                onClick={() => toggleFAQ(faq.id)}
                className="cursor-pointer font-normal text-2xl text-gray-800 flex justify-between items-center"
              >
                {faq.question}
                <ChevronDown 
                  className={`w-6 h-6 transition-transform duration-300 ml-4 ${
                    selectedFAQ === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </div>
              {selectedFAQ === faq.id && (
                <div className="mt-4 text-gray-600 overflow-hidden transition-all duration-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="w-full mx-auto mt-10 pt-12">
          <p className="text-base font-medium text-gray-400 text-center">
            Have a different question? <a className="text-black" href="#"><u>Contact us</u></a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;