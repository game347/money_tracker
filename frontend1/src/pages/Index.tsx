import { useState, useEffect } from 'react';
import { BottomNavigation } from "../components/BottomNavigation";

type TransactionType = 'deposit' | 'withdraw';

const Index = () => {
  const [balance, setBalance] = useState<number>(0);
  const [showKeypad, setShowKeypad] = useState(false);
  const [keypadAmount, setKeypadAmount] = useState('');
  const [currentTransactionType, setCurrentTransactionType] = useState<TransactionType | null>(null);
  const [transactionNote, setTransactionNote] = useState('');

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

  const initiateTransaction = (type: TransactionType) => {
    setCurrentTransactionType(type);
    setKeypadAmount('');
    setTransactionNote('');
    setShowKeypad(true);
  };

  const handleKeypadNumberClick = (number: string) => {
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

    fetch('http://localhost:5000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        note: transactionNote.trim(),
        date: new Date().toISOString(),
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to save transaction.');
        return res.text();
      })
      .then(() => {
        setShowKeypad(false);
        setKeypadAmount('');
        setTransactionNote('');
        setCurrentTransactionType(null);
      })
      .catch(err => {
        console.error('❌ Backend error:', err.message);
      });
  };

  const cancelKeypad = () => {
    setShowKeypad(false);
    setKeypadAmount('');
    setTransactionNote('');
    setCurrentTransactionType(null);
  };

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', ''];

  return (
    <div className="min-h-screen w-screen bg-white flex flex-col items-center justify-between">
      <div className="w-full max-w-md mx-auto px-4 pt-12 pb-20">
        <div className="pb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 leading-relaxed">
                Hello there welcome to money tracking app
              </h1>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-8">
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
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-lg text-xl"
                    onClick={() => handleKeypadNumberClick(num)}
                  >
                    {num}
                  </button>
                ))}
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg text-xl"
                  onClick={handleDeleteLastDigit}
                >
                  DEL
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg text-xl"
                  onClick={handleClearKeypad}
                >
                  CLR
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg text-xl"
                  onClick={confirmTransaction}
                >
                  OK
                </button>
              </div>

              <button
                className="mt-6 w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 rounded-lg text-lg"
                onClick={cancelKeypad}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Index;
