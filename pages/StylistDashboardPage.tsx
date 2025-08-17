import React, { useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const StylistDashboardPage: React.FC = () => {
    const { loggedInStylist, stylistLogout, bookings } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedInStylist) {
            navigate('/stylist-login');
        }
    }, [loggedInStylist, navigate]);

    if (!loggedInStylist) {
        return null; // or a loading spinner
    }

    const myBookings = bookings
        .filter(b => b.stylistId === loggedInStylist.id)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const handleLogout = () => {
        stylistLogout();
        navigate('/');
    };

    return (
        <div className="container mx-auto px-4 py-8 pt-28">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-serif" style={{ color: `rgba(var(--color-text-base))` }}>
                        Welcome, {loggedInStylist.name}!
                    </h1>
                    <p className="text-lg mt-1" style={{ color: `rgba(var(--color-text-muted))` }}>Here are your upcoming appointments.</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-100"
                >
                    Logout
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="space-y-4">
                    {myBookings.length > 0 ? (
                        myBookings.map(booking => (
                            <div key={booking.id} className="p-4 border rounded-md bg-gray-50 flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-lg">{booking.formData.name}</p>
                                    <p className="text-sm" style={{ color: `rgba(var(--color-text-muted))` }}>
                                        {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {booking.timeSlot}
                                    </p>
                                    <p className="text-sm" style={{ color: `rgba(var(--color-text-muted))` }}>
                                        Contact: {booking.formData.email}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{backgroundColor: `rgba(var(--color-primary), 0.1)`, color: `rgba(var(--color-primary))`}}>
                                       {booking.formData.service || 'Appointment'}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center py-8" style={{ color: `rgba(var(--color-text-muted))` }}>
                            You have no upcoming appointments.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StylistDashboardPage;
