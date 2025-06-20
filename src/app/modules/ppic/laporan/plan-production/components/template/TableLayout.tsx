import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { ModuleTable } from '../organisms/table/ModuleTable';

const TableLayout = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    return (
        <div style={{ maxWidth: '1050px' }}>
            <KTCard>
                <TableListHeader />
                <ModuleTable searchTerm={searchTerm} />
            </KTCard>
        </div>
    );
};

export default TableLayout;
