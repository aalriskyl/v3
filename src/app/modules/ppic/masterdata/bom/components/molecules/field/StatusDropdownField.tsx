import React from 'react';

interface StatusDropdownFieldProps {
    label: string;
    status: string | undefined;
    setStatus: (value: string) => void;
}

const StatusDropdownField: React.FC<StatusDropdownFieldProps> = ({ label, status, setStatus }) => {
    return (
        <div className="mb-10">
            <label className="form-label fs-6 fw-bold">{label}</label>
            <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="">Select option</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
            </select>
        </div>
    );
};

export default StatusDropdownField;
