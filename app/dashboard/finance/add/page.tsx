'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Save, X } from 'lucide-react';

export default function AddFinancePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Commission',
    payer_name: '',
    payment_method: 'M-Pesa',
    reference_number: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('finance_records')
      .insert([formData]);

    if (error) {
      alert('Error: ' + error.message);
      setLoading(false);
    } else {
      alert('✅ Payment Recorded!');
      router.push('/dashboard/finance');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Record New Payment</h1>
        <button onClick={() => router.back()} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Amount Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount Received (TZS)</label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-gray-400 font-bold">TZS</span>
              <input required type="number" className="w-full pl-14 p-4 text-2xl font-bold border border-gray-300 rounded-lg text-green-700 focus:ring-2 focus:ring-green-500"
                placeholder="0.00"
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payer Name</label>
              <input required type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="e.g. Driver Juma"
                onChange={(e) => setFormData({...formData, payer_name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Type</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                onChange={(e) => setFormData({...formData, category: e.target.value})} >
                <option value="Commission">10% Commission</option>
                <option value="Monthly Fee">Monthly Subscription</option>
                <option value="Penalty">Penalty / Fine</option>
                <option value="Registration">Registration Fee</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input required type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="e.g. Weekly commission for Week 1"
              onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>

          {/* Payment Method */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
            <div className="grid grid-cols-3 gap-4">
              {['M-Pesa', 'Cash', 'Bank'].map((method) => (
                <div key={method} onClick={() => setFormData({...formData, payment_method: method})}
                  className={`cursor-pointer p-3 rounded-lg border text-center text-sm font-bold transition ${
                    formData.payment_method === method 
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {method}
                </div>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-green-700 text-white font-bold py-4 rounded-lg hover:bg-green-800 flex items-center justify-center gap-2">
            {loading ? 'Processing...' : ( <> <Save className="w-5 h-5" /> Record Payment </> )}
          </button>
        </form>
      </div>
    </div>
  );
}