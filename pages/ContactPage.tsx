import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const ContactPage: React.FC = () => {
    const { appSettings } = useContext(AppContext);
    const { about: contactInfo } = appSettings.pages;

    return (
        <section id="contact" className="container mx-auto px-4 py-16 sm:py-24">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4 font-serif" style={{color: `rgba(var(--color-text-base))`}}>
                    Get In Touch
                </h1>
                <p className="text-lg mt-2 mb-12" style={{color: `rgba(var(--color-text-muted))`}}>We'd love to hear from you. Reach out with any questions or to start planning your next visit.</p>
                
                 <div className="mt-8 bg-white p-8 rounded-lg shadow-lg text-left max-w-lg mx-auto">
                    <ul className="space-y-6">
                        <li className="flex items-center">
                            <svg className="w-6 h-6 mr-4" style={{color: `rgba(var(--color-primary))`}} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            <a href={`mailto:${contactInfo.email}`} className="hover:underline" style={{color: `rgba(var(--color-text-base))`}}>{contactInfo.email}</a>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-6 h-6 mr-4" style={{color: `rgba(var(--color-primary))`}} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            <span style={{color: `rgba(var(--color-text-base))`}}>{contactInfo.phone}</span>
                        </li>
                        <li className="flex items-start">
                             <svg className="w-6 h-6 mr-4 flex-shrink-0" style={{color: `rgba(var(--color-primary))`}} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span style={{color: `rgba(var(--color-text-base))`}}>{contactInfo.address}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default ContactPage;