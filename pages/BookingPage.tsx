import React, { useState, useContext } from 'react';
import Calendar from '../components/Calendar';
import BookingForm from '../components/BookingForm';
import { AppContext } from '../contexts/AppContext';
import { Booking } from '../types';

const BookingPage: React.FC = () => {
    const { bookings, stylists, appSettings } = useContext(AppContext);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

    const { timeSlots } = appSettings;

    const dateToYYYYMMDD = (date: Date) => date.toISOString().split('T')[0];

    const getUnavailableSlots = (date: Date | null) => {
        if (!date || stylists.length === 0) return [];
        const dateString = dateToYYYYMMDD(date);
        const unavailableSlots: string[] = [];
        
        timeSlots.forEach(slot => {
            const bookingsForSlot = bookings.filter(b => b.date === dateString && b.timeSlot === slot);
            if (bookingsForSlot.length >= stylists.length) {
                unavailableSlots.push(slot);
            }
        });

        return unavailableSlots;
    };

    const unavailableSlots = getUnavailableSlots(selectedDate);
    
    const resetSelection = () => {
        setSelectedDate(null);
        setSelectedTime(null);
        setConfirmedBooking(null);
    };

    const handleBookingSuccess = (booking: Booking) => {
        setConfirmedBooking(booking);
    };

    if (confirmedBooking) {
        const stylist = stylists.find(s => s.id === confirmedBooking.stylistId);
        return (
            <div className="container mx-auto px-4 py-8 pt-[120px]">
                 <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
                    <h1 className="text-3xl font-bold font-serif mb-4" style={{color: `rgba(var(--color-text-base))`}}>Booking Confirmed!</h1>
                    <p className="mb-6" style={{color: `rgba(var(--color-text-muted))`}}>Your appointment has been scheduled successfully.</p>
                    <div className="text-left bg-gray-50 p-4 rounded-md space-y-2">
                        <p><strong>Client:</strong> {confirmedBooking.formData.name}</p>
                        <p><strong>Email:</strong> {confirmedBooking.formData.email}</p>
                        <p><strong>Date:</strong> {new Date(confirmedBooking.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {confirmedBooking.timeSlot}</p>
                        <p><strong>Stylist:</strong> {stylist?.name || 'Any Available'}</p>
                    </div>
                    <button 
                        onClick={resetSelection} 
                        className="mt-8 w-full text-white font-bold py-3 px-4 rounded-md shadow-lg transition-transform transform hover:scale-105"
                        style={{ backgroundColor: `rgba(var(--color-primary))` }}
                    >
                        Book Another Appointment
                    </button>
                </div>
            </div>
        )
    }
    
    return (
        <div className="container mx-auto px-4 py-8 pt-[120px]">
            <h1 className="text-4xl font-bold text-center mb-8 font-serif" style={{color: `rgba(var(--color-text-base))`}}>
                Make a Booking
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 font-serif">1. Select a Date</h2>
                    <Calendar onDateSelect={(date) => { setSelectedDate(date); setSelectedTime(null); }} selectedDate={selectedDate}/>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
                    {/* Step 2: Select Time */}
                    {selectedDate && !selectedTime && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4 font-serif">2. Select a Time Slot</h2>
                            <p className="text-sm text-gray-500 mb-4">Available slots for {selectedDate.toLocaleDateString()}:</p>
                            <div className="grid grid-cols-2 gap-2">
                                {timeSlots.map(slot => {
                                    const isUnavailable = unavailableSlots.includes(slot);
                                    return (
                                        <button 
                                            key={slot} 
                                            onClick={() => setSelectedTime(slot)} 
                                            disabled={isUnavailable} 
                                            className={`p-2 rounded-md text-sm transition-colors border ${isUnavailable 
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
                                                : 'bg-white hover:bg-gray-50'}`}
                                            style={{color: isUnavailable ? '' : `rgba(var(--color-primary))`, borderColor: isUnavailable ? '' : `rgba(var(--color-primary), 0.5)`}}
                                        >
                                            {slot}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    
                    {/* Step 3: Fill Form */}
                    {selectedDate && selectedTime && (
                         <div>
                            <h2 className="text-xl font-semibold mb-4 font-serif">3. Your Details</h2>
                             <button onClick={() => setSelectedTime(null)} className="text-sm mb-4" style={{color: `rgba(var(--color-secondary))`}}>&larr; Change time</button>
                            <BookingForm 
                                selectedDate={dateToYYYYMMDD(selectedDate)} 
                                selectedTime={selectedTime} 
                                onBookingComplete={handleBookingSuccess}
                            />
                         </div>
                    )}

                    {/* Initial state */}
                    {!selectedDate && (
                        <div className="text-center text-gray-500 flex-grow flex items-center justify-center">
                            <p>Please select a date from the calendar to see available time slots.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookingPage;