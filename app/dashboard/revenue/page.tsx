'use client';

import React from 'react';
import { TrendingUp, DollarSign, Wallet, ArrowUpRight, Calendar } from 'lucide-react';

export default function RevenuePipeline() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* 1. FINANCIAL SUMMARY HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Revenue Pipeline</h1>
          <p className="text-slate-500 font-medium">Tracking the 15% Management Fee across the registry.</p>
        </div>
        <div className="bg-white p-2 rounded-2xl border border-slate-100 flex items-center gap-2 shadow-sm">
          <Calendar className="w-4 h-4 text-blue-600 ml-2" />
          <select className="bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer pr-8">
            <option>Current Month</option>
            <option>Last Quarter</option>
          </select>
        </div>
      </div>

      {/* 2. REVENUE KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-100 relative overflow-hidden">
          <TrendingUp className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Total Mgmt Fee (15%)</p>
          <h3 className="text-4xl font-black mt-2">TZS 12.4M</h3>
          <div className="flex items-center gap-2 mt-4 text-xs font-bold bg-white/20 w-fit px-3 py-1 rounded-full">
            <ArrowUpRight className="w-3 h-3" /> +12% vs last month
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <Wallet className="text-slate-900 w-6 h-6" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Settlements</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">TZS 3.2M</h3>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <DollarSign className="text-emerald-600 w-6 h-6" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Corporate Payroll Dist.</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">TZS 84.5M</h3>
        </div>
      </div>

      {/* 3. TRANSACTION LEDGER */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50">
          <h3 className="font-bold text-slate-800 text-lg">Recent Collections</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client / Fleet</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Value</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Our Fee (15%)</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { client: 'Transit Fleet A', total: 'TZS 1,200,000', fee: '180,000', status: 'Collected' },
                { client: 'Government Logistics', total: 'TZS 4,500,000', fee: '675,000', status: 'Pending' },
                { client: 'Corporate On-Demand', total: 'TZS 850,000', fee: '127,500', status: 'Collected' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6 font-bold text-slate-900">{row.client}</td>
                  <td className="px-8 py-6 text-sm font-medium text-slate-600">{row.total}</td>
                  <td className="px-8 py-6 text-sm font-black text-blue-600">{row.fee}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      row.status === 'Collected' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}