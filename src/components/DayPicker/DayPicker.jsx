import React, {useState} from "react";
import {DayPicker} from "react-day-picker";
import "react-day-picker/style.css";

export function MyDatePicker() {
    const [selectedRange, setSelectedRange] = useState({
        from: undefined,
        to: undefined,
    });
    const [isPickerVisible, setPickerVisible] = useState(false);
    
    const footer =
        selectedRange.from && selectedRange.to
            ? `Selected from ${selectedRange.from.toLocaleDateString()} to ${selectedRange.to.toLocaleDateString()}`
            : "Please pick the first day.";
    
    return (
        <div>
            <button onClick={() => setPickerVisible(!isPickerVisible)}>
                {isPickerVisible ? "Hide Date Picker" : "Show Date Picker"}
            </button>
            {isPickerVisible && (
                <div>
                    <DayPicker
                        mode="range"
                        selected={selectedRange}
                        onSelect={setSelectedRange}
                    />
                    <p>{footer}</p>
                </div>
            )}
        </div>
    );
}