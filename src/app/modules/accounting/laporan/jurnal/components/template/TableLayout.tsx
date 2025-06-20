import { KTCard } from '@metronic/helpers'
import LinkButton from '@metronic/layout/components/buttons/LinkButton'
import { TableListHeader } from '../molecules/header/TableListHeader'
import ModuleTable from '../organism/table/ModuleTable'
import { JournalProvider } from '../core/useContext'


const TableLayout = () => {
    return (
        <JournalProvider>
        <div>
            <KTCard>
                <TableListHeader />
                <ModuleTable />
            </KTCard>
        </div>
        </JournalProvider>
    )
}

export default TableLayout