"use client";

import React, { createContext, useContext, useState } from 'react';

// Create the Context for the National Digital Driver Registry
const DriverContext = createContext<any>(null);

/**
 * The DriverProvider acts as a temporary live database.
 * It stores every driver who joins via the portal until the server restarts.
 */
export function DriverProvider({ children }: { children: React.ReactNode }) {
  const [drivers, setDrivers] = useState([
    { 
      id: 'DRV-001', 
      name: 'Juma Kapuya', 
      nit: 'Level 2 Certified', 
      status: 'Active', 
      booking: 'None' 
    }
  ]);

  // Logic for a driver joining from the Onboarding Portal
  const addDriver = (newDriver: any) => {
    const id = `DRV-00${drivers.length + 1}`;
    setDrivers([...drivers, { ...newDriver, id, status: 'Pending', booking: 'None' }]);
  };

  // Logic for Admin to verify a driver's NIT documents
  const verifyDriver = (id: string) => {
    setDrivers(drivers.map(d => d.id === id ? { ...d, status: 'Active', nit: 'Level 2 Certified' } : d));
  };

  // Logic for Admin to book a driver for a trip
  const updateBooking = (id: string, trip: string) => {
    setDrivers(drivers.map(d => d.id === id ? { ...d, booking: trip } : d));
  };

  return (
    <DriverContext.Provider value={{ drivers, addDriver, verifyDriver, updateBooking }}>
      {children}
    </DriverContext.Provider>
  );
}

// Hook to allow all pages (Onboarding, Operations, Dashboard) to use the registry data
export const useDrivers = () => useContext(DriverContext);