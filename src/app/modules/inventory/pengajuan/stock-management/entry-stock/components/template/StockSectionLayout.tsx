/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { StockTableSection } from './section/StockSection';
import { UomSectionListHeader } from '../molecules/header/UomSectionListHeader';
import { MaterialEntryStockProvider } from '../molecules/core/MaterialEntryStockContext';

const StockSectionLayout = ({
    status,
    materialData,
    setMaterialData
}: any) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (term: string) => {
        setSearchTerm(term); // Update search term
    };

    return (
    <MaterialEntryStockProvider>
        <div>
            <KTCard>
                <UomSectionListHeader />
                <StockTableSection 
                    status={status}
                    materialData={materialData}
                    setMaterialData={setMaterialData}
                />
            </KTCard>
        </div>
    </MaterialEntryStockProvider>
    );
};

export default StockSectionLayout;
