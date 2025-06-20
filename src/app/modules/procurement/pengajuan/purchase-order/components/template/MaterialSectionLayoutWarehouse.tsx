import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
import { MaterialSectionListHeader } from '../molecules/header/MaterialSectionListHeader';
import { MaterialTableSectionWarehouse } from './section/MaterialSectionWarehouse';
import { MaterialPurchaseOrderProvider } from '../molecules/core/MaterialPoContext';

const MaterialSectionLayoutWarehouse: React.FC<{ status: string, supplierId: string; materialRequestId?: any; isQuotation: string }> = ({ status, supplierId, materialRequestId, isQuotation }) => {
    // const [searchTerm, setSearchTerm] = useState<string>('');

    // const handleSearch = (term: string) => {
    //     setSearchTerm(term); // Update search term
    // };

    return (
        <MaterialPurchaseOrderProvider>
            <div>
                <div className="text-danger d-flex align-items-center text-gray-500 mb-2">
                    <span className="bi bi-exclamation-circle me-2 fs-6"></span>
                    <span className="fs-6">Harap Menyesuaikan Material Konversinya.</span>
                </div>
                <KTCard>
                    <MaterialSectionListHeader />
                    <MaterialTableSectionWarehouse isQuotation={isQuotation} materialRequestId={materialRequestId} status={status} supplierId={supplierId} />
                </KTCard>
            </div>
        </MaterialPurchaseOrderProvider>
    );
};

export default MaterialSectionLayoutWarehouse;