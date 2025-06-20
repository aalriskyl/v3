import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { ModuleTable } from '../organisms/table/ModuleTable';
import { MaterialRequestProvider } from '../../core/MaterialRequestContext';

const TableLayout = () => {

    return (
        <MaterialRequestProvider>
        <div>
            <KTCard>
                <LinkButton
                    to="new"
                    title="Tambah Material Request"
                    style={{ top: '-5.5rem' }}
                />
                <TableListHeader />
                <ModuleTable />
            </KTCard>
        </div>
        </MaterialRequestProvider>
    );
};

export default TableLayout;
