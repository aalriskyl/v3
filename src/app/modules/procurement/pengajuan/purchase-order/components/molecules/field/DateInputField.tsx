import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import '../../../../../../../../../_metronic/layout/components/form/molecules/custom/style.scss';
import '../../../../../../../../_metronic/layout/components/form/molecules/custom/style.scss'

interface DateInputFieldProps {
    label: string;
    value: Date | undefined;
    onChange: (value: string) => void;
    error?: string;
}

const DateInputField: React.FC<DateInputFieldProps> = ({ label, value, onChange, error }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        onChange(date ? date.toISOString().split('T')[0] : '');
    };

    return (
        <div className="date-input mb-4" style={{ width: '100%' }}>
            <label className="form-label fs-6 fw-normal">{label}</label>
            <DatePicker
                showIcon
                selected={selectedDate}
                onChange={handleDateChange}
                className="form-control py-4"
                wrapperClassName="w-100"
                popperClassName="datepicker-popper card shadow border-0"
                calendarClassName="custom-datepicker"
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/yyyy"
            />
            {error && <div className="text-danger">{error}</div>}
        </div>
    );
};

export default DateInputField;