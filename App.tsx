import React, { useState, useEffect, useContext } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import BookingPage from './pages/BookingPage';
import AdminLoginModal from './components/AdminLoginModal';
import AdminPanel from './components/AdminPanel';
import StylistLoginPage from './pages/StylistLoginPage';
import StylistDashboardPage from './pages/StylistDashboardPage';
import { AppContext } from './contexts/AppContext';

function App(): React.ReactNode {
  const { isAdmin, appSettings } = useContext(AppContext);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isAdminPanelOpen, setAdminPanelOpen] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      setLoginModalOpen(false);
      setAdminPanelOpen(true);
    }
  }, [isAdmin]);
  
  useEffect(() => {
    const root = document.documentElement;
    if (appSettings.theme) {
        root.style.setProperty('--color-primary', appSettings.theme.primary);
        root.style.setProperty('--color-secondary', appSettings.theme.secondary);
        root.style.setProperty('--color-accent', appSettings.theme.accent);
        root.style.setProperty('--color-text-base', appSettings.theme.textBase);
        root.style.setProperty('--color-text-muted', appSettings.theme.textMuted);
        root.style.setProperty('--color-background', appSettings.theme.background);
    }
  }, [appSettings.theme]);

  const handleLogoClick = () => {
    if (!isAdmin) {
      setLoginModalOpen(true);
    } else {
      setAdminPanelOpen(true);
    }
  };

  const dynamicTailwindStyles = {
    backgroundColor: `rgba(var(--color-background))`,
    color: `rgba(var(--color-text-base))`
  };

  return (
    <HashRouter>
      <div style={dynamicTailwindStyles} className="flex flex-col min-h-screen">
        <Header onLogoClick={handleLogoClick} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/stylist-login" element={<StylistLoginPage />} />
            <Route path="/stylist-dashboard" element={<StylistDashboardPage />} />
          </Routes>
        </main>
        <Footer />
        
        {isLoginModalOpen && <AdminLoginModal onClose={() => setLoginModalOpen(false)} />}
        {isAdmin && isAdminPanelOpen && <AdminPanel onClose={() => setAdminPanelOpen(false)} />}
      </div>
    </HashRouter>
  );
}

export default App;