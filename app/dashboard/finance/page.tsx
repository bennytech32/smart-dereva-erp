'use client';

import { 
  CreditCard, Download, Plus, 
  ArrowUpRight, CheckCircle, AlertCircle, 
  Receipt, Wallet
} from 'lucide-react';

export default function FinancePage() {
  // MOCK DATA: These would be populated automatically from the Operations Dispatch
  const recentBillings = [
    { 
      id: "INV-901", 
      client: "CRDB Bank HQ", 
      description: "Replacement Dispatch (Req: 901)", 
      gross: 45000, 
      fee: 6750, // 15%
      total: 51750, 
      status: "Paid", 
      date: "Jan 12" 
    },
    { 
      id: "INV-902", 
      client: "NMB Bank", 
      description: "Monthly Transit Contract", 
      gross: 8500000, 
      fee: 1275000, 
      total: 9775000, 
      status: "Pending", 
      date: "Jan 12" 
    }
  ];

  return (
    <div className="space-y-8 font-sans">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Finance & Billing</h1>
          <p className="text-slate-500 mt-1">Automated Cost-Plus invoicing linked to Dispatch.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 shadow-lg hover:bg-blue-700 transition">
            <Plus className="w-4 h-4" /> Manual Invoice
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-blue-600">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Management Fees (15%)</p>
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-extrabold text-slate-900">TZS 12.4M</h3>
            <span className="text-blue-600 text-[10px] font-bold bg-blue-50 px-2 py-1 rounded">THIS MONTH</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-amber-500">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Smart Club Revenue</p>
          <h3 className="text-2xl font-extrabold text-slate-900">TZS 3.2M</h3>
          <p className="text-[10px] text-amber-600 font-bold uppercase mt-1">Recurring Income</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pending Invoices</p>
          <h3 className="text-2xl font-extrabold text-slate-900">TZS 8.7M</h3>
          <p className="text-[10px] text-emerald-600 font-bold uppercase mt-1">Ready for Collection</p>
        </div>
      </div>

      {/* Live Billing Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2 uppercase tracking-wide">
            <Receipt className="w-4 h-4 text-blue-600" /> Automated Billing Log
          </h3>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="p-4">Client & Trip</th>
              <th className="p-4">Gross Cost</th>
              <th className="p-4 text-blue-600">Mgmt Fee (15%)</th>
              <th className="p-4">Total Payable</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {recentBillings.map((bill) => (
              <tr key={bill.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition">
                <td className="p-4">
                  <div className="font-bold text-slate-800">{bill.client}</div>
                  <div className="text-[10px] text-slate-400">{bill.description}</div>
                </td>
                <td className="p-4 font-mono text-slate-500">{bill.gross.toLocaleString()}</td>
                <td className="p-4 font-mono font-bold text-blue-600">+{bill.fee.toLocaleString()}</td>
                <td className="p-4 font-mono font-bold text-slate-900">{bill.total.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase flex items-center gap-1 w-fit ${
                    bill.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {bill.status === 'Paid' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    {bill.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}