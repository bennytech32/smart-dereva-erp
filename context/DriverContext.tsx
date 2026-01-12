"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const DriverContext = createContext<any>(null);

export function DriverProvider({ children }: { children: React.ReactNode }) {
  const [drivers, setDrivers] = useState([]);
  const [mounted, setMounted] = useState(false);

  // Load drivers from Supabase on start
  useEffect(() => {
    setMounted(true);
    fetchDrivers();
  }, []);

  async function fetchDrivers() {
    const { data } = await supabase.from('drivers').select('*');
    if (data) setDrivers(data);
  }

  const addDriver = async (newDriver: any) => {
    const { error } = await supabase.from('drivers').insert([
      { name: newDriver.name, status: 'Pending' }
    ]);
    if (!error) fetchDrivers(); // Refresh list
  };

  const verifyDriver = async (id: string) => {
    const { error } = await supabase.from('drivers')
      .update({ status: 'Active', nit_status: 'Verified' })
      .eq('id', id);
    if (!error) fetchDrivers();
  };

  const updateBooking = async (id: string, trip: string) => {
    const { error } = await supabase.from('drivers')
      .update({ booking: trip })
      .eq('id', id);
    if (!error) fetchDrivers();
  };

  return (
    <DriverContext.Provider value={{ drivers, addDriver, verifyDriver, updateBooking, mounted }}>
      {children}
    </DriverContext.Provider>
  );
}

export const useDrivers = () => useContext(DriverContext) || { drivers: [], mounted: false };