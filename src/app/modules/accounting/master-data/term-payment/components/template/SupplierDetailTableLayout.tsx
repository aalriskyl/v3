import { KTCard } from '@metronic/helpers'
// import { TableListSupplierDetailHeader } from '../../../materials/components/molecules/header/TableListHeader'
// import { SupplierTable } from '../organism/table/SupplierTable'
// import { TermsTable } from '../organism/table/TermsTable'


const SupplierDetailTableLayout = () => {
    return (
        <div className='card p-5 w-100 mb-4'>
        <h2 className='mb-6'>Supplier</h2>
            <KTCard>
                {/* <TableListSupplierDetailHeader /> */}
                {/* <TermsTable /> */}
            </KTCard>
        </div>
    )
}

export default SupplierDetailTableLayout