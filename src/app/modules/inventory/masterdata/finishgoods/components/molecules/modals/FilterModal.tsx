import React from 'react';
import DateInputField from '../field/DateInputField';
import StatusDropdownField from '@metronic/layout/components/form/molecules/StatusDropdownField';

interface FilterModalProps {
    submissionDate: string;
    setSubmissionDate: React.Dispatch<React.SetStateAction<string>>;
    approvalDate: string;
    setApprovalDate: React.Dispatch<React.SetStateAction<string>>;
    status: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    closeModal: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
    submissionDate,
    setSubmissionDate,
    approvalDate,
    setApprovalDate,
    status,
    setStatus,
    closeModal,
}) => {
    return (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '360px' }}>
                <div className="modal-content px-2 py-8">
                    <div className="text-start">
                        <h1 className="modal-title fw-bold font-secondary mx-7">Filter</h1>
                    </div>
                    <div className="modal-body col-md-12">
                        {/* Submission Date Input */}
                        <div className="col-md-12">
                            <DateInputField
                                label="Tanggal Pengajuan"
                                value={submissionDate}
                                onChange={setSubmissionDate}
                            />

                            {/* Approval Date Input */}
                            <DateInputField
                                label="Tanggal Approve"
                                value={approvalDate}
                                onChange={setApprovalDate}
                            />
                        </div>
                        {/* Status Dropdown */}
                        <div className="mb-4">
                            <StatusDropdownField
                                label='Status'
                                status={status}
                                setStatus={setStatus}
                            />
                        </div>
                    </div>
                    <div className="text-center row mx-4">
                        <div className="d-flex justify-content-between">
                            <button
                                type="button"
                                className="btn px-12 text-primary py-3 border w-100 border-primary me-2"
                                onClick={closeModal}
                            >
                                Reset
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary px-12 py-3 fw-bold px-6 w-100 border border-primary"
                                onClick={closeModal} // update this as needed
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
