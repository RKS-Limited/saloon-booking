import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const StylesPage: React.FC = () => {
    const { styles } = useContext(AppContext);
    
    const femaleStyles = styles.filter(s => s.category === 'Female');
    const maleStyles = styles.filter(s => s.category === 'Male');

    const StyleGrid = ({ styles, title }: { styles: typeof femaleStyles, title: string }) => (
        <div className="mb-16">
            <h2 className="text-3xl font-bold font-serif text-center mb-8" style={{color: `rgba(var(--color-text-base))`}}>{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {styles.map(style => (
                    <div key={style.id} className="group relative overflow-hidden rounded-lg shadow-lg">
                        <img src={style.imageUrl} alt={style.name} className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                            <h3 className="text-white text-xl font-semibold font-serif">{style.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <section id="styles" className="container mx-auto px-4 py-16 sm:py-24">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold font-serif" style={{color: `rgba(var(--color-text-base))`}}>Our Styles</h1>
                <p className="text-lg mt-2" style={{color: `rgba(var(--color-text-muted))`}}>Discover the looks we love to create.</p>
            </div>
            
            {femaleStyles.length > 0 && <StyleGrid styles={femaleStyles} title="Female Styles" />}
            {maleStyles.length > 0 && <StyleGrid styles={maleStyles} title="Male Styles" />}
            
        </section>
    );
};

export default StylesPage;