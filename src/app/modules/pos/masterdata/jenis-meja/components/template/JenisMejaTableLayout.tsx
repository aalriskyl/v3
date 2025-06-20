import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { JenisMejaTable } from '../organism/table/JenisMejaTable';

const JenisMejaTableLayout = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (term: string) => {
        setSearchTerm(term); // Update search term
    };

    return (
        <div style={{ maxWidth: '1050px' }}>
            <KTCard>
                <LinkButton
                    to="new"
                    title="Tambah Kategori Produk"
                    style={{ top: '-5.5rem' }}
                />
                {/* Pass handleSearch to TableListHeader */}
                <TableListHeader onSearch={handleSearch} />
                {/* Pass searchTerm to CategoryTable */}
                <JenisMejaTable searchTerm={searchTerm} />
            </KTCard>
        </div>
    );
};

export default JenisMejaTableLayout;
