'use client';

import { useState } from 'react';
import { 
  Building2, Users, FileText, Phone, 
  Search, Download, AlertCircle, RefreshCw, 
  CheckCircle, Truck, Calendar
} from 'lucide-react';

export default function ClientPortal() {
  const [activeTab, setActiveTab] = useState('fleet');

  // MOCK DATA: What the Client (e.g., CRDB Bank) sees
  const clientName = "CRDB Bank HQ";
  const accountManager = "Benjamin Maudy";
  const managerPhone = "+255 745 517 500";

  const myFleet = [
    { id: "SD-001", name: "Juma Kapuya", role: "Staff Bus", phone: "0712-345-678", status: "Active", location: "Posta Branch", compliance: true },
    { id: "SD-005", name: "David Mwaipopo", role: "Executive", phone: "0755-112-233", status: "On Leave", location: "Dar es Salaam", compliance: true },
    { id: "SD-012", name: "Hassan Ali", role: "Logistics", phone: "0688-990-011", status: "Active", location: "Kijitonyama", compliance: true },
  ];

  const myInvoices = [
    { id: "INV-2026-001", month: "January 2026", amount: 7200000, status: "Paid", date: "2026-01-05" },
    { id: "INV-2026-002", month: "February 2026", amount: 7200000, status: "Unpaid", date: "2026-02-01" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* 1. BRANDED HEADER */}
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
               <Building2 className="w-6 h-6 text-blue-300" />
             </div>
             <div>
               <h1 className="font-bold text-lg leading-none">{clientName}</h1>
               <p className="text-xs text-blue-300">Corporate Partner Portal</p>
             </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="text-xs text-blue-300 uppercase font-bold">Your Account Manager</p>
              <p className="font-bold">{accountManager}</p>
            </div>
            <a href={`tel:${managerPhone}`} className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition shadow-lg">
              <Phone className="w-4 h-4" /> Support Line
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* 2. STATS OVERVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Assigned Drivers</p>
                <h3 className="text-3xl font-extrabold text-slate-900">12</h3>
                <p className="text-xs text-green-600 font-bold">100% Attendance Today</p>
              </div>
           </div>

           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="bg-amber-50 p-3 rounded-xl text-amber-600">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Outstanding Balance</p>
                <h3 className="text-3xl font-extrabold text-slate-900">7.2M</h3>
                <p className="text-xs text-amber-600 font-bold">Invoice #INV-2026-002</p>
              </div>
           </div>

           <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-2xl shadow-lg text-white flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-blue-200 uppercase">Need a Replacement?</p>
                <h3 className="text-xl font-bold mt-1">Driver Sick/Leave?</h3>
                <p className="text-xs text-blue-100 mt-2">Request instant standby driver.</p>
              </div>
              <button className="bg-white text-blue-900 px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition">
                Request Now
              </button>
           </div>
        </div>

        {/* 3. MAIN CONTENT TABS */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
           <div className="border-b border-slate-100 flex">
             <button 
               onClick={() => setActiveTab('fleet')}
               className={`px-8 py-4 text-sm font-bold border-b-2 transition flex items-center gap-2 ${activeTab === 'fleet' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
             >
               <Truck className="w-4 h-4" /> My Fleet
             </button>
             <button 
               onClick={() => setActiveTab('billing')}
               className={`px-8 py-4 text-sm font-bold border-b-2 transition flex items-center gap-2 ${activeTab === 'billing' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
             >
               <FileText className="w-4 h-4" /> Billing & Invoices
             </button>
           </div>

           <div className="p-6">
             {activeTab === 'fleet' ? (
               /* FLEET TABLE */
               <div>
                 <div className="flex justify-between items-center mb-6">
                   <div className="relative w-64">
                     <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                     <input type="text" placeholder="Search driver..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
                   </div>
                   <div className="text-xs text-slate-500">
                     <span className="font-bold text-green-600 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> All Licenses Valid</span>
                   </div>
                 </div>

                 <table className="w-full text-left">
                   <thead className="text-xs font-bold text-slate-400 uppercase bg-slate-50 rounded-lg">
                     <tr>
                       <th className="p-3">Driver Name</th>
                       <th className="p-3">Role</th>
                       <th className="p-3">Contact</th>
                       <th className="p-3">Status</th>
                       <th className="p-3">Action</th>
                     </tr>
                   </thead>
                   <tbody className="text-sm">
                     {myFleet.map((driver) => (
                       <tr key={driver.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                         <td className="p-4 font-bold text-slate-900">
                           {driver.name}
                           <div className="text-[10px] text-slate-400 font-normal">{driver.id}</div>
                         </td>
                         <td className="p-4">{driver.role}</td>
                         <td className="p-4 font-mono">{driver.phone}</td>
                         <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              driver.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {driver.status}
                            </span>
                         </td>
                         <td className="p-4">
                           {driver.status === 'On Leave' ? (
                             <button className="text-blue-600 font-bold text-xs hover:underline flex items-center gap-1">
                               <RefreshCw className="w-3 h-3" /> Request Sub
                             </button>
                           ) : (
                             <button className="text-slate-400 font-bold text-xs hover:text-slate-600">Report Issue</button>
                           )}
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             ) : (
               /* BILLING TABLE */
               <div>
                 <div className="flex justify-between items-center mb-6">
                   <h3 className="font-bold text-lg">Payment History</h3>
                   <button className="text-sm text-blue-600 font-bold hover:underline">Download Statement</button>
                 </div>
                 <table className="w-full text-left">
                   <thead className="text-xs font-bold text-slate-400 uppercase bg-slate-50 rounded-lg">
                     <tr>
                       <th className="p-3">Invoice ID</th>
                       <th className="p-3">Billing Period</th>
                       <th className="p-3">Date Issued</th>
                       <th className="p-3">Amount (TZS)</th>
                       <th className="p-3">Status</th>
                       <th className="p-3">Download</th>
                     </tr>
                   </thead>
                   <tbody className="text-sm">
                     {myInvoices.map((inv) => (
                       <tr key={inv.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                         <td className="p-4 font-mono font-bold text-slate-600">{inv.id}</td>
                         <td className="p-4 font-bold text-slate-900">{inv.month}</td>
                         <td className="p-4">{inv.date}</td>
                         <td className="p-4 font-mono font-bold">{inv.amount.toLocaleString()}</td>
                         <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              inv.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {inv.status}
                            </span>
                         </td>
                         <td className="p-4">
                           <button className="flex items-center gap-1 text-blue-600 font-bold text-xs hover:underline">
                             <Download className="w-3 h-3" /> PDF
                           </button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             )}
           </div>
        </div>

      </main>
    </div>
  );
}