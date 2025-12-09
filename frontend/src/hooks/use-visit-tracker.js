import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

let sessionId = localStorage.getItem('session_id');
if (!sessionId) {
  sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem('session_id', sessionId);
}

export const useVisitTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const path = location.pathname;
        const referrer = document.referrer || null;
        
        await axios.post(`${API_URL}/visits`, {
          ip_address: 'unknown', // Will be handled by backend
          user_agent: navigator.userAgent,
          path: path,
          referrer: referrer,
          session_id: sessionId
        });
      } catch (error) {
        console.error('Failed to track visit:', error);
      }
    };

    // Small delay to ensure page is loaded
    const timeoutId = setTimeout(trackVisit, 100);
    return () => clearTimeout(timeoutId);
  }, [location.pathname]);
};

