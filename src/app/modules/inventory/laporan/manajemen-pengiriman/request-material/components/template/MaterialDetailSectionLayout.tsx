import React, { useEffect, useState } from 'react';
import { KTCard } from '@metronic/helpers';
import { MaterialSectionListHeader } from '../molecules/header/MaterialSectionListHeader';
import { MaterialDetailTableSection } from './section/MaterialDetailSection';
import { MaterialRequestMaterialProvider } from '../../../../../pengajuan/manajemen-pengiriman/request-material/core/MaterialRequestMaterialContext';

const MaterialDetailSectionLayout = () => {

    return (
        <MaterialRequestMaterialProvider>
             <div>
            <KTCard>
                <MaterialSectionListHeader />
                <MaterialDetailTableSection />
            </KTCard>
        </div>
        </MaterialRequestMaterialProvider>
    );
};

export default MaterialDetailSectionLayout;