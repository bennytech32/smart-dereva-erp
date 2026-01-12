"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const DriverContext = createContext<any>(null);

export function DriverProvider({ children }: { children: React.ReactNode }) {
  const [drivers, setDrivers] = useState([
    { id: 'DRV-001', name: 'Juma Kapuya', nit: 'Verified', status: 'Active', booking: 'None' },
  ]);

  // Add this to prevent SSR mismatch errors
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const addDriver = (newDriver: any) => {
    setDrivers(prev => [...prev, { ...newDriver, id: `DRV-${Math.random()}`, status: 'Pending', booking: 'None' }]);
  };

  const verifyDriver = (id: string) => {
    setDrivers(prev => prev.map(d => d.id === id ? { ...d, status: 'Active' } : d));
  };

  const updateBooking = (id: string, trip: string) => {
    setDrivers(prev => prev.map(d => d.id === id ? { ...d, booking: trip } : d));
  };

  return (
    <DriverContext.Provider value={{ drivers, addDriver, verifyDriver, updateBooking, mounted }}>
      {children}
    </DriverContext.Provider>
  );
}

export const useDrivers = () => {
  const context = useContext(DriverContext);
  // This is the fix: return an empty object instead of null if context is missing
  return context || { drivers: [], mounted: false }; 
};