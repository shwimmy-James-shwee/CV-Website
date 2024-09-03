import { createContext, ReactNode, useCallback, useState } from 'react';
import { AlertProps } from 'react-bootstrap';

type AlertPropsOmitted = Omit<AlertProps, 'content'>; // Omit content property to overwrite and allow ReactNode types

export interface AlertValues extends AlertPropsOmitted {
  id?: string | undefined;
  header?: string | ReactNode;
  alertContent?: string | ReactNode;
  timeout?: number;
}

export type AlertContextType = {
  alerts: AlertValues[];
  addAlert: (alert: AlertValues) => void;
  removeAlert: (alert: AlertValues) => void;
};

export const AlertContext = createContext<AlertContextType>({} as AlertContextType);

interface IAlertProvider {
  children: ReactNode;
}

const AlertProvider = ({ children }: IAlertProvider) => {
  const [alerts, setAlerts] = useState([] as AlertValues[]);
  const removeAlert = useCallback((alert: AlertValues) => {
    setAlerts((current) => {
      return current.filter((value) => {
        return value !== alert;
      });
    });
  }, []);

  const addAlert = useCallback(
    (alert: AlertValues) => {
      setAlerts((current) => {
        if (alert.id) {
          current = current.filter((value) => value.id !== alert.id);
        }
        return [...current, alert];
      });
      if (alert.timeout !== 0) {
        setTimeout(() => {
          removeAlert(alert);
        }, alert.timeout || 10000);
      }
    },
    [removeAlert],
  );

  return <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>{children}</AlertContext.Provider>;
};

export default AlertProvider;
