import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

function SingleDayPicker({ onDateChange }) {
    return (
        <div className="single-date-picker-container">
            <DayPicker
                mode="single"
                onSelect={onDateChange}
            />
        </div>
    );
}

export default SingleDayPicker;