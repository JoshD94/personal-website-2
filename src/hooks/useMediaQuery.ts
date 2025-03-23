import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    // Set initial value right away if client-side
    if (typeof window !== 'undefined') {
      setMatches(window.matchMedia(query).matches);
    }
    
    // Create media query list
    const mediaQuery = window.matchMedia(query);
    
    // Define handler function
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };
    
    // Add listener
    mediaQuery.addEventListener('change', handleChange);
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);
  
  return matches;
}