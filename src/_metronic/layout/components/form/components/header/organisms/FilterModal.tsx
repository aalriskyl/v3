import React from 'react';
import FormInput from '../molecules/FormInputs';
import Dropdown from '../molecules/Dropdown';
import Button from '../molecules/Button';

interface FilterModalProps {
    isVisible: boolean;
    onClose: () => void;
    onFilter: () => void;
    organizationName: string | undefined;
    setOrganizationName: (value: string) => void;
    city: string | undefined;
    setCity: (value: string) => void;
    industry: string | undefined;
    setIndustry: (value: string) => void;
    status: string | undefined;
    setStatus: (value: string) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
    isVisible,
    onClose,
    onFilter,
    organizationName,
    setOrganizationName,
    city,
    setCity,
    industry,
    setIndustry,
    status,
    setStatus,
}) => {
    return (
        isVisible && (
            <div
                className="modal fade show d-block"
                tabIndex={-1}
                role="dialog"
                aria-hidden="true"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
                <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: '360px' }}>
                    <div className="modal-content px-2 py-8">
                        <div className="text-start">
                            <h1 className="modal-title fw-bold font-secondary mx-7">Filter</h1>
                        </div>
                        <div className="modal-body">
                            <FormInput
                                label="Nama Organisasi"
                                value={organizationName}
                                onChange={setOrganizationName}
                            />
                            <Dropdown
                                label="Kota"
                                value={city}
                                onChange={setCity}
                                options={[
                                    { value: 'Jakarta', label: 'Jakarta' },
                                    { value: 'Bandung', label: 'Bandung' },
                                    { value: 'Surabaya', label: 'Surabaya' },
                                ]}
                            />
                            <Dropdown
                                label="Industri"
                                value={industry}
                                onChange={setIndustry}
                                options={[
                                    { value: 'Tech', label: 'Tech' },
                                    { value: 'Finance', label: 'Finance' },
                                    { value: 'Retail', label: 'Retail' },
                                ]}
                            />
                            <Dropdown
                                label="Status"
                                value={status}
                                onChange={setStatus}
                                options={[
                                    { value: 'Active', label: 'Active' },
                                    { value: 'Inactive', label: 'Inactive' },
                                    { value: 'Pending', label: 'Pending' },
                                ]}
                            />
                        </div>
                        <div className="text-center row mx-4">
                            <div className="d-flex justify-content-between">
                                <Button label="Kembali" onClick={onClose} className="btn-light border border-2 me-2" />
                                <Button label="Simpan" onClick={onFilter} className="btn-primary fw-bold" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default FilterModal;
