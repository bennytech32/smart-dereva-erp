"use client";

import React, { useState } from 'react';
import { useDrivers } from '@/context/DriverContext';
import { UserPlus, ShieldCheck, UploadCloud, CheckCircle2 } from 'lucide-react';

export default function AddDriverPage() {
  const { addDriver } = useDrivers();
  
  // Local Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    nitNumber: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Validate Input
    if (!formData.name || !formData.nitNumber) {
      alert("Please enter both Name and NIT Number.");
      setIsSubmitting(false);
      return;
    }

    // 2. Trigger Context Action
    setTimeout(() => {
      addDriver({
        name: formData.name,
        phone: formData.phone,
        nitNumber: formData.nitNumber,
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
      setFormData({ name: '', phone: '', nitNumber: '' });
    }, 800);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto mt-20 p-12 bg-white rounded-[3rem] shadow-xl border border-emerald-100 text-center animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Driver Registered!</h2>
        <p className="text-slate-500 mt-2">The application has been sent to the Executive Dashboard for NIT Vetting.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-100">
          <UserPlus size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900">Add New Driver</h1>
          <p className="text-slate-500 font-medium">Register a new asset to the National Registry.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Legal Name</label>
              <input 
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 font-bold text-slate-800"
                placeholder="e.g. Juma Kapuya"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Phone Number</label>
              <input 
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full p-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 font-bold text-slate-800"
                placeholder="+255..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">NIT Level 2 Certificate No.</label>
            <div className="relative">
              <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              <input 
                required
                type="text"
                value={formData.nitNumber}
                onChange={(e) => setFormData({...formData, nitNumber: e.target.value})}
                className="w-full p-5 pl-14 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 font-bold text-slate-800"
                placeholder="NIT-LVL2-XXXXX"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex items-center justify-between group cursor-pointer hover:bg-slate-800 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-blue-400">
              <UploadCloud size={24} />
            </div>
            <div>
              <p className="font-bold">Digital Documentation</p>
              <p className="text-xs text-slate-500">Upload Police Clearance & NIT Scan</p>
            </div>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-700 px-3 py-1 rounded-lg">Required</span>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white py-6 rounded-[2rem] font-black text-xl shadow-xl shadow-blue-100 transition-all transform active:scale-95"
        >
          {isSubmitting ? "Verifying..." : "Complete Registration"}
        </button>
      </form>
    </div>
  );
}