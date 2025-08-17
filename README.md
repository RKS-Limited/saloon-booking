# BrandKit - Customizable Booking Website

BrandKit is a modern, fully customizable React web application designed for salons, event planners, or any service-based business requiring a sophisticated booking system. It features a user-friendly interface and a powerful, hidden admin panel for real-time content and brand management.

## Key Features

- **Dynamic Theming:** Upload your logo, and the website's color scheme automatically adapts to match your brand.
- **Full Content Management:** Edit all text content on the Home and About pages directly from the admin panel.
- **Style & Stylist Management**: Add, edit, or remove stylists and showcase different styles in a gallery, all from the admin panel.
- **Customizable Booking Form:** Add, remove, and configure fields for your booking form to collect the exact information you need.
- **Advanced Booking System:** Users can book specific stylists, and the calendar intelligently shows availability based on their selection.
- **Secure Admin Panel:** Access a hidden admin panel with a secret "5-click" gesture on the logo. The admin password can be changed for security.
- **Responsive Design:** A clean, modern interface that works seamlessly on desktops, tablets, and mobile devices.
- **Zero Backend Required:** All data is persisted in the user's browser via `localStorage`, making it easy to deploy on static site hosts.

---

## How the Booking System Works

### For the User

1.  **Navigate to Booking:** The user clicks on the "Booking" link in the header.
2.  **Select a Date:** An interactive calendar is displayed. Past dates and dates blocked by the admin are disabled. The user clicks on an available date.
3.  **Select a Time Slot:** Once a date is selected, a list of available time slots for that day appears. Slots that are fully booked are disabled.
4.  **Fill Details:** A booking form appears. The user can select a preferred stylist (or "Any Available") and fill in their information using the fields configured by the administrator.
5.  **Confirm Booking:** The user clicks "Confirm Booking". A confirmation message appears, and the time slot is now marked as booked for that day and stylist.

### For the Administrator

1.  **Access Admin Panel:** Click the website logo or brand name 5 times in quick succession. A login modal will appear. Enter the admin password (default is `password`).
2.  **Manage Bookings:** Navigate to the "Booking" tab. Here you can customize the available time slots and click on the calendar to block or unblock specific dates.
3.  **Manage Stylists & Styles:** Navigate to the "Stylists" or "Styles" tabs to add, edit, or remove entries for the team and the service gallery.
4.  **Manage Shop:** Navigate to the "Shop" tab to add, edit, or remove products and set the currency symbol for prices.
5.  **Customize Form:** Go to `Admin Panel -> Form Settings`. Here you can add, edit, and remove fields for the booking form.

---

## Data Storage and File Paths

This application is designed to be serverless and operates entirely on the client-side.

- **Primary Storage:** All application data (settings, form fields, stylists, styles, and bookings) is stored in the browser's **`localStorage`**.
- **Initialization Data:** On the very first visit to the site, if no data is found in `localStorage`, the application is populated with default data from the `src/data/` directory.

### Key File Paths

-   **Initial Data Source:** `src/data/initialData.ts`
-   **Data Persistence Logic:** `src/hooks/useAppData.ts`
-   **Global State Context:** `src/contexts/AppContext.tsx`

---

## Deployment on Render.com

Render.com is an excellent choice for hosting this static React application.

### Steps to Deploy:

1.  **Push to GitHub:** Make sure your entire project, including the `src` folder, is pushed to a GitHub repository.

2.  **Create a New Render Service:**
    *   Log in to your Render dashboard.
    *   Click "New +" and select **"Static Site"**.

3.  **Connect Your Repository:**
    *   Connect your GitHub account to Render.
    *   Select the repository containing your BrandKit application.

4.  **Configure Build Settings:**
    *   **Name:** Give your site a name (e.g., `brandkit-booking`).
    *   **Root Directory:** Leave this as is, or set to your project root if needed.
    *   **Branch:** Select the branch you want to deploy (e.g., `main`).
    *   **Build Command:** `npm install && npm run build` (or `yarn && yarn build`). You will need to add a build tool like Vite or Create React App to your project for this step.
    *   **Publish Directory:** The build process will generate a `dist` or `build` folder. Set this as the publish directory (e.g., `dist`).

5.  **Click "Create Static Site":**
    *   Render will automatically pull your code from GitHub, run the build command, and deploy the contents of your publish directory.
    *   Your site will be live at the URL provided by Render.

### Automatic Updates

Render's integration with GitHub means that every time you push a new commit to your selected branch, Render will automatically trigger a new build and deploy the updates. This makes pushing updates as simple as `git push`.