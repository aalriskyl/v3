import React, { useState } from 'react';
import { KTCard } from '@metronic/helpers';
import LinkButton from '@metronic/layout/components/buttons/LinkButton';
import { TableListHeader } from '../molecules/header/TableListHeader';
import { StockTableSection } from './section/StockSection';
import { UomSectionListHeader } from '../molecules/header/UomSectionListHeader';

const StockSectionLayout = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = (term: string) => {
        setSearchTerm(term); // Update search term
    };

    return (
        <div>
            <KTCard>
                <UomSectionListHeader onSearch={handleSearch} />
                <StockTableSection />
            </KTCard>
        </div>
    );
};

export default StockSectionLayout;
