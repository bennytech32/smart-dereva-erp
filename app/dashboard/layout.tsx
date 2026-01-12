"use client";

import Sidebar from '@/components/Sidebar';
import { DriverProvider } from '@/context/DriverContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DriverProvider>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </DriverProvider>
  );
}