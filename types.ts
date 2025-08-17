export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  textBase: string;
  textMuted: string;
  background: string;
}

export interface Stylist {
  id: string;
  name: string;
  imageUrl: string;
  username: string;
  password: string;
}

export interface Style {
  id: string;
  name: string;
  imageUrl: string;
  category: 'Female' | 'Male';
}

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  category: string;
}

export interface AppSettings {
  logoUrl: string;
  brandName: string;
  theme: ThemeColors;
  pages: {
    home: {
      heroImageUrl: string;
      heading: string;
      subheading: string;
    };
    about: {
      heading: string;
      content: string;
      email: string;
      phone: string;
      address: string;
    }
  };
  stylists: Stylist[];
  styles: Style[];
  products: Product[];
  timeSlots: string[];
  currencySymbol: string;
  enableStylistSelection: boolean;
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  options?: string[]; // for select type
  required: boolean;
}

export interface Booking {
  id: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  stylistId: string; // 'any' or stylist.id
  formData: Record<string, string>;
}