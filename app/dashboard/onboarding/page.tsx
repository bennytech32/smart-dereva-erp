"use client";

import React, { useState } from 'react';
import { useDrivers } from '@/context/DriverContext';
import { UserPlus, CheckCircle2, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function OnboardingPage() {
  const { addDriver, mounted } = useDrivers();
  const [name, setName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!mounted) return <div className="p-20 text-center font-black text-slate-300 uppercase">Registry Loading...</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // This is the most important line to stop automatic redirects
    
    if (!name) return;

    try {
      // Send to Supabase via Context
      await addDriver({ name });
      
      // Update UI only
      setIsSuccess(true);
      setName('');
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-10 px-4">
      {isSuccess ? (
        <div className="bg-white p-12 rounded-[3rem] shadow-xl border-2 border-emerald-100 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900">Driver Logged!</h2>
          <p className="text-slate-500 mt-4 font-medium italic">
            Entry saved to the National Digital Driver Registry.
          </p>
          
          <div className="mt-10 flex flex-col gap-3">
            <button 
              onClick={() => setIsSuccess(false)}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-slate-800 transition"
            >
              Add Another Driver
            </button>
            <Link 
              href="/dashboard" 
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
            >
              <LayoutDashboard size={20} /> Back to Executive View
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-4 bg-blue-600 text-white rounded-2xl"><UserPlus /></div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">New Registration</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Full Legal Name</label>
              <input 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-6 bg-slate-50 rounded-[1.5rem] border-none font-bold text-lg focus:ring-2 focus:ring-blue-600 transition-all"
                placeholder="Enter Name (e.g. Juma Kapuya)"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-6 rounded-[1.5rem] font-black text-xl shadow-xl shadow-blue-100 active:scale-95 transition-all"
            >
              Confirm Registration
            </button>
          </form>
        </div>
      )}
    </div>
  );
}