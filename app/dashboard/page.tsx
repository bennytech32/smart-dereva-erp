"use client";

import React from 'react';
import { useDrivers } from '@/context/DriverContext';
import { Users, ShieldCheck, TrendingUp, Zap, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function ExecutiveView() {
  const { drivers, mounted } = useDrivers();

  // 🛡️ SAFETY GUARD: If the app hasn't "mounted" in the browser, show a professional skeleton
  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-black text-slate-400 tracking-widest uppercase">Securing Registry...</h2>
        </div>
      </div>
    );
  }

  // Calculate live data once mounted
  const pendingCount = drivers.filter((d: any) => d.status === 'Pending').length;
  const activeCount = drivers.filter((d: any) => d.status === 'Active').length;
  const bookedCount = drivers.filter((d: any) => d.booking !== 'None').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Executive Overview</h1>
          <p className="text-slate-500 font-medium italic">National Digital Driver Registry Control Panel</p>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vetted Fleet</p>
          <h3 className="text-3xl font-black text-slate-900 mt-2">{activeCount}</h3>
          <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
            <ArrowUpRight size={14} /> +{pendingCount} Pending
          </p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compliance Rate</p>
          <h3 className="text-3xl font-black text-slate-900 mt-2">92%</h3>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-emerald-500 h-full w-[92%] rounded-full" />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Dispatch</p>
          <h3 className="text-3xl font-black text-slate-900 mt-2">{bookedCount}</h3>
        </div>

        <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-100">
          <p className="text-[10px] font-black opacity-80 uppercase tracking-widest">Est. Revenue (15%)</p>
          <h3 className="text-3xl font-black mt-2">TZS 12.4M</h3>
          <TrendingUp className="mt-4 opacity-50" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* RECENT APPLICATIONS */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-800 mb-6 tracking-tight">Pending Certification Requests</h3>
          <div className="space-y-4">
            {pendingCount === 0 ? (
              <p className="text-slate-400 text-sm italic py-10 text-center">No new applications at this time.</p>
            ) : (
              drivers.filter((d: any) => d.status === 'Pending').map((driver: any) => (
                <div key={driver.id} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-blue-600 shadow-sm">
                      {driver.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{driver.name}</p>
                      <p className="text-[10px] text-amber-600 font-black uppercase tracking-widest">NIT Review Pending</p>
                    </div>
                  </div>
                  <Link href="/dashboard/operations" className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black hover:bg-blue-600 transition">
                    VIEW DETAILS
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* OPERATION TERMINAL BOX */}
        <div className="bg-slate-900 p-8 rounded-[3rem] text-white flex flex-col justify-between">
          <div>
            <Zap className="text-blue-400 w-10 h-10 mb-6" />
            <h3 className="text-2xl font-black mb-2 tracking-tight">Operations Terminal</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Verify pending drivers and assign them to active corporate fleet requests.
            </p>
          </div>
          <Link href="/dashboard/operations" className="w-full bg-blue-600 hover:bg-blue-700 text-center text-white py-5 rounded-2xl font-black mt-8 transition-all block">
            Open Dispatch Room
          </Link>
        </div>
      </div>
    </div>
  );
}