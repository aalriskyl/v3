import React, { useEffect, useState } from 'react';
import { KTCard } from '@metronic/helpers';
import { MaterialSectionListHeader } from '../molecules/header/MaterialSectionListHeader';
import { MaterialDetailTableSection } from './section/MaterialDetailSection';
import { MaterialRequestMaterialProvider } from '../../core/MaterialRequestMaterialContext';

const MaterialDetailSectionLayout = ({ materialData, supplier_id, status }: any) => {

    return (
        <MaterialRequestMaterialProvider>
             <div>
            <KTCard>
                <MaterialSectionListHeader />
                <MaterialDetailTableSection status={status} materialData={materialData} supplier_id={supplier_id} />
            </KTCard>
        </div>
        </MaterialRequestMaterialProvider>
    );
};

export default MaterialDetailSectionLayout;