import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { CustomerTable } from '../organism/table/CustomerTable';

const CustomerTableLayout = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (term: string) => {
        setSearchTerm(term); // Update search term
    };

    return (
        <div style={{ maxWidth: '1050px' }}>
            <KTCard>
                {/* Pass handleSearch to TableListHeader */}
                <TableListHeader onSearch={handleSearch} />
                {/* Pass searchTerm to CategoryTable */}
                <CustomerTable  searchTerm={searchTerm} />
            </KTCard>
        </div>
    );
};

export default CustomerTableLayout;
