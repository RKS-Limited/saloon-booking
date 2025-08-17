import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const AboutPage: React.FC = () => {
    const { appSettings } = useContext(AppContext);
    const { about } = appSettings.pages;

    return (
        <section id="about" className="bg-white">
            <div className="container mx-auto px-4 py-16 sm:py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4 font-serif" style={{color: `rgba(var(--color-text-base))`}}>
                        {about.heading}
                    </h1>
                     <div className="mt-8 p-8 rounded-lg max-w-3xl mx-auto">
                        <p className="text-base leading-relaxed" style={{color: `rgba(var(--color-text-base))`}}>
                            {about.content}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutPage;