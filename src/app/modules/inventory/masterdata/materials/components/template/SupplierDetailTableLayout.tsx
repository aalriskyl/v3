import { KTCard } from '@metronic/helpers'
import { TableListSupplierHeader } from '../molecules/header/TableListHeader'
import { SupplierTable } from '../organism/table/SupplierTable'
import { SupplierUom } from '../molecules/header/UsersListSearchComponent';
import { useState } from 'react';
import { Supplier } from '../molecules/core/_models';
const SupplierDetailTableLayout = ({ uomId }: { uomId: string }) => {
    return (
        <div className='card p-5 w-100 mb-4'>
            <h2 className='mb-6'>Supplier</h2>
            <KTCard>
                <TableListSupplierHeader />
                {/* <SupplierTable uomId={uomId} /> */}
            </KTCard>
        </div>
    );
};

export default SupplierDetailTableLayout;