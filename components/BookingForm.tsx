import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Booking } from '../types';

interface BookingFormProps {
    selectedDate: string;
    selectedTime: string;
    onBookingComplete: (booking: Booking) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ selectedDate, selectedTime, onBookingComplete }) => {
    const { appSettings, formFields, addBooking, stylists, bookings } = useContext(AppContext);
    const { enableStylistSelection } = appSettings;
    const [formData, setFormData] = useState<Record<string, string>>({ stylistId: 'any' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setError(null);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        const bookingsForSlot = bookings.filter(b => b.date === selectedDate && b.timeSlot === selectedTime);
        const bookedStylistIds = bookingsForSlot.map(b => b.stylistId);
        
        let finalStylistId = formData.stylistId;

        if (enableStylistSelection && finalStylistId && finalStylistId !== 'any') {
            if (bookedStylistIds.includes(finalStylistId)) {
                setError('This stylist is unavailable at the selected time. Please choose another stylist or time.');
                setIsSubmitting(false);
                return;
            }
        } else {
            const availableStylists = stylists.filter(s => !bookedStylistIds.includes(s.id));
            if (availableStylists.length === 0) {
                setError('This time slot is fully booked. Please select another time.');
                setIsSubmitting(false);
                return;
            }
            finalStylistId = availableStylists[0].id;
        }
        
        const newBooking = {
            id: `booking_${Date.now()}`,
            date: selectedDate,
            timeSlot: selectedTime,
            stylistId: finalStylistId,
            formData,
        };
        addBooking(newBooking);
        
        setTimeout(() => {
            setIsSubmitting(false);
            onBookingComplete(newBooking);
        }, 500);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {enableStylistSelection && (
                <div>
                    <label htmlFor="stylistId" className="block text-sm font-bold text-gray-700">
                        Stylist
                    </label>
                    <select
                        id="stylistId"
                        name="stylistId"
                        value={formData.stylistId || 'any'}
                        onChange={handleChange}
                        className="mt-1 block w-full bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[rgba(var(--color-primary))] focus:border-[rgba(var(--color-primary))]"
                    >
                        <option value="any">Any Available</option>
                        {stylists.map(stylist => (
                            <option key={stylist.id} value={stylist.id}>{stylist.name}</option>
                        ))}
                    </select>
                </div>
            )}
            
            {formFields.map(field => (
                <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-bold text-gray-700">
                        {field.label} {field.required && '*'}
                    </label>
                    {field.type === 'textarea' ? (
                        <textarea
                            id={field.id}
                            name={field.id}
                            rows={3}
                            required={field.required}
                            onChange={handleChange}
                            className="mt-1 block w-full bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[rgba(var(--color-primary))] focus:border-[rgba(var(--color-primary))]"
                        />
                    ) : field.type === 'select' ? (
                        <select
                            id={field.id}
                            name={field.id}
                            required={field.required}
                            onChange={handleChange}
                            className="mt-1 block w-full bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[rgba(var(--color-primary))] focus:border-[rgba(var(--color-primary))]"
                        >
                            <option value="">Select an option</option>
                            {field.options?.map(option => <option key={option} value={option}>{option}</option>)}
                        </select>
                    ) : (
                        <input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            required={field.required}
                            onChange={handleChange}
                            className="mt-1 block w-full bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[rgba(var(--color-primary))] focus:border-[rgba(var(--color-primary))]"
                        />
                    )}
                </div>
            ))}
            
            {error && <p className="text-red-500 text-sm">{error}</p>}

             <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white font-bold py-3 px-4 rounded-md shadow-lg transition-transform transform hover:scale-105 disabled:bg-gray-400"
                style={{ backgroundColor: `rgba(var(--color-primary))` }}
            >
                {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
            </button>
        </form>
    );
};

export default BookingForm;