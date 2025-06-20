import React, { useEffect, useState } from 'react';
import { KTIcon } from '@metronic/helpers';
import { useServiceSalesOrder } from '../../template/LayananDetailSectionLayout';

const SectionLayananSearch: React.FC = () => {
    const { handleSearch, searchTerm } = useServiceSalesOrder();
        const [localSearchTerm, setLocalSearchTerm] = useState<string>(searchTerm);
    
        const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setLocalSearchTerm(e.target.value);
        };
    
        useEffect(() => {
            const handler = setTimeout(() => {
                handleSearch(localSearchTerm); // Panggil handleSearch dari Context setelah debounce
            }, 300);
    
            return () => clearTimeout(handler);
        }, [localSearchTerm, handleSearch]);
    
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

export { SectionLayananSearch };