import React, { useState, useMemo } from 'react';
import { KTCard } from '@metronic/helpers';
import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { UsersTable } from '../organisms/table/UsersTable';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { FilterValues } from '../molecules/header/filters';

const CustomerTableLayout: React.FC = () => {
    const [filters, setFilters] = useState<FilterValues>({});
    const [searchTerm, setSearchTerm] = useState('');

    const combinedFilters = useMemo(() => ({
        ...filters,
        search: searchTerm
    }), [filters, searchTerm]);

    const handleFilterUpdate = (newFilters: FilterValues) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    return (
        <div>
            <KTCard>
                <LinkButton
                    to="new"
                    title="Tambah Supplier"
                    style={{ top: '-4.5rem' }}
                />
                <TableListHeader
                    onSearch={setSearchTerm}
                    onFilter={handleFilterUpdate}
                    filters={combinedFilters}
                />
                <UsersTable filters={combinedFilters} />
            </KTCard>
        </div>
    );
};

export default CustomerTableLayout;