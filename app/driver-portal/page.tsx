'use client';

import { 
  TrendingUp, Users, AlertTriangle, FileText, 
  MoreHorizontal, ArrowUp, ArrowDown, RefreshCcw, 
  CheckCircle, Clock, MapPin 
} from 'lucide-react';

export default function Dashboard() {
  
  // 1. TOP STATS DATA
  const stats = [
    { 
      title: "Total Revenue (15%)", 
      value: "TZS 45.2M", 
      sub: "update: 2:15 am", 
      bg: "bg-blue-500", // Blue for Finance
      icon: <TrendingUp className="w-6 h-6 text-white/80" />
    },
    { 
      title: "Active Fleet", 
      value: "1,240", 
      sub: "update: 2:15 am", 
      bg: "bg-green-500", // Green for Active
      icon: <Users className="w-6 h-6 text-white/80" />
    },
    { 
      title: "Compliance Issues", 
      value: "12", 
      sub: "Action Required", 
      bg: "bg-red-500", // Red for Danger
      icon: <AlertTriangle className="w-6 h-6 text-white/80" />
    },
    { 
      title: "Pending Contracts", 
      value: "5", 
      sub: "New Clients", 
      bg: "bg-cyan-500", // Cyan/Teal for New Business
      icon: <FileText className="w-6 h-6 text-white/80" />
    }
  ];

  // 2. BOTTOM TABLE DATA
  const clients = [
    { name: "CRDB Bank HQ", drivers: 125, trend: "up", billing: "18.5M", status: "Paid" },
    { name: "Govt Transport", drivers: 340, trend: "stable", billing: "45.2M", status: "Processing" },
    { name: "NMB Zone A", drivers: 85, trend: "down", billing: "12.1M", status: "Paid" },
    { name: "Vodacom Fleet", drivers: 40, trend: "up", billing: "6.5M", status: "Pending" },
  ];

  return (
    <div className="space-y-6 font-sans text-slate-600">
      
      {/* 1. TOP STATS ROW (4 COLORED CARDS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bg} rounded-xl p-6 text-white shadow-lg relative overflow-hidden transition hover:-translate-y-1`}>
            <div className="relative z-10">
              <h4 className="text-blue-100/90 font-medium text-sm mb-1">{stat.title}</h4>
              <h2 className="text-3xl font-bold mb-4">{stat.value}</h2>
              <div className="flex items-center gap-2 text-xs font-medium bg-white/20 w-fit px-2 py-1 rounded">
                <Clock className="w-3 h-3" /> {stat.sub}
              </div>
            </div>
            {/* Background Icon Decoration */}
            <div className="absolute top-4 right-4 opacity-30 scale-150">
              {stat.icon}
            </div>
            {/* Chart Decoration */}
            <div className="absolute bottom-0 right-0 w-24 h-12 opacity-30">
               <svg viewBox="0 0 100 50" className="w-full h-full fill-current">
                  <path d="M0 50 L0 30 L20 20 L40 40 L60 10 L80 30 L100 0 L100 50 Z" />
               </svg>
            </div>
          </div>
        ))}
      </div>

      {/* 2. MIDDLE SECTION: CHART & RISK */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT: MAIN ANALYTICS CHART */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Revenue Growth (15% Fee)</h3>
              <p className="text-xs text-slate-400">Monthly billing performance vs targets.</p>
            </div>
            <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Custom SVG Line Chart */}
          <div className="h-64 w-full relative mt-8">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between text-xs text-slate-300">
              <div className="border-b border-dashed border-slate-100 w-full h-0"></div>
              <div className="border-b border-dashed border-slate-100 w-full h-0"></div>
              <div className="border-b border-dashed border-slate-100 w-full h-0"></div>
              <div className="border-b border-dashed border-slate-100 w-full h-0"></div>
              <div className="border-b border-slate-200 w-full h-0"></div>
            </div>
            
            {/* The Line */}
            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
              <path 
                d="M0,180 C100,150 200,200 300,100 C400,0 500,100 600,50 L800,20" 
                fill="none" 
                stroke="#3b82f6" 
                strokeWidth="3" 
                vectorEffect="non-scaling-stroke"
              />
              <path 
                d="M0,180 C100,150 200,200 300,100 C400,0 500,100 600,50 L800,20 L800,250 L0,250 Z" 
                fill="url(#blueGradient)" 
                opacity="0.1"
              />
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
            </svg>

            {/* X-Axis Labels */}
            <div className="absolute -bottom-6 w-full flex justify-between text-xs text-slate-400 font-medium">
              <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
            </div>
          </div>
        </div>

        {/* RIGHT: PROJECT RISK (RADIAL GAUGE) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center relative">
           <button className="absolute top-4 right-4 p-2 bg-cyan-50 text-cyan-600 rounded-lg">
             <RefreshCcw className="w-4 h-4" />
           </button>
           
           <h3 className="text-lg font-bold text-slate-800 w-full text-left mb-8">Fleet Compliance</h3>
           
           {/* CSS Radial Gauge */}
           <div className="relative w-40 h-40">
             <svg className="w-full h-full transform -rotate-90">
               <circle cx="80" cy="80" r="70" stroke="#f1f5f9" strokeWidth="12" fill="none" />
               <circle 
                 cx="80" 
                 cy="80" 
                 r="70" 
                 stroke="#f59e0b" // Amber color
                 strokeWidth="12" 
                 fill="none" 
                 strokeDasharray="440" 
                 strokeDashoffset="66" // 85% filled
                 strokeLinecap="round"
               />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-3xl font-bold text-slate-800">85%</span>
               <span className="text-xs text-slate-400 uppercase tracking-wide">Compliant</span>
             </div>
           </div>

           <div className="mt-8 text-center">
             <p className="text-sm font-bold text-amber-500">Moderate Risk</p>
             <p className="text-xs text-slate-400 mt-1 px-4">12 Drivers have expiring licenses. Action required immediately.</p>
             <button className="mt-4 bg-amber-500 text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-amber-600 transition">
               View Issues
             </button>
           </div>
        </div>
      </div>

      {/* 3. BOTTOM SECTION: TABLE & ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT: CORPORATE CLIENT TABLE */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Corporate Client Performance</h3>
            <button className="p-2 border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-50">View All</button>
          </div>

          <table className="w-full text-left border-collapse">
            <thead className="text-xs text-slate-400 font-bold uppercase border-b border-slate-100">
              <tr>
                <th className="py-3">Client Application</th>
                <th className="py-3">Drivers</th>
                <th className="py-3">Growth</th>
                <th className="py-3">Billing</th>
                <th className="py-3">Total</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {clients.map((client, i) => (
                <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition">
                  <td className="py-4 font-bold text-slate-700">{client.name}</td>
                  <td className="py-4 text-slate-500">{client.drivers}</td>
                  <td className="py-4">
                    {client.trend === 'up' && <div className="w-16 h-6"><svg viewBox="0 0 50 20" className="w-full h-full stroke-green-500 fill-none stroke-2"><path d="M0 20 L10 15 L20 18 L30 5 L40 10 L50 0" /></svg></div>}
                    {client.trend === 'down' && <div className="w-16 h-6"><svg viewBox="0 0 50 20" className="w-full h-full stroke-red-500 fill-none stroke-2"><path d="M0 0 L10 5 L20 2 L30 15 L40 10 L50 20" /></svg></div>}
                    {client.trend === 'stable' && <div className="w-16 h-6"><svg viewBox="0 0 50 20" className="w-full h-full stroke-slate-400 fill-none stroke-2"><path d="M0 10 L50 10" /></svg></div>}
                  </td>
                  <td className="py-4 font-mono text-slate-600">{client.billing}</td>
                  <td className="py-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      client.status === 'Paid' ? 'bg-green-100 text-green-700' : 
                      client.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RIGHT: USER ACTIVITY LIST */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
           <h3 className="text-lg font-bold text-slate-800 mb-6">Live Operations Log</h3>
           
           <div className="space-y-6">
             <div className="flex gap-4">
               <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">JK</div>
               <div>
                 <p className="text-sm font-bold text-slate-800">Juma Kapuya</p>
                 <p className="text-xs text-slate-500">Completed Trip: CRDB -&gt; Airport</p>
                 <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                   <Clock className="w-3 h-3" /> 2 min ago
                 </div>
               </div>
             </div>

             <div className="flex gap-4">
               <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">AM</div>
               <div>
                 <p className="text-sm font-bold text-slate-800">Ali Mwinyi</p>
                 <p className="text-xs text-slate-500">Clocked In (Standby - Ilala)</p>
                 <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                   <MapPin className="w-3 h-3" /> 15 min ago
                 </div>
               </div>
             </div>

             <div className="flex gap-4">
               <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">GP</div>
               <div>
                 <p className="text-sm font-bold text-slate-800">Grace Peter</p>
                 <p className="text-xs text-red-500 font-bold">Reported Breakdown: T 889 CYZ</p>
                 <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                   <AlertTriangle className="w-3 h-3 text-red-400" /> 1 hour ago
                 </div>
               </div>
             </div>
           </div>

           <button className="w-full mt-6 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50">
             View All Activity
           </button>
        </div>

      </div>

    </div>
  );
}