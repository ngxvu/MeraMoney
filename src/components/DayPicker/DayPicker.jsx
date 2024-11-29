// src/components/DayPicker/DayPicker.jsx
import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { FaCalendarAlt } from "react-icons/fa"; // Import calendar icon
import "react-day-picker/style.css";

export function MyDatePicker({ onDateRangeChange }) {
    const [selectedRange, setSelectedRange] = useState({
        from: undefined,
        to: undefined,
    });
    const [isPickerVisible, setPickerVisible] = useState(false);

    useEffect(() => {
        if (selectedRange.from && selectedRange.to) {
            const formattedRange = {
                from: selectedRange.from.toISOString().split('T')[0],
                to: selectedRange.to.toISOString().split('T')[0]
            };
            console.log("Formatted Range:", formattedRange); // Debug log
            onDateRangeChange(formattedRange);
        }
    }, [selectedRange, onDateRangeChange]);

    const footer =
        selectedRange.from && selectedRange.to
            ? `Selected from ${selectedRange.from.toLocaleDateString()} to ${selectedRange.to.toLocaleDateString()}`
            : "Please pick the first day.";

    return (
        <div>
            {(
                <div className="custom-date-picker">
                    <DayPicker
                        mode="range"
                        selected={selectedRange}
                        onSelect={setSelectedRange}
                        className="custom-date-picker"
                    />
                </div>
            )}
        </div>
    );
}