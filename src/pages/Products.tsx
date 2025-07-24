import React from 'react';
import { Battery, Zap, Sun } from 'lucide-react';

const Products = () => {
  return (
    <main className="bg-gray-900 text-white min-h-screen pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Solar Products</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            High-quality solar equipment from trusted manufacturers with industry-leading warranties
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-xl p-8">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6">
              <Sun className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Solar Panels</h3>
            <p className="text-gray-300 mb-6">
              Premium monocrystalline and polycrystalline panels with 25-year warranties.
              High efficiency ratings and proven durability.
            </p>
            <ul className="space-y-2 text-gray-300">
              <li>• 20-22% efficiency ratings</li>
              <li>• 25-year performance warranty</li>
              <li>• Weather-resistant design</li>
              <li>• Tier 1 manufacturer certification</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-xl p-8">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6">
              <Battery className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Battery Storage</h3>
            <p className="text-gray-300 mb-6">
              Store excess solar energy for use during peak hours or power outages.
              Lithium-ion technology with smart monitoring.
            </p>
            <ul className="space-y-2 text-gray-300">
              <li>• 10-15 year warranties</li>
              <li>• Smart energy management</li>
              <li>• Backup power capability</li>
              <li>• Scalable capacity options</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-xl p-8">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Inverters</h3>
            <p className="text-gray-300 mb-6">
              Convert DC power from panels to AC power for your home.
              String and power optimizer options available.
            </p>
            <ul className="space-y-2 text-gray-300">
              <li>• 95%+ efficiency ratings</li>
              <li>• 12-25 year warranties</li>
              <li>• Real-time monitoring</li>
              <li>• Smart grid compatibility</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Your Custom Quote</h2>
          <p className="text-xl mb-6">
            Our experts will design the perfect solar system for your home and energy needs
          </p>
          <button className="bg-white text-orange-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Start Your Solar Journey
          </button>
        </div>
      </div>
    </main>
  );
};

export default Products;