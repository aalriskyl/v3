import { KTCard } from '@metronic/helpers'
import { ItemTable } from '../organism/table/ItemTable'
import LinkButton from '@metronic/layout/components/buttons/LinkButton'
import { TableListHeader } from '../molecules/header/TableListHeader'


const UomTableLayout = () => {
    return (
        <div style={{ maxWidth: '1050px' }}>
            <KTCard>
                <LinkButton
                    to="new"
                    title="Tambah Item Bundling"
                    style={{ top: '-4.5rem' }} />
                <TableListHeader />
                <ItemTable />
            </KTCard>
        </div>
    )
}

export default UomTableLayout