import { AppSettings, FormField, Booking, Stylist, Style, Product } from '../types';

export const initialStylists: Stylist[] = [
  { id: 'stylist-1', name: 'Jessica Miller', imageUrl: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=2080&auto=format&fit=crop', username: 'jessica', password: 'password123' },
  { id: 'stylist-2', name: 'David Chen', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop', username: 'david', password: 'password123' },
  { id: 'stylist-3', name: 'Maria Rodriguez', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop', username: 'maria', password: 'password123' },
];

export const initialStyles: Style[] = [
  { id: 'style-1', name: 'Sleek Bob', imageUrl: 'https://images.unsplash.com/photo-1621295629482-62a2e4695287?q=80&w=1974&auto=format&fit=crop', category: 'Female' },
  { id: 'style-2', name: 'Long Balayage', imageUrl: 'https://images.unsplash.com/photo-1534352932971-44279b959823?q=80&w=1964&auto=format&fit=crop', category: 'Female' },
  { id: 'style-3', name: 'Vivid Colors', imageUrl: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?q=80&w=1974&auto=format&fit=crop', category: 'Female' },
  { id: 'style-4', name: 'Curly Layers', imageUrl: 'https://images.unsplash.com/photo-1522338140262-f4650c136348?q=80&w=1974&auto=format&fit=crop', category: 'Female' },
  { id: 'style-5', name: 'Classic Taper', imageUrl: 'https://images.unsplash.com/photo-1622299221124-34539a619ae2?q=80&w=1974&auto=format&fit=crop', category: 'Male' },
  { id: 'style-6', name: 'Textured Crop', imageUrl: 'https://images.unsplash.com/photo-1599335623049-519896791936?q=80&w=1974&auto=format&fit=crop', category: 'Male' },
  { id: 'style-7', name: 'Modern Pompadour', imageUrl: 'https://images.unsplash.com/photo-1634453706690-42d797858f3a?q=80&w=1974&auto=format&fit=crop', category: 'Male' },
  { id: 'style-8', name: 'Clean Buzz Cut', imageUrl: 'https://images.unsplash.com/photo-1620821037194-e034791a498b?q=80&w=1974&auto=format&fit=crop', category: 'Male' },
];

export const initialProducts: Product[] = [
  { id: 'prod-1', name: 'Nourishing Shampoo', price: 25.00, imageUrl: 'https://images.unsplash.com/photo-1555820338-b3d74f2c9898?q=80&w=1974&auto=format&fit=crop', description: 'A gentle, sulfate-free shampoo that cleanses while restoring moisture.', category: 'Hair Care' },
  { id: 'prod-2', name: 'Hydrating Conditioner', price: 28.00, imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f19a336235?q=80&w=1974&auto=format&fit=crop', description: 'Deeply moisturizes and detangles for soft, manageable hair.', category: 'Hair Care' },
  { id: 'prod-5', name: 'Argan Oil Serum', price: 35.00, imageUrl: 'https://images.unsplash.com/photo-1607006408332-9a5a3a4c25ac?q=80&w=1974&auto=format&fit=crop', description: 'A lightweight oil for shine, smoothness, and frizz control.', category: 'Oils' },
  { id: 'prod-6', name: 'Tea Tree Scalp Treatment', price: 30.00, imageUrl: 'https://images.unsplash.com/photo-1625698311032-4e0e42d78356?q=80&w=1974&auto=format&fit=crop', description: 'Soothes dry, itchy scalp and removes impurities.', category: 'Scalp Care' },
  { id: 'prod-3', name: 'Styling Gel', price: 18.00, imageUrl: 'https://images.unsplash.com/photo-1631739132243-346c4293c0a5?q=80&w=1974&auto=format&fit=crop', description: 'Provides strong hold and shine without flaking or stiffness.', category: 'Hair Care' },
  { id: 'prod-4', name: 'Heat Protectant Spray', price: 22.00, imageUrl: 'https://images.unsplash.com/photo-1598884789839-2693845b4a4f?q=80&w=1974&auto=format&fit=crop', description: 'Shields hair from heat damage up to 450°F.', category: 'Hair Care' },
  { id: 'prod-7', name: 'Exfoliating Scalp Scrub', price: 26.00, imageUrl: 'https://images.unsplash.com/photo-1585435019313-29472e947726?q=80&w=1974&auto=format&fit=crop', description: 'Gently exfoliates to remove product buildup and dead skin.', category: 'Scalp Care' },
  { id: 'prod-8', name: 'Jojoba Hair Oil', price: 32.00, imageUrl: 'https://images.unsplash.com/photo-1625042464425-a4b5f3a6773a?q=80&w=1974&auto=format&fit=crop', description: 'Deeply penetrates to nourish hair follicles and promote growth.', category: 'Oils' },
]

export const initialSettings: AppSettings = {
  logoUrl: 'https://tailwindui.com/img/logos/mark.svg?color=zinc&shade=800',
  brandName: 'BrandKit',
  theme: {
    primary: '39 39 42', // zinc-800
    secondary: '113 113 122', // zinc-500
    accent: '212 175 55', // Gold-like
    textBase: '24 24 27', // zinc-900
    textMuted: '82 82 91', // zinc-600
    background: '250 250 250', // zinc-50
  },
  pages: {
    home: {
      heroImageUrl: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070&auto=format&fit=crop',
      heading: 'GET SUMMER READY',
      subheading: 'Find Your Nearest Salon and Book Today!',
    },
    about: {
      heading: 'About Us',
      content: 'We are a premier service provider specializing in creating bespoke experiences. From elegant salon treatments to meticulously planned events, our team is dedicated to bringing your dreams to life. We believe in quality, creativity, and a personalized touch for every client.',
      email: 'contact@brandkit.com',
      phone: '(555) 123-4567',
      address: '123 Creative Lane, Innovation City, 45678'
    }
  },
  stylists: initialStylists,
  styles: initialStyles,
  products: initialProducts,
  timeSlots: [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ],
  currencySymbol: '£',
  enableStylistSelection: true,
};

export const initialFormFields: FormField[] = [
  { id: 'name', label: 'Full Name', type: 'text', required: true },
  { id: 'email', label: 'Email Address', type: 'email', required: true },
  { id: 'phone', label: 'Phone Number', type: 'tel', required: false },
  { id: 'service', label: 'Service Type', type: 'select', options: ['Haircut', 'Coloring', 'Styling', 'Treatment'], required: true },
  { id: 'details', label: 'Additional Details', type: 'textarea', required: false },
];

export const initialBlockedDates: string[] = ['2024-12-25']; // YYYY-MM-DD format

export const initialBookings: Booking[] = [];