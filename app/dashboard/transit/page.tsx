'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Truck } from 'lucide-react';
import Link from 'next/link';

export default function LogisticsPage() {
  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const { data } = await supabase
        .from('logistics_trips')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setTrips(data);
    };
    fetchTrips();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transit Logistics</h1>
          <p className="text-gray-500">Track shipments and fleet movement.</p>
        </div>
        <Link 
          href="/dashboard/transit/add"
          className="bg-blue-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-800"
        >
          <Plus className="w-5 h-5" /> New Shipment
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.length === 0 ? (
          <div className="col-span-3 p-12 text-center bg-white rounded-xl border border-gray-200">
             <Truck className="w-12 h-12 text-gray-300 mx-auto mb-3"/>
             <p className="text-gray-500">No active trips. Start a new shipment.</p>
           </div>
        ) : (
          trips.map((trip) => (
            <div key={trip.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
              <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-xl ${
                trip.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                trip.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {trip.status}
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <Truck className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{trip.truck_plate}</h3>
                  <p className="text-xs text-gray-500">{trip.driver_name}</p>
                </div>
              </div>

              <div className="space-y-3 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <p className="text-sm font-medium text-gray-600">{trip.origin}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <p className="text-sm font-medium text-gray-600">{trip.destination}</p>
                </div>
              </div>

              <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">Cargo</p>
                <p className="text-sm text-gray-800 font-medium">{trip.cargo_description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}