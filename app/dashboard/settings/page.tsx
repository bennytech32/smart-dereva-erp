'use client';

import React from 'react';
import { Settings, Percent, ShieldAlert, Bell, Database, Save } from 'lucide-react';

export default function ERPSettings() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">ERP Settings</h1>
        <p className="text-slate-500 font-medium">Configure global parameters for the Digital Driver Registry.</p>
      </div>

      <div className="space-y-6">
        {/* 1. FINANCIAL CONFIGURATION */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Percent className="w-5 h-5" /></div>
            <h3 className="font-bold text-slate-800 text-xl">Revenue Model</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Management Fee (%)</label>
              <input type="number" defaultValue="15" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 font-bold" />
              <p className="text-[10px] text-slate-400 italic mt-1">Applied to all Corporate and Transit fleet payrolls.</p>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Currency Symbol</label>
              <input type="text" defaultValue="TZS" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 font-bold" />
            </div>
          </div>
        </div>

        {/* 2. COMPLIANCE THRESHOLDS */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><ShieldAlert className="w-5 h-5" /></div>
            <h3 className="font-bold text-slate-800 text-xl">Audit Sensitivity</h3>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div>
                <p className="font-bold text-slate-800">NIT Certificate Expiry Warning</p>
                <p className="text-xs text-slate-500">Alert admins 30 days before Level 2 cert expires.</p>
              </div>
              <input type="checkbox" defaultChecked className="w-6 h-6 rounded-lg text-blue-600 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        {/* 3. SYSTEM NOTIFICATIONS */}
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-white/10 rounded-lg text-blue-400"><Bell className="w-5 h-5" /></div>
            <h3 className="font-bold text-xl">Operational Alerts</h3>
          </div>
          <p className="text-slate-400 text-sm mb-6">Receive real-time notifications for unverified driver registrations.</p>
          <button className="flex items-center gap-2 bg-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
            <Database className="w-4 h-4" /> Link External Registry API
          </button>
        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black text-lg shadow-xl hover:bg-slate-800 transition-all transform active:scale-95">
            <Save className="w-5 h-5" /> Save ERP Configuration
          </button>
        </div>
      </div>
    </div>
  );
}