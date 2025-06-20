import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { ModuleTable } from '../organisms/table/ModuleTable';
import { StockOpnameProvider } from '../../../../../pengajuan/stock-management/stock-opname/components/molecules/core/StockOpnameContext';

const TableLayout = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    return (
        <StockOpnameProvider>
        <div>
            <KTCard>
                <TableListHeader onSearch={handleSearch} />
                <ModuleTable searchTerm={searchTerm} />
            </KTCard>
        </div>
        </StockOpnameProvider>
    );
};

export default TableLayout;
