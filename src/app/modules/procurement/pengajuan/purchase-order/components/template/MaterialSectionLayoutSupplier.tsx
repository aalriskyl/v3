import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
/* import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader'; */
import { MaterialSectionListHeader } from '../molecules/header/MaterialSectionListHeader';
import { MaterialTableSectionWarehouse } from './section/MaterialSectionWarehouse';
import { MaterialTableSectionSupplier } from './section/MaterialSectionSupplier';
import { MaterialPurchaseOrderProvider } from '../molecules/core/MaterialPoContext';

const MaterialSectionLayoutSupplier: React.FC<{ status: string, supplierId: string; }> = ({ status, supplierId }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (term: string) => {
        setSearchTerm(term); // Update search term
    };

    return (
    <MaterialPurchaseOrderProvider>
        <div>
            <KTCard>
                    <MaterialSectionListHeader />
                    <MaterialTableSectionSupplier status={status} supplierId={supplierId} />
            </KTCard>
        </div>
    </MaterialPurchaseOrderProvider>
    );
};

export default MaterialSectionLayoutSupplier;
