import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { ModuleTable } from '../organisms/table/ModuleTable';
import { RequestOrderProvider } from '../molecules/core/RequestOrderContext';

const TableLayout = () => {
    // const [searchTerm, setSearchTerm] = useState<string>('');

    // const handleSearch = (term: string) => {
    //     setSearchTerm(term); // Update search term
    // };

    return (
        <RequestOrderProvider>
        <div>
            <KTCard>
                <LinkButton
                    to="new"
                    title="Tambah Request Order"
                    style={{ top: '-5.5rem' }}
                />
                <TableListHeader />
                <ModuleTable />
            </KTCard>
        </div>
        </RequestOrderProvider>
    );
};

export default TableLayout;
