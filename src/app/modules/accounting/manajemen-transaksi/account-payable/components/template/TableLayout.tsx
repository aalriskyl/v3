import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { ModuleTable } from '../organisms/table/ModuleTable';
import { AccountPayableProvider } from '../../core/useContext';

const TableLayout = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (term: string) => {
        setSearchTerm(term); // Update search term
    };

    return (
    <AccountPayableProvider>
        <div>
            <KTCard>
                <LinkButton
                    to="new"
                    title="Buat Purchase Order"
                    style={{ top: '-5.5rem' }}
                />
                <TableListHeader />
                <ModuleTable />
            </KTCard>
        </div>
    </AccountPayableProvider>
    );
};

export default TableLayout;
