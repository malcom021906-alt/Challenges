import { useState, useEffect } from 'react';
import { Network } from '@capacitor/network';

export const useNetwork = () => {
  const [isOnline, setIsOnline] = useState(true); // Default to true

  useEffect(() => {
    Network.getStatus().then(status => {
      setIsOnline(status.connected);
    });

    let networkListener: any;
    
    const initListener = async () => {
      networkListener = await Network.addListener('networkStatusChange', status => {
        setIsOnline(status.connected);
      });
    };

    initListener();

    return () => {
      if (networkListener) {
        networkListener.remove();
      }
    };
  }, []);

  return { isOnline };
};
