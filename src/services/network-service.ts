
export const networkService = {
  isOnline: (): boolean => {
    return navigator.onLine;
  },
  
  onNetworkStatusChange: (callback: (status: boolean) => void) => {
    window.addEventListener('online', () => callback(true));
    window.addEventListener('offline', () => callback(false));
    
    return () => {
      window.removeEventListener('online', () => callback(true));
      window.removeEventListener('offline', () => callback(false));
    };
  }
};
