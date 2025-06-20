import React from 'react';

interface DropdownProps {
    label: string;
    value: string | undefined;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, value, onChange, options }) => {
    return (
        <div className="mb-4">
            <label className="form-label fs-6 fw-bold">{label}</label>
            <select className="form-select" value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="">Select option</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
