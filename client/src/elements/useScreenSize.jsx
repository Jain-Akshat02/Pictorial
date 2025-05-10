// src/hooks/useScreenSize.js
import { useState, useEffect } from 'react';

const useScreenSize = (mobileBreakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < mobileBreakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    // Set initial value on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileBreakpoint]); // Re-run effect if the breakpoint changes

  return isMobile;
};

export default useScreenSize;