// Update the SingleDayPicker.jsx file to use the new CSS class for the button
import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

function SingleDayPicker({ onDateChange }) {
    return (
        <DayPicker
            mode="single"
            onSelect={onDateChange}
            className="custom-date-picker"
        />
    );
}

export default SingleDayPicker;