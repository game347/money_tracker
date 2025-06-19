import React from 'react';
import { BottomNavigation } from "../components/BottomNavigation";

const Graph = () => {
  return (
    <div className="min-h-screen w-screen bg-white flex items-center justify-center">
      <div className="px-6 pt-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
            <p className="text-gray-600 mt-2">Your spending analytics and charts</p>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Graph;