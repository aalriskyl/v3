import { KTCard } from '@metronic/helpers'
import { UomTable } from '../organism/table/UomTable'
import LinkButton from '@metronic/layout/components/buttons/LinkButton'
import { TableListHeader } from '../molecules/header/TableListHeader'
import React, { useState } from 'react'


const UomTableLayout = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (term: string) => {
        setSearchTerm(term); // Update search term
    };
    return (
        <div style={{ maxWidth: '1050px' }}>
            <KTCard>
                <LinkButton
                    to="new"
                    title="Tambah Satuan/UOM"
                    style={{ top: '-4.5rem' }} />
                <TableListHeader onSearch={handleSearch} />
                <UomTable searchTerm={searchTerm} />
            </KTCard>
        </div>
    )
}

export default UomTableLayout