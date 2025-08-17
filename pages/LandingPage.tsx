import React from 'react';
import HomePage from './HomePage';
import StylesPage from './StylesPage';
import ShopPage from './ShopPage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';

const LandingPage: React.FC = () => {
    return (
        <>
            <HomePage />
            <StylesPage />
            <ShopPage />
            <AboutPage />
            <ContactPage />
        </>
    );
};

export default LandingPage;