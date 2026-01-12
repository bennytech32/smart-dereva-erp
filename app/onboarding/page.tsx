"use client";
import React, { useState } from 'react';
import { useDrivers } from '@/context/DriverContext';
import { UserPlus, CheckCircle2 } from 'lucide-react';

export default function OnboardingPage() {
  // Use the safe hook
  const { addDriver, mounted } = useDrivers();
  const [name, setName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // 🛡️ If the app hasn't "mounted" in the browser yet, show a loading state
  if (!mounted) {
    return (
      <div className="p-10 text-center animate-pulse text-slate-300 font-black">
        CONNECTING TO REGISTRY...
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !addDriver) return;

    addDriver({ name, nit: 'Pending Review' });
    setIsSuccess(true);
    setName('');
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto pt-10">
      {isSuccess && (
        <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 flex items-center gap-3">
          <CheckCircle2 size={20} />
          <span className="font-bold">Application Sent! Admin will vet your profile.</span>
        </div>
      )}

      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
        <h1 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
          <UserPlus className="text-blue-600" /> Driver Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 font-bold"
            placeholder="Enter Full Legal Name"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-100">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}