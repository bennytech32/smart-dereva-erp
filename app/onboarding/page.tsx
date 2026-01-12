"use client";

import React, { useState } from 'react';
import { useDrivers } from '@/context/DriverContext';
import { UserPlus, CheckCircle2 } from 'lucide-react';

export default function OnboardingPage() {
  const context = useDrivers(); // Get the whole context first
  const [name, setName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // SAFETY GUARD: If context hasn't loaded yet, show a loading state
  if (!context) {
    return <div className="p-10 text-slate-400 font-bold">Initializing Registry...</div>;
  }

  const { addDriver } = context;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    addDriver({ name, nit: 'Pending Review' });
    setIsSuccess(true);
    setName('');
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto pt-10">
      {/* ... keep the rest of your UI code here ... */}
       <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
        <h1 className="text-3xl font-black mb-8">Add New Driver</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full p-5 bg-slate-50 rounded-2xl border-none" 
            placeholder="Full Name" 
          />
          <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black">
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
}