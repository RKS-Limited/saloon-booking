import React, { createContext, ReactNode } from 'react';
import { AppSettings, FormField, Booking, Stylist, Style, Product } from '../types';
import { useAppData } from '../hooks/useAppData';

interface AppContextType {
  appSettings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  formFields: FormField[];
  updateFormFields: (newFields: FormField[]) => void;
  blockedDates: string[];
  addBlockedDate: (date: string) => void;
  removeBlockedDate: (date: string) => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  stylists: Stylist[];
  updateStylists: (newStylists: Stylist[]) => void;
  styles: Style[];
  updateStyles: (newStyles: Style[]) => void;
  products: Product[];
  updateProducts: (newProducts: Product[]) => void;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  updatePassword: (newPassword: string) => boolean;
  loggedInStylist: Stylist | null;
  stylistLogin: (username: string, password: string) => boolean;
  stylistLogout: () => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const appData = useAppData();

  return (
    <AppContext.Provider value={appData}>
      {children}
    </AppContext.Provider>
  );
};