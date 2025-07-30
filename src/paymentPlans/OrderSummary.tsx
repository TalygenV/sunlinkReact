import React, { useEffect, useState } from 'react';
import { Shield, Check, Lock } from 'lucide-react';
import { Battery } from '../types/Battery';

interface OrderSummaryProps {
  batteryCount: number;
  totalCost: number;
  afterTaxCredit: number;
  evChargerEnabled: boolean;
  electricalPanelEnabled: boolean;
  formData: {
    cardholderName: string;
    email: string;
    cardNumber: string;
    expiryDate: string;
    cvc: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  batteryCount,
  totalCost,
  afterTaxCredit,
  evChargerEnabled,
  electricalPanelEnabled,
  formData,
  onInputChange
}) => {
  const [battery, setBattery] = useState<Battery | null>(null);
  const [quantity, setQuantity] = useState<number>(0);


  useEffect(() => {
    const stored = localStorage.getItem('battery');
    if (stored) {
      try {
        const { battery: storedBattery, quantity: storedQty } = JSON.parse(stored);
        if (storedBattery && storedQty) {
          setBattery(storedBattery);
          setQuantity(storedQty);
        }
      } catch (err) {
        console.error('Failed to parse battery from localStorage:', err);
      }
    }

  }, []);

  return (
    <div className="w-full sticky top-20">
      <div className="w-full max-w-[400px] rounded-3xl p-6 text-white border border-neutral-600 bg-slate-800">
        <div className="text-white text-lg font-medium gap-2 mb-6">
          <span className="text-2xl text-orange-400">Order Summary</span>
        </div>

        <div className="bg-slate-700 border border-neutral-600 text-white p-5 rounded-xl shadow-lg w-full">
          {/* Solar System */}
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-gray-300">Solar System (12.8kW)</p>
              <p className="text-sm text-gray-300 flex items-center ml-3">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span> x 32 Panels
              </p>
            </div>
            <p className="text-gray-300">$22,400</p>
          </div>

              {/* Battery Storage */}
              {battery && quantity > 0 && (
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-gray-300">Battery Storage</p>
                <p className="text-sm text-gray-300 flex items-center ml-3">
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span> {quantity}x {battery.name}
                </p>
              </div>
              <p className="text-gray-300">
                ${(quantity * battery.price).toLocaleString()}
              </p>
            </div>
          )}

          <div className="bg-neutral-600 w-full h-px my-3"></div>

          {/* Add-ons */}
          {(evChargerEnabled || electricalPanelEnabled) && (
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-gray-300">Add-ons</p>
                {evChargerEnabled && (
                  <p className="text-sm text-gray-300 flex items-center ml-3">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span> 1x EV Charger Installation
                  </p>
                )}
                {electricalPanelEnabled && (
                  <p className="text-sm text-gray-300 flex items-center ml-3">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span> 1x Electrical Panel Upgrade
                  </p>
                )}
              </div>
              <p className="text-gray-300">
                ${((evChargerEnabled ? 2500 : 0) + (electricalPanelEnabled ? 3500 : 0)).toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* Total Cost Summary */}
        <div className="bg-slate-700 border border-neutral-600 text-white p-5 rounded-xl shadow-lg w-full mt-4">
          <div className="flex justify-between">
            <p className="text-gray-300">Total System Cost</p>
            <p className="text-gray-300">${totalCost.toLocaleString()}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-300">After Tax Credits (30%)</p>
            <p className="text-sm text-gray-300">${afterTaxCredit.toLocaleString()}</p>
          </div>

          {/* <div className="bg-neutral-600 w-full h-px my-3"></div>

          <div className="flex justify-between">
            <p className="text-sm text-gray-300">Monthly Payment Plan</p>
            <p className="text-sm text-orange-400">$145/mo</p>
          </div> */}
        </div>

        {/* Payment Information */}
        <div className="text-white text-lg font-medium mt-4">
          <span className="text-lg text-orange-400">Payment Information</span>
        </div>

        <div className="flex flex-wrap gap-4 mt-3">
          <div className="w-full">
            <label className="w-full text-gray-300 text-base">Cardholder Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={formData.cardholderName}
              onChange={(e) => onInputChange("cardholderName", e.target.value)}
              className="mt-3 w-full px-4 py-4 border rounded-xl bg-slate-700 focus:ring-blue-500 focus:border-blue-500 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <div className="w-full">
            <label className="w-full text-gray-300 text-base">Email Address</label>
            <input
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => onInputChange("email", e.target.value)}
              className="mt-3 w-full px-4 py-4 border rounded-xl bg-slate-700 focus:ring-blue-500 focus:border-blue-500 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <div className="w-full">
            <label className="w-full text-gray-300 text-base">Card Number</label>
            <input
              type="text"
              placeholder="4242 4242 4242 4242"
              value={formData.cardNumber}
              onChange={(e) => onInputChange("cardNumber", e.target.value)}
              className="mt-3 w-full px-4 py-4 border rounded-xl bg-slate-700 focus:ring-blue-500 focus:border-blue-500 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <div className="w-full sm:w-[calc(50%-0.5rem)]">
            <label className="w-full text-gray-300 text-base">Expiry Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={(e) => onInputChange("expiryDate", e.target.value)}
              className="mt-3 w-full px-4 py-4 border rounded-xl bg-slate-700 focus:ring-blue-500 focus:border-blue-500 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <div className="w-full sm:w-[calc(50%-0.5rem)]">
            <label className="w-full text-gray-300 text-base">CVC</label>
            <input
              type="text"
              placeholder="123"
              value={formData.cvc}
              onChange={(e) => onInputChange("cvc", e.target.value)}
              className="mt-3 w-full px-4 py-4 border rounded-xl bg-slate-700 focus:ring-blue-500 focus:border-blue-500 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <div className="w-full mt-10 text-center">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl py-4 px-5 mb-2 text-lg font-normal text-white flex justify-center items-center w-full">
              <Lock className="mr-2 w-5 h-5" />
              Pay $500 Deposit
            </button>
          </div>

          <div className="flex justify-between w-full text-sm text-gray-300 mt-4">
            <div className="flex items-center">
              <Shield className="mr-1 w-4 h-4" />
              Secured by Stripe
            </div>
            <div className="flex items-center">
              <Check className="mr-1 w-4 h-4" />
              Refundable within 3 days
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;