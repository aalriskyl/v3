import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { ModuleTable } from '../organisms/table/ModuleTable';
import { PenawaranProvider } from '../molecules/core/PenawaranContext';

const TableLayout = () => {
    return (
        <PenawaranProvider>
        <div>
            <KTCard>
                <LinkButton
                    to="new"
                    title="Tambah Penawaran"
                    style={{ top: '-5.5rem' }}
                />
                <TableListHeader />
                <ModuleTable />
            </KTCard>
        </div>
        </PenawaranProvider>
    );
};

export default TableLayout;
