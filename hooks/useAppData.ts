import { useState, useEffect, useCallback } from 'react';
import { AppSettings, FormField, Booking, Stylist, Style, Product } from '../types';
import { initialSettings, initialFormFields, initialBlockedDates, initialBookings, initialStylists, initialStyles, initialProducts } from '../data/initialData';

const APP_DATA_KEY = 'brandkit_app_data';
const ADMIN_PASSWORD_KEY = 'brandkit_admin_pass';
const STYLIST_SESSION_KEY = 'brandkit_stylist_session';

interface AppData {
  settings: AppSettings;
  formFields: FormField[];
  blockedDates: string[];
  bookings: Booking[];
  stylists: Stylist[];
  styles: Style[];
  products: Product[];
}

export function useAppData() {
  const [appSettings, setAppSettings] = useState<AppSettings>(initialSettings);
  const [formFields, setFormFields] = useState<FormField[]>(initialFormFields);
  const [blockedDates, setBlockedDates] = useState<string[]>(initialBlockedDates);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [stylists, setStylists] = useState<Stylist[]>(initialStylists);
  const [styles, setStyles] = useState<Style[]>(initialStyles);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loggedInStylist, setLoggedInStylist] = useState<Stylist | null>(null);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(APP_DATA_KEY);
      if (storedData) {
        const data: AppData = JSON.parse(storedData);
        // Merge settings to prevent new fields from being lost on older localstorage data
        setAppSettings(prev => ({...prev, ...data.settings}));
        setFormFields(data.formFields);
        setBlockedDates(data.blockedDates);
        setBookings(data.bookings);
        setStylists(data.stylists);
        setStyles(data.styles);
        setProducts(data.products || initialProducts);
      } else {
        // First load, store initial data
        const initialData: AppData = {
            settings: initialSettings,
            formFields: initialFormFields,
            blockedDates: initialBlockedDates,
            bookings: initialBookings,
            stylists: initialStylists,
            styles: initialStyles,
            products: initialProducts,
        };
        localStorage.setItem(APP_DATA_KEY, JSON.stringify(initialData));
      }

      if (!localStorage.getItem(ADMIN_PASSWORD_KEY)) {
        localStorage.setItem(ADMIN_PASSWORD_KEY, 'password');
      }
      
      const storedStylist = sessionStorage.getItem(STYLIST_SESSION_KEY);
      if (storedStylist) {
        setLoggedInStylist(JSON.parse(storedStylist));
      }

    } catch (error) {
      console.error("Failed to load data from storage", error);
    }
  }, []);

  const saveData = useCallback(() => {
    setAppSettings(currentSettings => {
        setFormFields(currentFormFields => {
            setBlockedDates(currentBlockedDates => {
                setBookings(currentBookings => {
                    setStylists(currentStylists => {
                        setStyles(currentStyles => {
                            setProducts(currentProducts => {
                                const data: AppData = {
                                    settings: currentSettings,
                                    formFields: currentFormFields,
                                    blockedDates: currentBlockedDates,
                                    bookings: currentBookings,
                                    stylists: currentStylists,
                                    styles: currentStyles,
                                    products: currentProducts,
                                };
                                try {
                                    localStorage.setItem(APP_DATA_KEY, JSON.stringify(data));
                                } catch (error) {
                                    console.error("Failed to save data to localStorage", error);
                                }
                                return currentProducts;
                            });
                            return currentStyles;
                        });
                        return currentStylists;
                    });
                    return currentBookings;
                });
                return currentBlockedDates;
            });
            return currentFormFields;
        });
        return currentSettings;
    });
}, []);

  
  useEffect(() => {
      saveData();
  }, [appSettings, formFields, blockedDates, bookings, stylists, styles, products, saveData]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setAppSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateFormFields = (newFields: FormField[]) => {
    setFormFields(newFields);
  };
  
  const addBlockedDate = (date: string) => {
    setBlockedDates(prev => [...new Set([...prev, date])]);
  };

  const removeBlockedDate = (date: string) => {
    setBlockedDates(prev => prev.filter(d => d !== date));
  };

  const addBooking = (booking: Booking) => {
    setBookings(prev => [...prev, booking]);
  };
  
  const updateStylists = (newStylists: Stylist[]) => {
    setStylists(newStylists);
  }

  const updateStyles = (newStyles: Style[]) => {
    setStyles(newStyles);
  }
  
  const updateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
  }

  const login = (password: string) => {
    const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY);
    if (password === storedPassword) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setIsAdmin(false);
  };

  const updatePassword = (newPassword: string) => {
    if(isAdmin) {
      localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
      return true;
    }
    return false;
  };

  const stylistLogin = (username: string, password: string): boolean => {
    const stylist = stylists.find(s => s.username === username && s.password === password);
    if (stylist) {
        setLoggedInStylist(stylist);
        sessionStorage.setItem(STYLIST_SESSION_KEY, JSON.stringify(stylist));
        return true;
    }
    return false;
  };

  const stylistLogout = () => {
    setLoggedInStylist(null);
    sessionStorage.removeItem(STYLIST_SESSION_KEY);
  };

  return {
    appSettings,
    updateSettings,
    formFields,
    updateFormFields,
    blockedDates,
    addBlockedDate,
    removeBlockedDate,
    bookings,
    addBooking,
    stylists,
    updateStylists,
    styles,
    updateStyles,
    products,
    updateProducts,
    isAdmin,
    login,
    logout,
    updatePassword,
    loggedInStylist,
    stylistLogin,
    stylistLogout,
  };
}