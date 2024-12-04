import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

function SingleDayPicker({ onDateChange }) {
    return (
        <div className="customer-single-date-picker">
            <DayPicker
                mode="single"
                onSelect={onDateChange}
                className="customer-single-date-picker"
            />
        </div>
    );
}

export default SingleDayPicker;