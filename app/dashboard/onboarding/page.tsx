"use client";

import React, { useState } from 'react';
import { useDrivers } from '@/context/DriverContext';
import { UserPlus, CheckCircle2, LayoutDashboard, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function OnboardingPage() {
  const { addDriver, mounted } = useDrivers();
  const [name, setName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!mounted) return <div className="p-20 text-center font-black text-slate-200 uppercase tracking-widest">Registry Syncing...</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    // 🛡️ STOP ALL AUTOMATIC BROWSER BEHAVIOR
    e.preventDefault(); 
    e.stopPropagation(); 
    
    if (!name || loading) return;

    setLoading(true);

    try {
      // 1. Update Supabase/Global State
      await addDriver({ name });
      
      // 2. STAY ON THIS PAGE - Only change the UI state
      setIsSuccess(true);
      setName('');
    } catch (err) {
      console.error("Save Error:", err);
      alert("Error saving to Registry. Please check your Supabase connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-10 px-4">
      {isSuccess ? (
        /* SUCCESS VIEW: This shows INSTEAD of the form, preventing any redirect */
        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border-2 border-emerald-50 text-center animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Driver Vetting Initialized</h2>
          <p className="text-slate-500 mt-4 font-medium leading-relaxed">
            Data successfully pushed to the National Digital Driver Registry.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={(e) => { e.preventDefault(); setIsSuccess(false); }}
              className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-5 rounded-2xl font-black hover:bg-slate-800 transition-all active:scale-95"
            >
              <PlusCircle size={20} /> Register Another
            </button>
            <Link 
              href="/dashboard" 
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-5 rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
            >
              <LayoutDashboard size={20} /> Executive View
            </Link>
          </div>
        </div>
      ) : (
        /* FORM VIEW: Purely client-side handled */
        <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100">
          <div className="flex items-center gap-5 mb-12">
            <div className="p-5 bg-blue-600 text-white rounded-[1.5rem] shadow-xl shadow-blue-100">
              <UserPlus size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">New Applicant</h1>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Registry Entry Terminal</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] ml-3">Full Legal Name</label>
              <input 
                required
                disabled={loading}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-7 bg-slate-50 rounded-[2rem] border-none font-bold text-xl text-slate-800 focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-slate-300"
                placeholder="Enter Full Name..."
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white py-7 rounded-[2rem] font-black text-xl shadow-2xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.97] transition-all disabled:bg-slate-200 disabled:text-slate-400"
            >
              {loading ? "Processing Registry..." : "Confirm Registration"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}