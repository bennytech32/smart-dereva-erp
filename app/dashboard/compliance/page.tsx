'use client';

import React from 'react';
import { ShieldCheck, AlertCircle, CheckCircle2, Search, Filter } from 'lucide-react';

const drivers = [
  { id: 'DRV001', name: 'Juma Kapuya', nit: 'Level 2 Certified', police: 'Verified', status: 'Active' },
  { id: 'DRV002', name: 'Ali Mwinyi', nit: 'Expiring Soon', police: 'Verified', status: 'Warning' },
  { id: 'DRV003', name: 'Said Bakari', nit: 'Level 2 Certified', police: 'Pending', status: 'Action Required' },
];

export default function ComplianceAudit() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* 1. COMPLIANCE SUMMARY HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Compliance Audit</h1>
          <p className="text-slate-500 font-medium">Monitoring certification validity across the National Registry.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search ID..." className="bg-transparent border-none text-sm focus:ring-0" />
          </div>
          <button className="bg-slate-900 text-white p-3 rounded-xl hover:bg-slate-800 transition">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. REAL-TIME GAUGES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-black">92%</div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">NIT Certified</p>
            <p className="text-sm font-bold text-slate-700">Goal: 100%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 font-black">88%</div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Police Verified</p>
            <p className="text-sm font-bold text-slate-700">Verified Monthly</p>
          </div>
        </div>
      </div>

      {/* 3. AUDIT TABLE */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Driver</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">NIT Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Police Record</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {drivers.map((driver) => (
              <tr key={driver.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6">
                  <p className="font-bold text-slate-900">{driver.name}</p>
                  <p className="text-xs text-slate-400 font-medium">{driver.id}</p>
                </td>
                <td className="px-8 py-6">
                  <span className={`flex items-center gap-2 text-xs font-bold ${driver.status === 'Active' ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {driver.status === 'Active' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {driver.nit}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-black text-slate-600 uppercase">
                    {driver.police}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <button className="text-blue-600 text-xs font-black hover:underline">VIEW FILES</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}