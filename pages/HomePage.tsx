import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

const HomePage: React.FC = () => {
    const { appSettings } = useContext(AppContext);
    const { home } = appSettings.pages;

    return (
        <section
            id="home" 
            className="h-screen min-h-[600px] bg-cover bg-center flex items-center justify-center text-white relative" 
            style={{ backgroundImage: `url(${home.heroImageUrl})` }}
        >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative text-center p-4">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-wider uppercase font-serif">
                    {home.heading}
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
                    {home.subheading}
                </p>
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                        to="/booking"
                        className="inline-block bg-white text-black font-bold py-3 px-8 uppercase tracking-widest text-sm transition-transform transform hover:scale-105"
                    >
                        Book Now
                    </Link>
                    <a 
                        href="#styles"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('styles')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className="inline-block bg-transparent border border-white text-white font-bold py-3 px-8 uppercase tracking-widest text-sm transition-transform transform hover:scale-105"
                    >
                        Find a Style
                    </a>
                </div>
            </div>
        </section>
    );
}

export default HomePage;