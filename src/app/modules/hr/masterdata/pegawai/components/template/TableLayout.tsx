import { KTCard } from '@metronic/helpers'
import { Table } from '../organism/table/Table'
import LinkButton from '@metronic/layout/components/buttons/LinkButton'
import { TableListHeader } from '../molecules/header/TableListHeader'
import { EmployeeProvider } from '../core/EmployeeProviderContext'


const TableLayout = () => {
    return (
        <EmployeeProvider>
        <div>
            <KTCard>
                <LinkButton
                    to="new"
                    title="Tambah Pegawai"
                    style={{ top: '-4.5rem' }} />
                <TableListHeader />
                <Table />
            </KTCard>
        </div>
        </EmployeeProvider>
    )
}

export default TableLayout