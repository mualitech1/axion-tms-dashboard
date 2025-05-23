import * as React from "react"

// Screen size breakpoints
const BREAKPOINTS = {
  mobile: 767,    // < 768px
  tablet: 1023,   // < 1024px
  desktop: 1279,  // < 1280px
  largeDesktop: 1535, // < 1536px
};

type ScreenSize = 'mobile' | 'tablet' | 'desktop' | 'largeDesktop' | 'extraLargeDesktop';

export function useResponsive() {
  const [screenSize, setScreenSize] = React.useState<ScreenSize | undefined>(undefined);

  React.useEffect(() => {
    // Function to calculate and set screen size
    const calculateScreenSize = () => {
      const width = window.innerWidth;
      
      if (width <= BREAKPOINTS.mobile) {
        setScreenSize('mobile');
      } else if (width <= BREAKPOINTS.tablet) {
        setScreenSize('tablet');
      } else if (width <= BREAKPOINTS.desktop) {
        setScreenSize('desktop');
      } else if (width <= BREAKPOINTS.largeDesktop) {
        setScreenSize('largeDesktop');
      } else {
        setScreenSize('extraLargeDesktop');
      }
    };
    
    // Set initial value
    calculateScreenSize();
    
    // Add event listener for window resize
    window.addEventListener("resize", calculateScreenSize);
    
    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", calculateScreenSize);
  }, []);

  // Derived boolean values for easier conditionals
  const isMobile = screenSize === 'mobile';
  const isTablet = screenSize === 'tablet';
  const isDesktop = screenSize === 'desktop' || screenSize === 'largeDesktop' || screenSize === 'extraLargeDesktop';
  const isLargeDesktop = screenSize === 'largeDesktop' || screenSize === 'extraLargeDesktop';
  const isExtraLargeDesktop = screenSize === 'extraLargeDesktop';
  
  // Breakpoint flags for "and above" checks
  const isMobileAndAbove = true; // Always true, everything is mobile and above
  const isTabletAndAbove = !isMobile;
  const isDesktopAndAbove = isDesktop;
  const isLargeDesktopAndAbove = isLargeDesktop;
  
  // Min/max width check functions for custom breakpoints
  const isGreaterThan = (minWidth: number) => window.innerWidth > minWidth;
  const isLessThan = (maxWidth: number) => window.innerWidth < maxWidth;
  const isBetween = (minWidth: number, maxWidth: number) => 
    window.innerWidth > minWidth && window.innerWidth < maxWidth;

  return {
    screenSize,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isExtraLargeDesktop,
    isMobileAndAbove,
    isTabletAndAbove,
    isDesktopAndAbove,
    isLargeDesktopAndAbove,
    isGreaterThan,
    isLessThan,
    isBetween,
    breakpoints: BREAKPOINTS
  };
} 