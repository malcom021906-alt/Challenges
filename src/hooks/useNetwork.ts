import { useState, useEffect } from 'react';
import { Network } from '@capacitor/network';
import type { PluginListenerHandle } from '@capacitor/core';

export const useNetwork = () => {
  const [isOnline, setIsOnline] = useState(true); // Default to true

  useEffect(() => {
    Network.getStatus().then(status => {
      setIsOnline(status.connected);
    });

    let networkListener: PluginListenerHandle | undefined;
    
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
