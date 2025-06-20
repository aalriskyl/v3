import React from "react";

interface DropdownProps {
    label: string;
    value: string | undefined | number;
    onChange: (value: string) => void;
    options: { value: string | number; label: string }[];
    placeholder?: string; // opsional
}

const DropdownField: React.FC<DropdownProps> = ({ label, value, onChange, options, placeholder = "Pilih" }) => {
    return (
        <div className="mb-4 col-md-12">
            <label className="form-label fs-6 fw-bold">{label}</label>
            <select className="form-select" value={value} onChange={(e) => onChange(e.target.value)}>
                <option value="">{placeholder}</option>
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
