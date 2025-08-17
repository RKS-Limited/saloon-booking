import React, { useState, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

interface CalendarProps {
    onDateSelect: (date: Date) => void;
    selectedDate: Date | null;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect, selectedDate }) => {
    const { blockedDates } = useContext(AppContext);
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const changeMonth = (offset: number) => {
        setCurrentDate(new Date(year, month + offset, 1));
    };
    
    const today = new Date();
    today.setHours(0,0,0,0);

    const renderDays = () => {
        const days = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="p-2"></div>);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateString = date.toISOString().split('T')[0];
            const isBlocked = blockedDates.includes(dateString);
            const isPast = date < today;
            const isDisabled = isBlocked || isPast;
            const isSelected = selectedDate?.toDateString() === date.toDateString();

            days.push(
                <button 
                    key={day} 
                    onClick={() => onDateSelect(date)}
                    disabled={isDisabled}
                    className={`p-2 text-center rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200 ${
                        isDisabled ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'hover:bg-[rgba(var(--color-primary),0.2)]'
                    } ${isSelected ? 'bg-[rgba(var(--color-primary))] text-white' : ''}`}
                >
                    {day}
                </button>
            );
        }
        return days;
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => changeMonth(-1)} className="px-2 py-1 rounded-md hover:bg-gray-100">&larr;</button>
                <h3 className="font-semibold">{monthNames[month]} {year}</h3>
                <button onClick={() => changeMonth(1)} className="px-2 py-1 rounded-md hover:bg-gray-100">&rarr;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 mb-2">
                {daysOfWeek.map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1 place-items-center">
                {renderDays()}
            </div>
        </div>
    );
};

export default Calendar;