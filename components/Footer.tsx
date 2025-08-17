import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
    const { appSettings } = useContext(AppContext);
    
    return (
        <footer style={{backgroundColor: 'rgba(var(--color-background))', borderTop: `1px solid rgba(var(--color-primary), 0.1)`}} className="py-6 mt-12">
            <div className="container mx-auto px-4 text-center">
                <p style={{color: `rgba(var(--color-text-muted))`}} className="text-sm">
                    &copy; {new Date().getFullYear()} {appSettings.brandName}. All Rights Reserved.
                </p>
                 <NavLink 
                    to="/stylist-login" 
                    className="text-xs mt-2 inline-block hover:underline"
                    style={{color: `rgba(var(--color-secondary))`}}
                >
                    Stylist Login
                </NavLink>
            </div>
        </footer>
    );
}

export default Footer;