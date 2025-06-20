import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
import LinkButton from '@metronic/layout/components/buttons/LinkButton';
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
                <LinkButton
                    to="new"
                    title="Tambah Rencana Produksi"
                    style={{ top: '-5.5rem' }}
                />
                <TableListHeader />
                <ModuleTable searchTerm={searchTerm} />
            </KTCard>
        </div>
    );
};

export default TableLayout;
