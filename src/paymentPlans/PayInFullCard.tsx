import React from 'react';
import { Check, CreditCard } from 'lucide-react';

interface PayInFullCardProps {
  totalPrice: number;
}

const PayInFullCard: React.FC<PayInFullCardProps> = ({ totalPrice }) => {
  const halfPrice = Math.round(totalPrice / 2);

  return (
    <div className="w-full bg-white rounded-2xl px-6 mt-3 py-8 relative">
      <div className="absolute -top-4 left-6 bg-black text-white text-sm px-4 py-1 rounded-full shadow">
        Maximum Savings
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Features */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">$</span>
            </div>
            <div>
              <h2 className="text-sm text-gray-900 font-medium">Pay in Full</h2>
              <p className="text-xs text-gray-500">50% down, 50% at installation</p>
            </div>
          </div>

          <ul className="space-y-2 text-gray-700 text-xs">
            <li className="flex items-center">
              <Check className="mr-3 h-4 w-4 text-green-500" />
              No interest charges
            </li>
            <li className="flex items-center">
              <Check className="mr-3 h-4 w-4 text-green-500" />
              Immediate 100% ownership
            </li>
            <li className="flex items-center">
              <Check className="mr-3 h-4 w-4 text-green-500" />
              Maximum ROI potential
            </li>
            <li className="flex items-center">
              <Check className="mr-3 h-4 w-4 text-green-500" />
              Highest property value increase
            </li>
          </ul>
        </div>

        {/* Middle: Recommended */}
        <div className="flex flex-col justify-center">
          <div className="bg-gray-100 rounded-xl p-4">
            <p className="text-xs text-red-500 mb-1 font-medium">Recommended for:</p>
            <p className="text-xs text-gray-700 leading-relaxed">
              Best long-term value if you have available capital and want maximum returns.
            </p>
          </div>
        </div>

        {/* Right: Pricing */}
        <div className="flex flex-col justify-center">
          <div className="flex justify-between space-x-3 mb-6">
            <div className="text-center">
              <p className="text-2xl text-gray-900 font-bold">${halfPrice.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Due at signing</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-gray-900 font-bold">${halfPrice.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Due at installation</p>
            </div>
          </div>
          <button className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-6 py-3 rounded-xl flex items-center gap-2 justify-center">
            <CreditCard className="w-4 h-4" />
            Pay $500 Deposit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayInFullCard;