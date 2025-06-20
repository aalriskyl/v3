import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./custom/style.scss";

interface DateInputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  isBirthDate?: boolean; // New prop to indicate if this is for birth date
}

const DateInputField: React.FC<DateInputFieldProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  isBirthDate = false,
}) => {
  // Parse the value into a Date object only if it's a valid date string
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value && !isNaN(new Date(value).getTime()) ? new Date(value) : null
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    // Pass the date in ISO format (YYYY-MM-DD) to the parent component
    onChange(date ? date.toISOString().split("T")[0] : "");
  };

  // Calculate max date if this is for birth date
  const maxDate = isBirthDate ? new Date() : undefined;

  return (
    <div className="date-input mb-4" style={{ width: "100%" }}>
      <label className="form-label fs-6 fw-normal">{label}</label>
      <DatePicker
        showIcon
        selected={selectedDate}
        onChange={handleDateChange}
        className="form-control py-4 px-10"
        wrapperClassName="w-100"
        popperClassName="datepicker-popper card shadow border-0"
        calendarClassName="custom-datepicker"
        dateFormat="dd/MM/yyyy"
        placeholderText="dd/mm/yyyy"
        disabled={disabled}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        maxDate={maxDate} // Will prevent selecting dates after today if isBirthDate is true
        peekNextMonth
      />
    </div>
  );
};

export default DateInputField;
