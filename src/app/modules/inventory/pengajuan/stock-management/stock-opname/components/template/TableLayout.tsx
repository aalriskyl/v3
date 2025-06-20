import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { ModuleTable } from '../organisms/table/ModuleTable';
import { StockOpnameProvider } from '../molecules/core/StockOpnameContext';

const TableLayout = () => {

    return (
    <StockOpnameProvider>
        <div>
            <KTCard>
                <LinkButton
                    to="new"
                    title="Tambah Stock Opname"
                    style={{ top: '-5.5rem' }}
                />
                <TableListHeader />
                <ModuleTable />
            </KTCard>
        </div>
    </StockOpnameProvider>
    );
};

export default TableLayout;
