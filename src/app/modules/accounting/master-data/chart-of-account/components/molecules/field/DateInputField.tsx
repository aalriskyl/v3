import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateInputFieldProps {
    label: string;
    value: string | undefined;
    onChange: (value: string) => void;
}

const DateInputField: React.FC<DateInputFieldProps> = ({ label, value, onChange }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(
        value ? new Date(value) : null
    );

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        onChange(date ? date.toISOString().split('T')[0] : '');
    };

    return (
        <div className="date-input mb-4" style={{ width: '100%' }}>
            <label className="form-label fs-6 fw-bold">{label}</label>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                className="form-control"
                wrapperClassName='w-100'
                popperClassName="datepicker-popper"
                dateFormat="mm/dd/yyyy"
                placeholderText="mm/dd/yyyy"
            />
        </div>
    );
};

export default DateInputField;
