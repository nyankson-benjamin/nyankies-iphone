import React, { createContext, useState } from 'react';
import { AlertContainer } from '../components/ui/Alert';

export type AlertSeverity = 'success' | 'error' | 'warning' | 'info';

export interface Alert {
  id: string;
  message: string;
  severity: AlertSeverity;
}

interface AlertContextType {
  alerts: Alert[];
  showAlert: (message: string, severity: AlertSeverity) => void;
  removeAlert: (id: string) => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const showAlert = (message: string, severity: AlertSeverity) => {
    const id = Math.random().toString(36).substring(7);
    setAlerts((prev) => [...prev, { id, message, severity }]);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      removeAlert(id);
    }, 10000);
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ alerts, showAlert, removeAlert }}>
      {children}
      <AlertContainer />
    </AlertContext.Provider>
  );
}

