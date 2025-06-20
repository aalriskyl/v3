import { KTCard } from '@metronic/helpers'
import { SkemaTable } from '../organism/table/SkemaTable'
import LinkButton from '@metronic/layout/components/buttons/LinkButton'
import { TableListHeader } from '../molecules/header/TableListHeader'


const SkemaTableLayout = () => {
    return (
        <div style={{ maxWidth: '1050px' }}>
            <KTCard>
                <LinkButton
                    to="new"
                    title="Tambah Skema Harga"
                    style={{ top: '-4.5rem' }} />
                <TableListHeader />
                <SkemaTable />
            </KTCard>
        </div>
    )
}

export default SkemaTableLayout