import { useState } from 'react'
import { KTCard } from '@metronic/helpers'
import LinkButton from '@metronic/layout/components/buttons/LinkButton'
import { TableListHeader } from '../molecules/header/TableListHeader'
import { BomTable } from '../organism/table/BomTable'
import { dummyDataBom } from '../organism/table/dummyData'

const BomTableLayout = () => {
    const [activeTab, setActiveTab] = useState<'Material' | 'Finish Goods'>('Material')

    // Filter data berdasarkan tab aktif
    const filteredData = dummyDataBom.filter(item =>
        item.type === activeTab
    )

    return (
        <div style={{ maxWidth: '1050px' }}>
            <KTCard>
                <LinkButton
                    to="new"
                    title="Tambah Bill of Material"
                    style={{ top: '-4.5rem' }} />
                <TableListHeader
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <BomTable data={filteredData} />
            </KTCard>
        </div>
    )
}

export default BomTableLayout