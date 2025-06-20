import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
/* import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader'; */
import { MaterialSectionListHeader } from '../molecules/header/MaterialSectionListHeader';
import { MaterialDetailTableSection } from './section/MaterialDetailSection';

const MaterialDetailSectionLayout = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (term: string) => {
        setSearchTerm(term); // Update search term
    };

    return (
        <div>
            <KTCard>
                <MaterialSectionListHeader/>
                <MaterialDetailTableSection />
            </KTCard>
        </div>
    );
};

export default MaterialDetailSectionLayout;
