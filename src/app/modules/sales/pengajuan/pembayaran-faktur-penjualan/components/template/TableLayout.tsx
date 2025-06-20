import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { ModuleTable } from '../organisms/table/ModuleTable';
import { PembayaranFakturPenjualanProvider } from '../../core/useContextView';

const TableLayout = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (term: string) => {
        setSearchTerm(term); // Update search term
    };

    return (
        <PembayaranFakturPenjualanProvider>
        <div>
            <KTCard>
                <LinkButton
                    to="new"
                    title="Buat Pembayaran Faktur Penjualan"
                    style={{ top: '-5.5rem' }}
                />
                <TableListHeader  />
                <ModuleTable />
            </KTCard>
        </div>
        </PembayaranFakturPenjualanProvider>
    );
};

export default TableLayout;
