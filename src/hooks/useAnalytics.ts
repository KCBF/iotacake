import { useEffect } from 'react';

export const useAnalytics = () => {
  useEffect(() => {
    // Get current visits
    const storedVisits = localStorage.getItem('visits');
    const visits = storedVisits ? JSON.parse(storedVisits) : [];

    // Create new visit record
    const newVisit = {
      date: new Date().toISOString().split('T')[0],
      count: 1,
      ip: '127.0.0.1' // In a real app, you'd get this from your server
    };

    // Add new visit to the list
    visits.push(newVisit);

    // Store updated visits
    localStorage.setItem('visits', JSON.stringify(visits));
  }, []);
}; 