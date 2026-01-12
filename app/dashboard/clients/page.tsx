'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Building2, Phone } from 'lucide-react';
import Link from 'next/link';

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
      if (data) setClients(data);
    };
    fetchClients();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Corporate Clients</h1>
          <p className="text-gray-500">Manage B2B contracts and companies.</p>
        </div>
        <Link href="/dashboard/clients/add" className="bg-blue-900 text-white px-4 py-2 rounded-lg font-bold flex gap-2 hover:bg-blue-800">
          <Plus className="w-5 h-5" /> Add Client
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clients.length === 0 ? (
           <div className="col-span-3 p-12 text-center bg-white rounded-xl border border-gray-200">
             <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3"/>
             <p className="text-gray-500">No clients found. Add your first corporate partner.</p>
           </div>
        ) : (
          clients.map((client) => (
            <div key={client.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-purple-50 text-purple-700 rounded-lg">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {client.status}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-1">{client.company_name}</h3>
              <p className="text-sm text-gray-500 mb-4">Contact: {client.contact_person}</p>
              
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" /> {client.phone_number}
                </div>
                <div className="flex justify-between items-center text-sm font-medium pt-2">
                  <span className="text-gray-500">Contract Value:</span>
                  <span className="text-blue-900">{Number(client.contract_value).toLocaleString()} TZS</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}