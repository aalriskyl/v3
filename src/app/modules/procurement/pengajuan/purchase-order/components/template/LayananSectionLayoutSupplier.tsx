import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
/* import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader'; */
import { LayananSectionListHeader } from '../molecules/header/LayananSectionListHeader';
import { LayananTableSection } from './section/LayananSection';
import { ServicesPurchaseOrderProvider } from '../molecules/core/ServicePoContext';
import { LayananTableSectionSupplier } from './section/LayananSectionSupplier';

const LayananSectionLayoutSupplier: React.FC<{ type: string; status: string, supplierId: string }> = ({ status, supplierId, type }) => {
    // const [searchTerm, setSearchTerm] = useState<string>('');

    // const handleSearch = (term: string) => {
    //     setSearchTerm(term); // Update search term
    // };

    return (
        <ServicesPurchaseOrderProvider>
            <div style={{}}>
                <KTCard>
                    <LayananSectionListHeader />
                    <LayananTableSectionSupplier status={status} type={type} supplierId={supplierId} />
                </KTCard>
            </div>
        </ServicesPurchaseOrderProvider>
    );
};

export default LayananSectionLayoutSupplier;
