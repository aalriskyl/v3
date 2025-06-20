/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
/* import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader'; */
import { LayananSectionListHeader } from '../molecules/header/LayananSectionListHeader';
import { LayananTableSection } from './section/LayananSection';

const LayananSectionLayout = ({layananChoice, setLayananChoice}:  any) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (term: string) => {
        setSearchTerm(term); // Update search term
    };

    return (
        <div>
            <KTCard>
                <LayananSectionListHeader />
                <LayananTableSection layananChoice={layananChoice} setLayananChoice={setLayananChoice}/>
            </KTCard>
        </div>
    );
};

export default LayananSectionLayout;
