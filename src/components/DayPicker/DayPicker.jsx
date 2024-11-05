import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export function MyDatePicker() {
  const [selectedRange, setSelectedRange] = useState({
    from: undefined,
    to: undefined,
  });

  const footer =
    selectedRange.from && selectedRange.to
      ? `Selected from ${selectedRange.from.toLocaleDateString()} to ${selectedRange.to.toLocaleDateString()}`
      : "Please pick the first day.";

  return (
    <div>
      <DayPicker
        mode="range"
        selected={selectedRange}
        onSelect={setSelectedRange}
      />
      <p>{footer}</p>
    </div>
  );
}
