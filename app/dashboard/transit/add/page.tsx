'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Save, X, Truck, MapPin, Box, Calendar } from 'lucide-react';

export default function AddTripPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    truck_plate: '',
    driver_name: '',
    cargo_description: '',
    origin: '',
    destination: '',
    status: 'Loading',
    estimated_arrival: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = {
      ...formData,
      estimated_arrival: formData.estimated_arrival === '' ? null : formData.estimated_arrival
    };

    const { error } = await supabase.from('logistics_trips').insert([dataToSend]);

    if (error) {
      alert('Error: ' + error.message);
      setLoading(false);
    } else {
      alert('✅ Shipment Started!');
      router.push('/dashboard/transit');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">New Shipment</h1>
        <button onClick={() => router.back()} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase mb-4 flex items-center gap-2">
              <Truck className="w-4 h-4" /> Transport Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Truck Plate Number</label>
                <input required type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="T 123 ABC"
                  onChange={(e) => setFormData({...formData, truck_plate: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Driver Name</label>
                <input required type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Driver Name"
                  onChange={(e) => setFormData({...formData, driver_name: e.target.value})} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Route & Schedule
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Origin (From)</label>
                <input required type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Dar es Salaam"
                  onChange={(e) => setFormData({...formData, origin: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination (To)</label>
                <input required type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Mwanza"
                  onChange={(e) => setFormData({...formData, destination: e.target.value})} />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Arrival Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input type="date" className="w-full pl-10 p-3 border border-gray-300 rounded-lg text-gray-700"
                    onChange={(e) => setFormData({...formData, estimated_arrival: e.target.value})} />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase mb-4 flex items-center gap-2">
              <Box className="w-4 h-4" /> Cargo Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input required type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="e.g. 20 Tons of Cement"
                  onChange={(e) => setFormData({...formData, cargo_description: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                  onChange={(e) => setFormData({...formData, status: e.target.value})} >
                  <option value="Loading">Loading at Warehouse</option>
                  <option value="In Transit">In Transit (On Road)</option>
                  <option value="Delayed">Delayed / Breakdown</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-900 text-white font-bold py-4 rounded-lg hover:bg-blue-800 flex items-center justify-center gap-2">
            {loading ? 'Processing...' : ( <> <Save className="w-5 h-5" /> Start Shipment </> )}
          </button>
        </form>
      </div>
    </div>
  );
}