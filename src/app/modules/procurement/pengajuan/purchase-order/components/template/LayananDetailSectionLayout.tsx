import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
/* import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader'; */
import { LayananSectionListHeader } from '../molecules/header/LayananSectionListHeader';
import { LayananDetailTableSection } from './section/LayananDetailSection';

const LayananDetailSectionLayout = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (term: string) => {
        setSearchTerm(term); // Update search term
    };

    return (
        <div>
            <KTCard>
                <LayananSectionListHeader/>
                <LayananDetailTableSection />
            </KTCard>
        </div>
    );
};

export default LayananDetailSectionLayout;
