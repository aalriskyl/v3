import { KTCard } from '@metronic/helpers'
// import { TableListMaterialDetailHeader } from '../molecules/header/TableListHeader'
import { MaterialDetailTable } from '../organisms/table/MaterialDetailTable'


const MaterialTableLayoutDetail = () => {
    return (
        <div className='card p-5 w-100 mb-4'>
        <h2 className='mb-6'>Material</h2>
            <KTCard>
                {/* <TableListMaterialDetailHeader /> */}
                <MaterialDetailTable />
            </KTCard>
        </div>
    )
}

export default MaterialTableLayoutDetail