import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { ModuleTable } from '../organisms/table/ModuleTable';
import { EntryStockProvider } from '../molecules/core/EntryStockContext';

const TableLayout: React.FC<{ status: string }> = ({ status }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (term: string) => {
        setSearchTerm(term); // Update search term
    };

    return (
        <EntryStockProvider>
        <div>
            <KTCard>
                <LinkButton
                    to="new"
                    title="Tambah Entry Stok"
                    style={{ top: '-5.5rem' }}
                />
                <TableListHeader />
                <ModuleTable />
            </KTCard>
        </div>
        </EntryStockProvider>
    );
};

export default TableLayout;
