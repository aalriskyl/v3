import React from 'react';

interface DropdownProps {
    label: string;
    value: string | undefined;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

const DropdownField: React.FC<DropdownProps> = ({ label, value, onChange, options }) => {
    return (
        <div className="mb-4 col-md-12">
            <label className="form-label fs-6 fw-bold">{label}</label>
            <select className="form-select" value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="">Pilih Kategori</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropdownField;
