'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Save, X } from 'lucide-react';

export default function AddDriverPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    license_number: '',
    license_expiry: '',
    category: 'Gig', // Default
    status: 'Active'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('drivers')
      .insert([formData]);

    if (error) {
      alert('Error: ' + error.message);
      setLoading(false);
    } else {
      alert('✅ Driver Registered Successfully!');
      router.push('/dashboard/drivers');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Register New Driver</h1>
        <button onClick={() => router.back()} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input required type="text" className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={(e) => setFormData({...formData, full_name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input required type="text" className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={(e) => setFormData({...formData, phone_number: e.target.value})} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
              <input required type="text" className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={(e) => setFormData({...formData, license_number: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input required type="date" className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={(e) => setFormData({...formData, license_expiry: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Driver Category</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg bg-white"
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="Gig">Gig Worker (Uber/Bolt)</option>
              <option value="Corporate">Corporate Staff</option>
              <option value="Transit">Truck/Transit</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-900 text-white font-bold py-4 rounded-lg hover:bg-blue-800 flex items-center justify-center gap-2">
            {loading ? 'Saving...' : ( <> <Save className="w-5 h-5" /> Save Driver Record </> )}
          </button>
        </form>
      </div>
    </div>
  );
}