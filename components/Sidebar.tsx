'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Zap, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  Facebook, 
  Linkedin, 
  Twitter,
  UserPlus,
  TrendingUp // Icon for Revenue
} from 'lucide-react';

/**
 * The Sidebar is the primary navigation hub for the Smart Dereva ERP.
 * It now includes the Revenue Pipeline to track the 15% Management Fee.
 */
const menuItems = [
  { name: 'Executive View', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Revenue Pipeline', icon: TrendingUp, href: '/dashboard/revenue' }, // New Revenue Link
  { name: 'Operations Room', icon: Zap, href: '/dashboard/operations' },
  { name: 'Compliance Audit', icon: ShieldCheck, href: '/dashboard/compliance' }, // Audit 92% NIT status
  { name: 'Add New Driver', icon: UserPlus, href: '/dashboard/onboarding' },
  { name: 'Vetted Registry', icon: Users, href: '/dashboard/driver-profile' },
  { name: 'ERP Settings', icon: Settings, href: '/dashboard/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen bg-white border-r border-slate-100 flex flex-col sticky top-0 shadow-sm z-50">
      {/* BRANDING: Matches Landing Page Identity */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
          <Zap className="text-white w-6 h-6 fill-white" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900 leading-tight tracking-tight">Smart</h2>
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Dereva</p>
        </div>
      </div>

      {/* NAVIGATION MENU */}
      <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all group ${
                isActive 
                  ? 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-50' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}>
              <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-700'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER: Social Links & Sign Out */}
      <div className="p-8 border-t border-slate-50 space-y-6">
        <div className="flex justify-center gap-6">
          <Facebook className="w-5 h-5 text-slate-300 hover:text-blue-600 cursor-pointer transition" />
          <Linkedin className="w-5 h-5 text-slate-300 hover:text-blue-700 cursor-pointer transition" />
          <Twitter className="w-5 h-5 text-slate-300 hover:text-sky-500 cursor-pointer transition" />
        </div>
        
        <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 font-bold text-sm transition-colors">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
}