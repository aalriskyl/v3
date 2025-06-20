import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { ModuleTable } from '../organisms/table/ModuleTable';
import { FakturPembelianProvider } from '../core/useContextView';

const TableLayout = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (term: string) => {
        setSearchTerm(term); // Update search term
    };

    return (
    <FakturPembelianProvider>
        <div>
            <KTCard>
                <LinkButton
                    to="new"
                    title="Tambah Faktur Pembelian"
                    style={{ top: '-5.5rem' }}
                />
                <TableListHeader onSearch={handleSearch} />
                <ModuleTable />
            </KTCard>
        </div>
    </FakturPembelianProvider>
    );
};

export default TableLayout;
