import { KTCard } from '@metronic/helpers'
import { GoodsTable } from '../organism/table/GoodsTable'
import { TableListHeader } from '../molecules/header/TableListHeader'


const VarianGoodsTableLayout = () => {
    return (
        <div style={{ maxWidth: '1050px' }}>
            <KTCard>
                <TableListHeader />
                <GoodsTable />
            </KTCard>
        </div>
    )
}

export default VarianGoodsTableLayout