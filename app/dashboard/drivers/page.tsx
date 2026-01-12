'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Truck, Search, CheckCircle, XCircle, Shield, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function DriverPortal() {
  const [phone, setPhone] = useState('');
  const [driverData, setDriverData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDriverData(null);
    setHasSearched(true);

    // Find driver by phone
    const { data } = await supabase
      .from('drivers')
      .select('*')
      .eq('phone_number', phone)
      .single();

    if (data) {
      setDriverData(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 sm:p-8 font-sans">
      
      {/* 1. Header Area */}
      <div className="w-full max-w-md flex justify-between items-center mb-8 pt-4">
        <Link href="/" className="flex items-center gap-2 text-slate-900 font-extrabold text-xl">
          <div className="bg-blue-900 p-1.5 rounded-lg">
             <Truck className="w-5 h-5 text-white" />
          </div>
          Smart Dereva
        </Link>
        <div className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
          Portal v2.0
        </div>
      </div>

      {/* 2. Main Search Card */}
      {!driverData ? (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            
            <h1 className="text-2xl font-bold text-white mb-2 relative z-10">Driver Check-in</h1>
            <p className="text-slate-400 text-sm relative z-10">Enter your registered phone number to view your status and digital license.</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleCheck} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="07..." 
                    className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl text-lg font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none transition"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <button disabled={loading} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
                {loading ? 'Verifying...' : 'Check Status'}
              </button>
            </form>

            {hasSearched && !driverData && !loading && (
              <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-red-900 text-sm">Driver Not Found</h4>
                  <p className="text-red-700 text-xs mt-1">Please check the number or contact your fleet manager.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* 3. The Digital ID Card (Shows on Success) */
        <div className="w-full max-w-md animate-in slide-in-from-bottom-4 duration-500">
          
          {/* ID HEADER */}
          <div className="bg-slate-900 rounded-t-2xl p-6 text-white relative overflow-hidden border-b-4 border-yellow-400">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
             
             <div className="flex justify-between items-start relative z-10">
               <div>
                 <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Official Digital ID</p>
                 <h2 className="text-2xl font-bold">{driverData.full_name}</h2>
                 <p className="text-blue-200 text-sm flex items-center gap-1 mt-1">
                   <Shield className="w-3 h-3" /> Verified Driver
                 </p>
               </div>
               <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                 <Truck className="w-6 h-6 text-white" />
               </div>
             </div>
          </div>

          {/* ID BODY */}
          <div className="bg-white p-6 rounded-b-2xl shadow-xl border border-slate-100">
             
             {/* Status Badge */}
             <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-100">
                <span className="text-slate-500 text-sm font-bold">Current Status</span>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-2 ${
                  driverData.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${driverData.status === 'Active' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></span>
                  {driverData.status}
                </span>
             </div>

             {/* Details Grid */}
             <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                   <p className="text-slate-400 text-xs font-bold uppercase mb-1">License No.</p>
                   <p className="font-mono text-slate-900 font-bold bg-slate-50 p-2 rounded border border-slate-100 text-center">
                     {driverData.license_number}
                   </p>
                </div>
                <div>
                   <p className="text-slate-400 text-xs font-bold uppercase mb-1">Category</p>
                   <p className="font-sans text-slate-900 font-bold bg-slate-50 p-2 rounded border border-slate-100 text-center">
                     Class {driverData.category}
                   </p>
                </div>
             </div>

             {/* Footer Info */}
             <div className="bg-blue-50 p-4 rounded-xl flex items-center gap-3">
                <Calendar className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-blue-900 text-xs font-bold uppercase">License Expiry</p>
                  <p className="text-blue-700 font-bold">
                    {new Date(driverData.license_expiry).toLocaleDateString()}
                  </p>
                </div>
             </div>

             <button 
               onClick={() => setDriverData(null)}
               className="w-full mt-6 text-slate-400 text-sm font-bold hover:text-blue-600 transition"
             >
               Check Another ID
             </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto pt-8 text-slate-400 text-xs text-center">
        <p>&copy; 2026 Smart Dereva System.</p>
        <p className="mt-1">Authorized Personnel Only.</p>
      </div>

    </div>
  );
}