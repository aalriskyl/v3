import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { StockTableSection } from './section/StockSection';
import { UomSectionListHeader } from '../molecules/header/UomSectionListHeader';
import { MaterialEntryStockProvider } from '../../../../../pengajuan/stock-management/entry-stock/components/molecules/core/MaterialEntryStockContext';

const StockSectionLayout = () => {
    return (
        
    <MaterialEntryStockProvider>
        <div>
            <KTCard>
                <UomSectionListHeader />
                <StockTableSection />
            </KTCard>
        </div>
    </MaterialEntryStockProvider>
    );
};

export default StockSectionLayout;
