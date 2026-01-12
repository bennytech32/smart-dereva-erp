// Automatic Driver Matchmaker Logic
export const findBestDriver = (request: any, standbyDrivers: any[]) => {
  return standbyDrivers
    .filter(driver => 
      // 1. Must be NIT Certified and Police Verified
      driver.compliance.nit && 
      driver.compliance.police &&
      // 2. Must be in the same location (e.g., Posta, Ilala, Kinondoni)
      driver.location === request.location &&
      // 3. Must be "Ready"
      driver.status === 'Ready'
    )
    // 4. Sort by highest rating first
    .sort((a, b) => b.rating - a.rating)[0]; 
};