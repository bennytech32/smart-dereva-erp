'use client';

import { 
  BarChart3, TrendingUp, PieChart, Users, 
  ArrowUpRight, ArrowDownRight, Download, Calendar, 
  ChevronRight, Award 
} from 'lucide-react';

export default function ReportsPage() {
  const topDrivers = [
    { name: "Juma Kapuya", rating: 4.9, trips: 142, revenue: "TZS 3.2M" },
    { name: "Amina Juma", rating: 4.8, trips: 128, revenue: "TZS 2.9M" },
    { name: "Hassan Juma", rating: 4.7, trips: 115, revenue: "TZS 2.5M" },
  ];

  return (
    <div className="space-y-8 font-sans">
      
      {/* 1. HEADER & ACTIONS */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Intelligence</h1>
          <p className="text-slate-500 mt-1">Performance analytics for the National Digital Driver Registry.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 hover:bg-slate-50 shadow-sm transition">
            <Calendar className="w-4 h-4" /> Jan 2026
          </button>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 shadow-lg hover:bg-slate-800 transition">
            <Download className="w-4 h-4" /> Export Executive Report
          </button>
        </div>
      </div>

      {/* 2. TREND KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: "TZS 145M", trend: "+12.5%", up: true },
          { label: "Net Profit (15%)", value: "TZS 21.7M", trend: "+8.2%", up: true },
          { label: "Fleet Growth", value: "+42", trend: "+4.1%", up: true },
          { label: "Avg Rating", value: "4.82", trend: "-0.2%", up: false },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</p>
            <div className="flex justify-between items-end mt-2">
              <h3 className="text-2xl font-extrabold text-slate-900">{kpi.value}</h3>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-0.5 ${
                kpi.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* REVENUE GROWTH CHART (Visual representation) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase tracking-tight text-sm">
              <TrendingUp className="w-4 h-4 text-blue-600" /> Revenue Growth (Last 6 Months)
            </h3>
          </div>
          <div className="h-64 flex items-end gap-3 px-2">
            {[35, 45, 60, 55, 85, 100].map((height, i) => (
              <div key={i} className="flex-1 group relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition shadow-xl">
                  {height}%
                </div>
                <div 
                  className="w-full bg-blue-600/10 rounded-t-xl group-hover:bg-blue-600/20 transition-all duration-500 relative overflow-hidden" 
                  style={{ height: '100%' }}
                >
                  <div 
                    className="absolute bottom-0 w-full bg-blue-600 rounded-t-xl transition-all duration-700 delay-100" 
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-slate-400 font-bold mt-3 text-center uppercase tracking-tighter">Month {i+1}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TOP PERFORMERS LIST */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase tracking-tight text-sm mb-6">
            <Award className="w-4 h-4 text-amber-500" /> Star Drivers (NIT Verified)
          </h3>
          <div className="space-y-5">
            {topDrivers.map((driver, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition cursor-pointer border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600 border border-slate-200">
                    {driver.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{driver.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold">★ {driver.rating} • {driver.trips} Trips</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-blue-600">{driver.revenue}</p>
                  <ChevronRight className="w-4 h-4 text-slate-300 ml-auto mt-1" />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 border-t border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-blue-600 transition">
            View All Performance Logs
          </button>
        </div>
      </div>

      {/* 4. FLEET UTILIZATION MAP/LIST */}
      <div className="bg-slate-900 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Fleet Utilization is at 94.2%</h2>
          <p className="text-slate-400 text-sm max-w-md">Your drivers are currently highly engaged. Consider activating the **Driver Recruitment Pipeline** to meet upcoming demand for February.</p>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-blue-400">1,168</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Deployed</span>
            </div>
            <div className="w-[1px] bg-slate-800 h-10"></div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-amber-400">72</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Standby</span>
            </div>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-2xl transition transform active:scale-95 whitespace-nowrap">
          Open Recruitment Portal
        </button>
      </div>

    </div>
  );
}