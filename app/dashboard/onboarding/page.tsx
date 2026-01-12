"use client";

import React, { useState } from 'react';
import { useDrivers } from '@/context/DriverContext';
import { useRouter } from 'next/navigation'; // Import the router for redirection
import { UserPlus, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function OnboardingPage() {
  const { addDriver, mounted } = useDrivers();
  const router = useRouter(); // Initialize router
  const [name, setName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!mounted) return <div className="p-20 text-center font-black text-slate-300">SYSTEM INITIALIZING...</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !addDriver) return;

    // 1. Send data to Supabase/Context
    await addDriver({ name, nit: 'Pending Review' });
    
    // 2. Show local success state
    setIsSuccess(true);
    setName('');

    // 3. FIX: Instead of going to driver portal, wait 2 seconds then go to Executive View
    setTimeout(() => {
      router.push('/dashboard'); // This takes you back to the Admin Dashboard
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto pt-10">
      {isSuccess ? (
        <div className="p-12 bg-white rounded-[3rem] shadow-xl border border-emerald-100 text-center animate-in zoom-in">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Registration Complete!</h2>
          <p className="text-slate-500 mt-2">Returning to Executive Overview...</p>
        </div>
      ) : (
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <UserPlus className="text-blue-600" /> Add New Driver
            </h1>
            <button onClick={() => router.push('/dashboard')} className="text-slate-400 hover:text-slate-600">
              <ArrowLeft size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2 tracking-widest">Driver Full Name</label>
              <input 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-5 bg-slate-50 rounded-2xl border-none font-bold focus:ring-2 focus:ring-blue-600"
                placeholder="e.g. Bakari Said"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 transition-transform active:scale-95">
              Submit to Registry
            </button>
          </form>
        </div>
      )}
    </div>
  );
}