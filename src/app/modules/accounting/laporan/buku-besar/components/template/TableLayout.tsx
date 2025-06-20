import { KTCard } from '@metronic/helpers'
import LinkButton from '@metronic/layout/components/buttons/LinkButton'
import { TableListHeader } from '../molecules/header/TableListHeader'
import { ModuleTable } from '../organism/table/ModuleTable'
import { LedgerProvider } from '../core/useContext'


const TableLayout = () => {
    return (
    <LedgerProvider>
        <div>
            <KTCard>
                <TableListHeader />
                <ModuleTable />
            </KTCard>
        </div>
    </LedgerProvider>
    )
}

export default TableLayout