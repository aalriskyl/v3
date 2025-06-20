import { KTCard } from '@metronic/helpers'
import LinkButton from '@metronic/layout/components/buttons/LinkButton'
import { TableListHeader } from '../molecules/header/TableListHeader'
import { ModuleTable } from '../organism/table/ModuleTable'


const TableLayout = () => {
    return (
        <div>
            <KTCard>
                <LinkButton
                    to="new"
                    title="Tambah Module"
                    style={{ top: '-4.5rem' }} />
                <TableListHeader />
                <ModuleTable />
            </KTCard>
        </div>
    )
}

export default TableLayout