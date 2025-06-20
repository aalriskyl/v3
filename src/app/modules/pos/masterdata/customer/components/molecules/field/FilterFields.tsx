import React from 'react';
import DateInputField from './DateInputField';
import StatusDropdownField from './StatusDropdownField';
interface FilterFieldsProps {
    submissionDate: string | undefined;
    setSubmissionDate: (value: string) => void;
    approvalDate: string | undefined;
    setApprovalDate: (value: string) => void;
    status: string | undefined;
    setStatus: (value: string) => void;
}

const FilterFields: React.FC<FilterFieldsProps> = ({
    submissionDate,
    setSubmissionDate,
    approvalDate,
    setApprovalDate,
    status,
    setStatus,
}) => {
    return (
        <>
            <DateInputField
                label="Tanggal Pengajuan"
                value={submissionDate}
                onChange={setSubmissionDate}
            />
            <DateInputField
                label="Tanggal Approve"
                value={approvalDate}
                onChange={setApprovalDate}
            />
            <StatusDropdownField
                label="Status"
                status={status}
                setStatus={setStatus}
            />
        </>
    );
};

export default FilterFields;
