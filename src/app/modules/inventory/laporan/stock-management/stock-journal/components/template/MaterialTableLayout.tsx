import { KTCard } from '@metronic/helpers'
// import { TableListMaterialHeader } from '../molecules/header/TableListHeader'
import { MaterialTable } from '../organisms/table/MaterialTable'


const MaterialTableLayout = () => {
    return (
        <div className='card p-5 w-100 mb-4'>
        <h2 className='mb-6'>Material</h2>
            <KTCard>
                {/* <TableListMaterialHeader /> */}
                <MaterialTable />
            </KTCard>
        </div>
    )
}

export default MaterialTableLayout