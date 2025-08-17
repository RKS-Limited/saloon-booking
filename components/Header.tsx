import React, { useContext, useRef, useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

interface HeaderProps {
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  const { appSettings } = useContext(AppContext);
  const clickCount = useRef(0);
  const clickTimer = useRef<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');

  const handleLogoInteraction = () => {
    clickCount.current += 1;
    
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
    }

    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 1000); // Reset after 1 second

    if (clickCount.current === 5) {
      onLogoClick();
      clickCount.current = 0;
      if (clickTimer.current) clearTimeout(clickTimer.current);
    }
  };
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerOffset = 80; // Approximate height of the header
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation and re-render before scrolling
        setTimeout(() => scrollToSection(sectionId), 100);
    } else {
        scrollToSection(sectionId);
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
        const sections = ['home', 'styles', 'shop', 'about', 'contact'];
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { rootMargin: '-40% 0px -60% 0px' }); // Adjust rootMargin to trigger when the section is in the upper part of the viewport

        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => {
            sections.forEach(id => {
                const el = document.getElementById(id);
                if (el) observer.unobserve(el);
            });
        };
    } else {
        setActiveSection(''); // Clear active section if not on the landing page
    }
  }, [location.pathname]);
  
  const getLinkStyle = (sectionId: string) => {
    const baseStyle = "px-3 py-2 text-sm font-medium tracking-wider uppercase transition-colors duration-300";
    const activeStyle = { 
      color: `rgba(var(--color-text-base))`,
      borderBottom: `2px solid rgba(var(--color-primary))`
    };
    const inactiveStyle = { 
      color: `rgba(var(--color-text-muted))`,
      borderBottom: `2px solid transparent`
    };
    return activeSection === sectionId ? { ...activeStyle } : { ...inactiveStyle };
  };


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 h-[80px]">
          <div className="flex-shrink-0">
             <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center gap-3">
                <img src={appSettings.logoUrl} alt="BrandKit Logo" className="h-8 w-auto" />
                <span className="text-2xl font-bold font-serif hidden sm:block" style={{color: `rgba(var(--color-text-base))`}}>{appSettings.brandName}</span>
             </a>
          </div>
          <div 
            className="absolute left-1/2 -translate-x-1/2 cursor-pointer sm:hidden"
            onClick={handleLogoInteraction}
            >
             <span className="text-2xl font-bold font-serif" style={{color: `rgba(var(--color-text-base))`}}>{appSettings.brandName}</span>
          </div>

          <nav className="hidden md:flex items-center gap-4">
            <a href="#styles" onClick={(e) => handleNavClick(e, 'styles')} className="px-3 py-2 text-sm font-medium tracking-wider uppercase" style={getLinkStyle('styles')}>Styles</a>
            <a href="#shop" onClick={(e) => handleNavClick(e, 'shop')} className="px-3 py-2 text-sm font-medium tracking-wider uppercase" style={getLinkStyle('shop')}>Shop</a>
            <NavLink to="/booking" className="px-3 py-2 text-sm font-medium tracking-wider uppercase" style={({isActive}) => isActive ? getLinkStyle('booking-active') : getLinkStyle('booking-inactive')}>Booking</NavLink>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="px-3 py-2 text-sm font-medium tracking-wider uppercase" style={getLinkStyle('about')}>About</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="px-3 py-2 text-sm font-medium tracking-wider uppercase" style={getLinkStyle('contact')}>Contact</a>
          </nav>
          
           <div 
            className="hidden sm:block flex-shrink-0 cursor-pointer"
            onClick={handleLogoInteraction}
            aria-label="Admin Login Trigger"
            />
        </div>
      </div>
    </header>
  );
};

export default Header;