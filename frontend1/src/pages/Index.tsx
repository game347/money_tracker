import React from 'react';
import { BottomNavigation } from "../components/BottomNavigation";

const Index = () => {
  return (
    <div className="min-h-screen w-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4 pb-20">
        {/* Header */}
        <div className="pt-12 pb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 leading-relaxed">
                Hello there welcome to money tracking app
              </h1>
            </div>
          </div>
        </div>

        {/* Deposit/Withdraw */}
        <div className="mt-8">
          <div className="flex justify-center space-x-8">
            <div className="flex flex-col items-center">
              <button className="w-20 h-20 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105">
                <span className="text-white font-semibold text-sm">+</span>
              </button>
              <span className="text-gray-600 text-sm mt-2 font-medium">Deposit</span>
            </div>
            <div className="flex flex-col items-center">
              <button className="w-20 h-20 bg-red-500 hover:bg-red-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105">
                <span className="text-white font-semibold text-sm">-</span>
              </button>
              <span className="text-gray-600 text-sm mt-2 font-medium">Withdraw</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="text-center py-8 text-gray-500">
              <p>No recent transactions</p>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="fixed bottom-0 left-0 w-full">
          <BottomNavigation />
        </div>
      </div>
    </div>
  );
};

export default Index;
