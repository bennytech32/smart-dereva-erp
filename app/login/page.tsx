'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { User, Lock, Building2, ShieldCheck, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<'admin' | 'client'>('admin'); 
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Supabase Auth
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      // if (error) throw error; // Uncomment when Supabase is fully active

      // 2. Redirect based on Role
      if (role === 'client') {
        router.push('/client-portal');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      // Force redirect for demo
      if (role === 'client') router.push('/client-portal');
      else router.push('/dashboard');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative flex items-center justify-center overflow-hidden font-sans text-slate-600">
      
      {/* 1. BLUE WAVE BACKGROUND */}
      <div className="absolute bottom-0 left-0 w-full leading-none">
        <svg className="relative block w-[calc(100%+1.3px)] h-[50vh]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#2563eb"></path>
        </svg>
        <div className="bg-blue-600 h-[40vh] w-full"></div>
      </div>

      {/* 2. LOGIN CARD */}
      <div className="relative z-10 w-full max-w-sm">
        
        {/* Floating Circle Icon */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
           <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 border-slate-50 shadow-xl transition-colors duration-300 ${role === 'admin' ? 'bg-slate-800' : 'bg-blue-600'}`}>
              {role === 'admin' ? <ShieldCheck className="w-10 h-10 text-white" /> : <Building2 className="w-10 h-10 text-white" />}
           </div>
        </div>

        <div className="bg-white rounded-xl shadow-2xl pt-16 pb-8 px-8">
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-wide">
              {role === 'admin' ? 'Admin Login' : 'Partner Portal'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">Smart Dereva ERP System</p>
          </div>

          {/* Role Toggle (Subtle) */}
          <div className="flex justify-center mb-6">
             <div className="bg-slate-100 p-1 rounded-lg inline-flex">
                <button 
                  onClick={() => setRole('admin')} 
                  className={`px-4 py-1.5 text-xs font-bold rounded-md transition ${role === 'admin' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Admin
                </button>
                <button 
                  onClick={() => setRole('client')} 
                  className={`px-4 py-1.5 text-xs font-bold rounded-md transition ${role === 'client' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Client
                </button>
             </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 text-xs font-bold rounded text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
               <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
               <input 
                 type="email" 
                 required
                 placeholder="Username" 
                 className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition"
                 onChange={(e) => setFormData({...formData, email: e.target.value})}
               />
            </div>

            <div className="relative">
               <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
               <input 
                 type="password" 
                 required
                 placeholder="Password" 
                 className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition"
                 onChange={(e) => setFormData({...formData, password: e.target.value})}
               />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
               <label className="flex items-center gap-2 cursor-pointer">
                 <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                 Remember me
               </label>
               <a href="#" className="hover:text-blue-600">Forgot password?</a>
            </div>

            <button 
              disabled={loading}
              className={`w-full py-3.5 text-white font-bold rounded-lg shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 ${
                role === 'admin' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-blue-600 hover:bg-blue-500'
              }`}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'LOGIN'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-blue-600 transition">
              Register New Account
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}