"use client";

import React from 'react';
import { useDrivers } from '@/context/DriverContext';
import { 
  Users, ShieldCheck, TrendingUp, 
  AlertCircle, ArrowUpRight, Zap 
} from 'lucide-react';

export default function ExecutiveView() {
  const { drivers } = useDrivers();

  // LIVE ANALYTICS
  const pendingCount = drivers.filter((d: any) => d.status === 'Pending').length;
  const activeCount = drivers.filter((d: any) => d.status === 'Active').length;
  const bookedCount = drivers.filter((d: any) => d.booking !== 'None').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* 1. HEADER SECTION */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Executive Overview</h1>
          <p className="text-slate-500 font-medium italic">National Digital Driver Registry Control Panel.</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Last Updated</p>
          <p className="text-sm font-bold text-slate-900">Just Now</p>
        </div>
      </div>

      {/* 2. KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Vetted Fleet */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
          <Users className="absolute -right-2 -bottom-2 w-20 h-20 text-slate-50 opacity-50 group-hover:text-blue-50 transition-colors" />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vetted Fleet</p>
          <h3 className="text-3xl font-black text-slate-900 mt-2">{activeCount}</h3>
          <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
            <ArrowUpRight size={14} /> +{pendingCount} Pending Approval
          </p>
        </div>

        {/* Compliance Rating */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compliance Rate</p>
          <h3 className="text-3xl font-black text-slate-900 mt-2">92%</h3>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-emerald-500 h-full w-[92%] rounded-full" />
          </div>
        </div>

        {/* Active Trips */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Dispatch</p>
          <h3 className="text-3xl font-black text-slate-900 mt-2">{bookedCount}</h3>
          <p className="text-xs text-blue-600 font-bold mt-2 italic">Real-time tracking active</p>
        </div>

        {/* Management Revenue */}
        <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-100">
          <p className="text-[10px] font-black opacity-80 uppercase tracking-widest">Est. Revenue (15%)</p>
          <h3 className="text-3xl font-black mt-2">TZS 12.4M</h3>
          <TrendingUp className="mt-4 opacity-50" />
        </div>
      </div>

      {/* 3. CRITICAL ACTIONS & LIVE FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Driver Registration Requests */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-800">Pending Certifications</h3>
            <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">Action Required</span>
          </div>
          
          <div className="space-y-4">
            {pendingCount === 0 ? (
              <div className="text-center py-10">
                <ShieldCheck size={48} className="mx-auto text-slate-100 mb-4" />
                <p className="text-slate-400 font-medium">All drivers currently vetted and verified.</p>
              </div>
            ) : (
              drivers.filter((d: any) => d.status === 'Pending').map((driver: any) => (
                <div key={driver.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-transparent hover:border-blue-100 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-blue-600 shadow-sm">
                      {driver.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{driver.name}</p>
                      <p className="text-xs text-slate-500 font-medium">ID: {driver.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <p className="text-[10px] font-black text-amber-600 uppercase">NIT Status</p>
                      <p className="text-xs font-bold text-slate-700">Pending Review</p>
                    </div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Operational Shortcut */}
        <div className="bg-slate-900 p-8 rounded-[3rem] text-white flex flex-col justify-between">
          <div>
            <Zap className="text-blue-400 w-10 h-10 mb-6" />
            <h3 className="text-2xl font-black mb-2">Operations Terminal</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Verify pending drivers and assign them to active corporate fleet requests.
            </p>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black mt-8 transition-transform active:scale-95 shadow-lg shadow-blue-900/20">
            Open Dispatch Room
          </button>
        </div>
      </div>
    </div>
  );
}