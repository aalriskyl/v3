import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { ModuleTable } from '../organisms/table/ModuleTable';
import { StockJournalProvider } from '../../core/useContext';

const TableLayout = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const handleSearch = (term: string) => {
        setSearchTerm(term); // Update search term
    };

    return (
    <StockJournalProvider>
        <div>
            <KTCard>
                <TableListHeader
                />
                <ModuleTable
                />
            </KTCard>
        </div>
    </StockJournalProvider>
    );
};

export default TableLayout;