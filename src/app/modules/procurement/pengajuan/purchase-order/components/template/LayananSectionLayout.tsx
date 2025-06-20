import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
/* import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader'; */
import { LayananSectionListHeader } from '../molecules/header/LayananSectionListHeader';
import { LayananTableSection } from './section/LayananSection';
import { ServicesPurchaseOrderProvider } from '../molecules/core/ServicePoContext';

const LayananSectionLayout: React.FC<{ type: string; status: string, supplierId: string, isCompanyId: string, isQuotation: string }> = ({ status, supplierId, type, isCompanyId, isQuotation }) => { 
    // const [searchTerm, setSearchTerm] = useState<string>('');

    // const handleSearch = (term: string) => {
    //     setSearchTerm(term); // Update search term
    // };

    return (
        <ServicesPurchaseOrderProvider>
        <div style={{  }}>
            <KTCard>
                <LayananSectionListHeader />
                <LayananTableSection isQuotation={isQuotation} isCompanyId={isCompanyId} status={status} type={type} supplierId={supplierId} />
            </KTCard>
        </div>
        </ServicesPurchaseOrderProvider>
    );
};

export default LayananSectionLayout;
