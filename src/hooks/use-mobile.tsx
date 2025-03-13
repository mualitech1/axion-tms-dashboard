
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Set initial value based on window width
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Function to handle resize events
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Add event listener for window resize
    window.addEventListener("resize", handleResize)
    
    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return !!isMobile
}
