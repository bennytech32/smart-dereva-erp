"use client";

import React, { useState } from 'react';
import { useDrivers } from '@/context/DriverContext';
import { 
  MapPin, 
  UserCheck, 
  Clock, 
  Zap, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function OperationsRoom() {
  const { drivers, updateBooking } = useDrivers();
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  // Filter only drivers who are 'Active' (Verified) to mitigate Blind Spot Risk
  const availableDrivers = drivers.filter((d: any) => d.status === 'Active');

  const handleBooking = () => {
    if (!selectedDriverId) return alert("Please select a vetted driver first.");
    
    setIsBooking(true);
    
    // Simulate API delay for professional feel
    setTimeout(() => {
      updateBooking(selectedDriverId, "Transit: Port to Arusha");
      setIsBooking(false);
      setSelectedDriverId('');
      alert("Booking Confirmed! Driver notified via Smart Dereva Portal.");
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* 1. OPERATIONS HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Operations Room</h1>
          <p className="text-slate-500 font-medium">Live Dispatch & Booking Terminal.</p>
        </div>
        <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full flex items-center gap-2 text-xs font-black uppercase tracking-widest">
          <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
          System Live
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. ACTIVE REQUEST CARD (Left Side) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border-2 border-blue-100 shadow-xl shadow-blue-50 relative overflow-hidden">
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-1">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase">Urgent Request</span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">Request #812: Fuel Transit</h3>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payout Value</p>
                <p className="text-xl font-black text-blue-600">TZS 450,000</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-50 rounded-xl text-slate-400"><MapPin className="w-5 h-5" /></div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase">Pickup</p>
                  <p className="font-bold text-slate-800">Dar Es Salaam Port</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-50 rounded-xl text-slate-400"><Clock className="w-5 h-5" /></div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase">Deadline</p>
                  <p className="font-bold text-slate-800">Today, 18:00 EAT</p>
                </div>
              </div>
            </div>

            {/* DRIVER SELECTION UI */}
            <div className="flex flex-col md:flex-row gap-4 pt-6 border-t border-slate-50">
              <div className="flex-1">
                <select 
                  value={selectedDriverId}
                  onChange={(e) => setSelectedDriverId(e.target.value)}
                  className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-700 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Vetted Driver...</option>
                  {availableDrivers.map((driver: any) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name} — {driver.nit}
                    </option>
                  ))}
                </select>
              </div>
              <button 
                onClick={handleBooking}
                disabled={isBooking}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2"
              >
                {isBooking ? "Processing..." : <><UserCheck className="w-5 h-5" /> Confirm Booking</>}
              </button>
            </div>
          </div>
        </div>

        {/* 3. LIVE REGISTRY STATUS (Right Side) */}
        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Zap className="text-blue-400 w-5 h-5" /> Registry Pulse
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-slate-400 text-sm">Available Drivers</p>
                <p className="font-black text-blue-400">{availableDrivers.length}</p>
              </div>
              <div className="flex justify-between items-center text-xs">
                <p className="text-slate-400 italic">Total vetted fleet: 1,240</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Compliance Alert</p>
                <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
                  <AlertCircle className="w-4 h-4" /> 2 drivers pending NIT renewal
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}