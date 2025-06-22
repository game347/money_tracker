import React, { useState } from 'react';
import { BottomNavigation } from "../components/BottomNavigation";

const Index = () => {
  const [balance, setBalance] = useState(0);
  const [showKeypad, setShowKeypad] = useState(false);
  const [keypadAmount, setKeypadAmount] = useState('');
  const [currentTransactionType, setCurrentTransactionType] = useState(null);
  const [transactionNote, setTransactionNote] = useState('');
  const [transactions, setTransactions] = useState([]);

  const initiateTransaction = (type) => {
    setCurrentTransactionType(type);
    setKeypadAmount('');
    setTransactionNote('');
    setShowKeypad(true);
  };

  const handleKeypadNumberClick = (number) => {
    if (number === '.' && keypadAmount.includes('.')) return;
    setKeypadAmount(prev => prev + number);
  };

  const handleDeleteLastDigit = () => {
    setKeypadAmount(prev => prev.slice(0, -1));
  };

  const handleClearKeypad = () => {
    setKeypadAmount('');
  };

  const confirmTransaction = () => {
    let amount = parseFloat(keypadAmount);

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid positive number.");
      return;
    }

    if (currentTransactionType === 'withdraw') {
      amount = -amount;
      if (balance + amount < 0) {
        alert("Insufficient balance.");
        return;
      }
    }

    setBalance(prev => prev + amount);

    setTransactions(prev => [
      {
        id: Date.now(),
        type: currentTransactionType,
        amount: Math.abs(amount),
        note: transactionNote.trim(),
        date: new Date().toLocaleString(),
      },
      ...prev,
    ]);

    setShowKeypad(false);
    setKeypadAmount('');
    setTransactionNote('');
    setCurrentTransactionType(null);
  };

  const cancelKeypad = () => {
    setShowKeypad(false);
    setKeypadAmount('');
    setTransactionNote('');
    setCurrentTransactionType(null);
  };

  const numbers = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '.', '0', '',
  ];

  return (
    <div className="min-h-screen w-screen bg-white flex flex-col items-center justify-between">
      <div className="w-full max-w-md mx-auto px-4 pt-12 pb-20">
        {/* Header */}
        <div className="pb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 leading-relaxed">
                Hello there welcome to money tracking app
              </h1>
            </div>
          </div>
        </div>

        {/* Deposit/Withdraw Buttons */}
        <div className="mt-8">
          <div className="flex justify-center space-x-8">
            <div className="flex flex-col items-center">
              <button
                className="w-20 h-20 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                onClick={() => initiateTransaction('deposit')}
              >
                <span className="text-white font-semibold text-sm">+</span>
              </button>
              <span className="text-gray-600 text-sm mt-2 font-medium">Deposit</span>
            </div>
            <div className="flex flex-col items-center">
              <button
                className="w-20 h-20 bg-red-500 hover:bg-red-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                onClick={() => initiateTransaction('withdraw')}
              >
                <span className="text-white font-semibold text-sm">-</span>
              </button>
              <span className="text-gray-600 text-sm mt-2 font-medium">Withdraw</span>
            </div>
          </div>
        </div>

        {/* Keypad Overlay */}
        {showKeypad && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                {currentTransactionType === 'deposit' ? 'Enter Deposit Amount' : 'Enter Withdraw Amount'}
              </h3>

              <div className="text-center mb-4">
                <p className="text-4xl font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
                  ${keypadAmount || '0'}
                </p>
              </div>

              {/* Note input */}
              <textarea
                placeholder="Add a note (optional)"
                className="w-full border border-gray-300 rounded-md p-2 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={3}
                value={transactionNote}
                onChange={(e) => setTransactionNote(e.target.value)}
              />

              <div className="grid grid-cols-3 gap-3">
                {numbers.map((num) => (
                  <button
                    key={num}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-lg text-xl transition-colors duration-150"
                    onClick={() => handleKeypadNumberClick(num)}
                  >
                    {num}
                  </button>
                ))}
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg text-xl col-span-1 transition-colors duration-150"
                  onClick={handleDeleteLastDigit}
                >
                  DEL
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg text-xl col-span-1 transition-colors duration-150"
                  onClick={handleClearKeypad}
                >
                  CLR
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg text-xl col-span-1 transition-colors duration-150"
                  onClick={confirmTransaction}
                >
                  OK
                </button>
              </div>

              <button
                className="mt-6 w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 rounded-lg text-lg transition-colors duration-150"
                onClick={cancelKeypad}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="mt-12">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No recent transactions</p>
              </div>
            ) : (
              <ul className="space-y-2">
                {transactions.map(({ id, type, amount, note, date }) => (
                  <li key={id} className="border-b border-gray-200 pb-2">
                    <div className="flex justify-between text-gray-700">
                      <span
                        className={`capitalize font-semibold ${
                          type === 'deposit' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {type}
                      </span>
                      <span>${amount.toFixed(2)}</span>
                      <span className="text-sm text-gray-400">{date}</span>
                    </div>
                    {note && <p className="text-gray-600 italic text-sm mt-1">{note}</p>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Index;
