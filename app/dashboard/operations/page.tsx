"use client";

import React, { useState } from 'react';
// Use @ alias or relative path (../../../context/DriverContext) depending on your setup
import { useDrivers } from '@/context/DriverContext';
import { 
  MapPin, 
  UserCheck, 
  ShieldAlert, 
  Zap, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export default function OperationsRoom() {
  const context = useDrivers();

  // SAFETY GUARD: Prevents the "Cannot destructure property" error during Vercel deployment
  if (!context) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="animate-pulse text-slate-400 font-black tracking-widest uppercase">
          Initializing Operations...
        </div>
      </div>
    );
  }

  const { drivers, verifyDriver, updateBooking } = context;

  // Filter logic for Registry management
  const pendingDrivers = drivers.filter((d: any) => d.status === 'Pending');
  const activeDrivers = drivers.filter((d: any) => d.status === 'Active' && d.booking === 'None');

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Operations Room</h1>
          <p className="text-slate-500 font-medium italic">Control terminal for dispatch and NIT vetting.</p>
        </div>
        <div className="bg-blue-600 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-tighter flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          Live Fleet Monitor
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* 1. VETTING PORTAL: Approving new applicants from Onboarding */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="text-amber-500 w-5 h-5" />
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Pending NIT Vetting</h2>
          </div>
          
          {pendingDrivers.length === 0 ? (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 text-center">
              <CheckCircle2 className="mx-auto text-slate-300 mb-4" size={40} />
              <p className="text-slate-400 font-bold">No pending registrations.</p>
            </div>
          ) : (
            pendingDrivers.map((driver: any) => (
              <div key={driver.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex justify-between items-center group hover:border-blue-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center font-black text-amber-600">
                    {driver.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{driver.name}</p>
                    <p className="text-[10px] text-amber-600 font-black uppercase tracking-widest">Awaiting Doc Review</p>
                  </div>
                </div>
                <button 
                  onClick={() => verifyDriver(driver.id)}
                  className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-[10px] font-black hover:bg-blue-600 transition shadow-lg shadow-slate-100"
                >
                  VERIFY NIT
                </button>
              </div>
            ))
          )}
        </div>

        {/* 2. DISPATCH TERMINAL: Assigning verified drivers to trips */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-blue-600 w-5 h-5" />
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Dispatch Terminal</h2>
          </div>
          
          <div className="bg-white p-8 rounded-[3rem] border-2 border-blue-50 shadow-xl shadow-blue-100/20">
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Active Request</p>
                <h3 className="text-xl font-black text-slate-900">#812: Fuel Transit</h3>
              </div>
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><MapPin size={24} /></div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                <Clock size={16} /> <span>Pickup: 14:00 | Dar Es Salaam Port</span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Available Vetted Fleet</label>
              <select 
                id="dispatchSelect"
                className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-800 focus:ring-2 focus:ring-blue-600 appearance-none"
              >
                <option value="">Select Verified Driver...</option>
                {activeDrivers.map((driver: any) => (
                  <option key={driver.id} value={driver.id}>{driver.name} (Vetted)</option>
                ))}
              </select>
            </div>

            <button 
              onClick={() => {
                const el = document.getElementById('dispatchSelect') as HTMLSelectElement;
                if (el.value) {
                  updateBooking(el.value, "Port to Arusha Fuel Transit");
                  alert("Dispatch Confirmed! Driver notified via portal.");
                } else {
                  alert("Please select a verified driver from the registry.");
                }
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-lg shadow-lg shadow-blue-200 transition-transform active:scale-[0.98]"
            >
              Confirm Dispatch
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}