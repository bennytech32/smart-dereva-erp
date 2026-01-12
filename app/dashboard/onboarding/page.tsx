"use client";

import React, { useState } from 'react';
// Correct relative path to reach context from app/dashboard/onboarding/
import { useDrivers } from '../../../context/DriverContext';
import { UserPlus, CheckCircle2 } from 'lucide-react';

export default function OnboardingPage() {
  const { addDriver } = useDrivers();
  const [name, setName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    addDriver({ name, nit: 'Pending Review' });
    setIsSuccess(true);
    setName('');
    
    // Hide success message after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto pt-10">
      {isSuccess && (
        <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 flex items-center gap-3 animate-in fade-in zoom-in">
          <CheckCircle2 size={20} />
          <span className="font-bold">Driver added to the Registry! Check the Executive View.</span>
        </div>
      )}

      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg">
            <UserPlus size={24} />
          </div>
          <h1 className="text-3xl font-black text-slate-900">Add New Driver</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400 ml-2">Full Legal Name</label>
            <input 
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 font-bold"
              placeholder="e.g. Juma Kapuya"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
}