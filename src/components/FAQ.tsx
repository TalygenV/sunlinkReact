import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  isDark?: boolean;
}

const FAQ: React.FC<FAQProps> = ({ items, isDark = false }) => {
  const [selected, setSelected] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setSelected(selected === id ? null : id);
  };

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className={`p-5 border-b ${isDark ? 'border-gray-600' : 'border-gray-300'} pl-0`}>
          <div
            onClick={() => toggleFAQ(item.id)}
            className={`cursor-pointer font-normal text-2xl ${isDark ? 'text-white' : 'text-gray-900'} flex justify-between items-center hover:text-orange-500 transition`}
          >
            {item.question}
            <span className={`transition-transform duration-300 ml-4 ${selected === item.id ? 'rotate-180' : ''}`}>
              <ChevronDown className="w-6 h-6" />
            </span>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              selected === item.id ? 'max-h-96 mt-4' : 'max-h-0'
            }`}
          >
            <div className={`${isDark ? 'text-white' : 'text-gray-700'} overflow-hidden`}>
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;