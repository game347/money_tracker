import React, { useEffect, useState } from 'react';
import { BottomNavigation } from "../components/BottomNavigation";

const Balance = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/balance/total')
      .then(res => res.json())
      .then(data => {
        if (typeof data.total === 'number') {
          setBalance(data.total);
        }
      })
      .catch(err => {
        console.error('❌ Failed to fetch balance:', err);
      });
  }, []);

  return (
    <div className="min-h-screen w-screen bg-white flex items-center justify-center">
      <div className="px-6 pt-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="text-left">
            <h4 className="text-2xl font-bold text-gray-800">Balance</h4>
            <p className="text-gray-600 mt-2">Your account balance details</p>
            <p className="text-gray-900 font-bold mt-2 text-xl">
              {balance !== null ? `$${balance}` : 'Loading...'}
            </p>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Balance;
