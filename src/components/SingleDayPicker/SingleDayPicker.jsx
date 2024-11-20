// src/components/DayPicker/SingleDayPicker.jsx
import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

function SingleDayPicker({ onDateChange }) {
    return (
        <DayPicker
            mode="single"
            onSelect={onDateChange}
        />
    );
}

export default SingleDayPicker;