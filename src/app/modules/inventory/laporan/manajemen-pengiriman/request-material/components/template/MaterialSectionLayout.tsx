import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
/* import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader'; */
import { MaterialSectionListHeader } from '../molecules/header/MaterialSectionListHeader';
import { MaterialTableSection } from './section/MaterialSection';

const MaterialSectionLayout = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (term: string) => {
        setSearchTerm(term); // Update search term
    };

    return (
        <div>
            <KTCard>
                <MaterialSectionListHeader/>
                <MaterialTableSection />
            </KTCard>
        </div>
    );
};

export default MaterialSectionLayout;
