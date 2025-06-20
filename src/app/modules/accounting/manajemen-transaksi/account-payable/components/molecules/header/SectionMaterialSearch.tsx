import React, { useEffect, useState } from 'react';
import { KTIcon } from '@metronic/helpers';
import { useMaterialAp } from '../../../core/MaterialAccountPayableContext';


const SectionMaterialSearch: React.FC = () => {
    const { setSearchTerm } = useMaterialAp();
    const [localSearchTerm, setLocalSearchTerm] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocalSearchTerm(value);
        setSearchTerm(value);
    };

    return (
        <div className="card-title justify-content-between d-flex align-items-center w-100">
            <div className="d-flex align-items-center position-relative my-1 pe-4 me-auto">
                <KTIcon iconName="magnifier" className="fs-1 position-absolute ms-6" />
                <input
                    type="text"
                    data-kt-user-table-filter="search"
                    className="form-control w-250px ps-14 border border-2"
                    placeholder="Cari"
                    value={localSearchTerm}
                    onChange={handleSearchChange}
                />
            </div>
        </div>
    );
};

export { SectionMaterialSearch };