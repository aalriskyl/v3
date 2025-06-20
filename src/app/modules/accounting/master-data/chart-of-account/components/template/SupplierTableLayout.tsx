import { KTCard } from '@metronic/helpers'
import { TableListSupplierHeader } from '../molecules/header/TableListHeader'
import { SupplierTable } from '../organism/table/SupplierTable'


const SupplierTableLayout = () => {
    return (
        <div className='card p-5 w-100 mb-4'>
        <h2 className='mb-6'>Supplier</h2>
            <KTCard>
                <TableListSupplierHeader />
                <SupplierTable />
            </KTCard>
        </div>
    )
}

export default SupplierTableLayout