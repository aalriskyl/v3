import { KTCard } from '@metronic/helpers'
import LinkButton from '@metronic/layout/components/buttons/LinkButton'
import { TableListHeader } from '../molecules/header/TableListHeader'
import { ServiceTable } from '../organism/table/ServiceTable'


const TableLayout = () => {
    return (
        <div>
            <KTCard>
                <LinkButton
                    to="new"
                    title="Tambah Term Payment"
                    style={{ top: '-4.5rem' }} />
                <TableListHeader />
                <ServiceTable />
            </KTCard>
        </div>
    )
}

export default TableLayout