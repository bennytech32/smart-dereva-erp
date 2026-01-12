'use client';

import { 
  User, ShieldCheck, FileText, Calendar, 
  MapPin, Award, Star, CheckCircle2, AlertCircle
} from 'lucide-react';

export default function DriverRegistryPage() {
  // Sample registry data
  const drivers = [
    {
      id: "SD-1042",
      name: "Juma Kapuya",
      area: "Posta, DSM",
      rating: 4.9,
      club: "Platinum",
      nitStatus: "Verified",
      policeStatus: "Verified",
      licenseExpiry: "2027-05-12",
      status: "On Duty"
    },
    {
      id: "SD-1055",
      name: "Amina Juma",
      area: "Ilala, DSM",
      rating: 4.8,
      club: "Gold",
      nitStatus: "Verified",
      policeStatus: "Pending",
      licenseExpiry: "2026-11-30",
      status: "Standby"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Driver Registry</h1>
          <p className="text-slate-500 font-medium">Managing the National Vetted Driver Database.</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl hover:bg-slate-800 transition flex items-center gap-2">
          <User className="w-4 h-4" /> Add New Driver
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {drivers.map((driver) => (
          <div key={driver.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              {/* Profile Info */}
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100 relative">
                  <User className="w-8 h-8" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-slate-900">{driver.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                      driver.club === 'Platinum' ? 'bg-purple-100 text-purple-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {driver.club} Club
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-400 mt-1 flex items-center gap-1 uppercase tracking-tighter">
                    <MapPin className="w-3 h-3" /> {driver.area} • ID: {driver.id}
                  </p>
                </div>
              </div>

              {/* Vetting Status */}
              <div className="flex flex-wrap gap-4">
                <div className="px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 text-center min-w-[100px]">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1">NIT Vetting</p>
                  <div className="flex items-center justify-center gap-1 text-emerald-600 text-xs font-bold">
                    <ShieldCheck className="w-3 h-3" /> {driver.nitStatus}
                  </div>
                </div>
                <div className="px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 text-center min-w-[100px]">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Police Clearance</p>
                  <div className={`flex items-center justify-center gap-1 text-xs font-bold ${
                    driver.policeStatus === 'Verified' ? 'text-emerald-600' : 'text-amber-600'
                  }`}>
                    {driver.policeStatus === 'Verified' ? <ShieldCheck className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    {driver.policeStatus}
                  </div>
                </div>
                <div className="px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 text-center min-w-[100px]">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1">License Expiry</p>
                  <div className="text-slate-700 text-xs font-bold">
                    {driver.licenseExpiry}
                  </div>
                </div>
              </div>

              {/* Action */}
              <button className="w-full md:w-auto px-6 py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition">
                View Full Dossier
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* COMPLIANCE WARNING BANNER */}
      <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-amber-600 mt-1" />
        <div>
          <h4 className="font-bold text-amber-900 text-sm">Action Required: Compliance Audit</h4>
          <p className="text-xs text-amber-700 mt-1 leading-relaxed">
            There are <strong>12 drivers</strong> with expiring Police Clearance certificates. To maintain our corporate service level agreement (SLA), these documents must be updated within 7 days or the drivers will be automatically moved to "Inactive" status.
          </p>
        </div>
      </div>
    </div>
  );
}