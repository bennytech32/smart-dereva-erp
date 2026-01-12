'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Save, X, Building2, User, Phone, Wallet } from 'lucide-react';

export default function AddClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    company_name: '',
    contact_person: '',
    phone_number: '',
    email: '',
    contract_value: '',
    payment_terms: 'Monthly',
    status: 'Active'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('clients').insert([formData]);

    if (error) {
      alert('Error: ' + error.message);
      setLoading(false);
    } else {
      alert('✅ Corporate Client Added!');
      router.push('/dashboard/clients');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add Corporate Client</h1>
        <button onClick={() => router.back()} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase border-b border-gray-100 pb-2 mb-4">Company Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input required type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="e.g. CRDB Bank HQ"
                  onChange={(e) => setFormData({...formData, company_name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Manager Name"
                  onChange={(e) => setFormData({...formData, contact_person: e.target.value})} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="+255..."
                onChange={(e) => setFormData({...formData, phone_number: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contract Value (TZS)</label>
              <input type="number" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="1000000"
                onChange={(e) => setFormData({...formData, contract_value: e.target.value})} />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-900 text-white font-bold py-4 rounded-lg hover:bg-blue-800 flex items-center justify-center gap-2 mt-4">
            {loading ? 'Saving...' : ( <> <Save className="w-5 h-5" /> Save Client </> )}
          </button>

        </form>
      </div>
    </div>
  );
}