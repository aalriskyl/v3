import React from 'react';

interface FormInputProps {
    label: string;
    value: string | undefined;
    onChange: (value: string) => void;
    type?: string; // e.g., "text", "select"
}

const FormInput: React.FC<FormInputProps> = ({ label, value, onChange, type = 'text' }) => {
    return (
        <div className="mb-4">
            <label className="form-label fs-6 fw-bold">{label}</label>
            {type === 'text' ? (
                <input
                    type="text"
                    className="form-control"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <select className="form-select" value={value} onChange={(e) => onChange(e.target.value)}>
                    <option value="">Select option</option>
                    {/* Additional options */}
                </select>
            )}
        </div>
    );
};

export default FormInput;
