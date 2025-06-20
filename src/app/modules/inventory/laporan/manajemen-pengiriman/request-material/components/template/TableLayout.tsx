import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { ModuleTable } from '../organisms/table/ModuleTable';
import { MaterialRequestProvider } from '../../../../../pengajuan/manajemen-pengiriman/request-material/core/MaterialRequestContext';

const TableLayout = () => {

    return (
        <MaterialRequestProvider>
        <div>
            <KTCard>
                <TableListHeader />
                <ModuleTable />
            </KTCard>
        </div>
        </MaterialRequestProvider>
    );
};

export default TableLayout;
