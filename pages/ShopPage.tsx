import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const ShopPage: React.FC = () => {
    const { products, appSettings } = useContext(AppContext);

    const productsByCategory = products.reduce((acc, product) => {
        const category = product.category || 'General';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(product);
        return acc;
    }, {} as Record<string, typeof products>);

    return (
        <section id="shop" className="container mx-auto px-4 py-16 sm:py-24">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold font-serif" style={{color: `rgba(var(--color-text-base))`}}>Our Products</h1>
                <p className="text-lg mt-2" style={{color: `rgba(var(--color-text-muted))`}}>High-quality products to maintain your style.</p>
            </div>
            
            <div className="space-y-16">
                {Object.entries(productsByCategory).map(([category, items]) => (
                    <div key={category}>
                        <h2 className="text-3xl font-bold font-serif mb-8" style={{color: `rgba(var(--color-text-base))`}}>{category}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {items.map(product => (
                                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                                    <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="text-lg font-semibold font-serif" style={{color: `rgba(var(--color-text-base))`}}>{product.name}</h3>
                                        <p className="text-xl font-bold mt-1" style={{color: `rgba(var(--color-primary))`}}>{appSettings.currencySymbol}{product.price.toFixed(2)}</p>
                                        <p className="mt-3 text-sm flex-grow" style={{color: `rgba(var(--color-text-muted))`}}>{product.description}</p>
                                        <button 
                                            className="mt-4 w-full text-white font-bold py-2 px-4 rounded-md shadow-lg transition-transform transform hover:scale-105 disabled:bg-gray-400"
                                            style={{ backgroundColor: `rgba(var(--color-primary))` }}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ShopPage;