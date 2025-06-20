import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./custom/style.scss";

interface DateRangeInputFieldProps {
  label: string;
  startDate: string;
  endDate: string;
  onChange: (startDate: string, endDate: string) => void;
  disabled?: boolean;
}

const DateRangeInputField: React.FC<DateRangeInputFieldProps> = ({
  label,
  startDate,
  endDate,
  onChange,
  disabled = false,
}) => {
  const [startDateValue, setStartDateValue] = useState<Date | null>(
    startDate ? new Date(startDate) : null
  );
  const [endDateValue, setEndDateValue] = useState<Date | null>(
    endDate ? new Date(endDate) : null
  );

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDateValue(start);
    setEndDateValue(end);
    onChange(
      start ? start.toISOString().split("T")[0] : "",
      end ? end.toISOString().split("T")[0] : ""
    );
  };

  return (
    <div
      className="date-range-input mb-4 flex align-items-center"
      style={{ width: "100%" }}
    >
      <label className="form-label fs-6 fw-normal">{label}</label>
      <DatePicker
        showIcon
        selectsRange
        startDate={startDateValue}
        endDate={endDateValue}
        onChange={handleDateChange}
        className="form-control py-4 px-10"
        wrapperClassName="w-100"
        popperClassName="datepicker-popper card shadow border-0"
        calendarClassName="custom-datepicker"
        dateFormat="dd/MM/yyyy"
        placeholderText="dd/mm/yyyy - dd/mm/yyyy"
        disabled={disabled}
      />
    </div>
  );
};

export default DateRangeInputField;
