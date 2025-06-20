import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { ModuleTable } from '../organisms/table/ModuleTable';
import { StockCardProvider } from '../../core/useContext';

const TableLayout = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const handleSearch = (term: string) => {
        setSearchTerm(term); // Update search term
    };

    return (
    <StockCardProvider>
        <div>
            <KTCard>
                <TableListHeader
                />
                <ModuleTable
                />
            </KTCard>
        </div>
    </StockCardProvider>
    );
};

export default TableLayout;