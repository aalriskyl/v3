import React from 'react';

interface StatusDropdownFieldProps {
    label: string;
    status: string | undefined;
    setStatus: (value: string) => void;
}

const StatusDropdownField: React.FC<StatusDropdownFieldProps> = ({ label, status, setStatus }) => {
    return (
        <div className="">
            <label className="form-label fs-6 fw-bold">Status</label>
            <select
                className="form-select form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="">Pilih status</option>
                <option value="Draft">Draft</option>
                <option value="Submitted">Submitted</option>
                <option value="Rejected">Rejected</option>
            </select>
        </div>
    );
};

export default StatusDropdownField;
