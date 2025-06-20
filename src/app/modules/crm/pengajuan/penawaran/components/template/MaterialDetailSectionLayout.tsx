import React, { useEffect, useState } from 'react';
import { KTCard } from '@metronic/helpers';
import { MaterialSectionListHeader } from '../molecules/header/MaterialSectionListHeader';
import { MaterialDetailTableSection } from './section/MaterialDetailSection';
import { ServiceProvider } from '../molecules/core/ServiceContext';

const MaterialDetailSectionLayout = ({ serviceData, supplier_id, status }: any) => {

    return (
    <ServiceProvider>
        <div>
            <KTCard>
                <MaterialSectionListHeader />
                <MaterialDetailTableSection status={status} serviceData={serviceData} supplier_id={supplier_id} />
            </KTCard>
        </div>
    </ServiceProvider>
    );
};

export default MaterialDetailSectionLayout;