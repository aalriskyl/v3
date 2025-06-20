import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { ModuleTable } from '../organisms/table/ModuleTable';
import { FakturPenjualanProvider } from '../../core/useContextView';

const TableLayout = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (term: string) => {
        setSearchTerm(term); // Update search term
    };

    return (
    <FakturPenjualanProvider>
        <div>
            <KTCard>
                <LinkButton
                    to="new"
                    title="Tambah Faktur Penjualan"
                    style={{ top: '-5.5rem' }}
                />
                <TableListHeader/>
                <ModuleTable />
            </KTCard>
        </div>
    </FakturPenjualanProvider>
    );
};

export default TableLayout;
