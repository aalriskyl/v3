import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
import { Link } from 'react-router-dom';
import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { CustomerTable } from '../organism/table/CustomerTable';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { FilterValues } from '../molecules/header/filters';
import { CompanyProvider } from '../core/useContext';

const CustomerTableLayout = () => {

    return (
        <CompanyProvider>
        <div>
            <KTCard>
                <LinkButton
                    to="new"
                    title="Tambah Perusahaan"
                    style={{ top: '-5.5rem' }}
                />
                {/* Pass filters and handleFilterUpdate to TableListHeader */}
                <TableListHeader />
                {/* Pass filters to CustomerTable */}
                <CustomerTable  />
            </KTCard>
        </div>
        </CompanyProvider>
    );
};

export default CustomerTableLayout;
