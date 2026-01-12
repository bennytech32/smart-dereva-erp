"use client";
import React from 'react';
import { useDrivers } from '@/context/DriverContext';
import { ShieldAlert, Zap } from 'lucide-react';

export default function OperationsRoom() {
  const { drivers, verifyDriver, updateBooking, mounted } = useDrivers();

  // 🛡️ Safety check for Vercel Build
  if (!mounted) return <div className="p-10">Loading Terminal...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <h2 className="text-2xl font-black flex items-center gap-2"><ShieldAlert className="text-amber-500"/> Pending Vetting</h2>
        {drivers.filter((d:any) => d.status === 'Pending').map((d:any) => (
          <div key={d.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex justify-between items-center">
            <p className="font-black text-slate-900">{d.name}</p>
            <button onClick={() => verifyDriver(d.id)} className="bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-black">VERIFY</button>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-black flex items-center gap-2"><Zap className="text-blue-600"/> Dispatch</h2>
        <div className="bg-white p-8 rounded-[3rem] border-2 border-blue-50">
          <select id="opSelect" className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold mb-4">
            <option value="">Select Driver...</option>
            {drivers.filter((d:any) => d.status === 'Active').map((d:any) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
          <button 
            onClick={() => {
              const id = (document.getElementById('opSelect') as HTMLSelectElement).value;
              if(id) updateBooking(id, "Port Trip");
            }}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}