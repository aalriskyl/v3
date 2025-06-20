/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import { VariantMaterialsUom } from '../../molecules/core/_models';
import { VariantMaterialUomTable } from '../../organism/table/MaterialsTableUom';
import { ServiceTable } from '../../organism/table/ServiceTable';
import { SearchComponent } from '../../molecules/header/Search';
import { AddMaterialModal } from '../../molecules/modals/AddMaterialModal';
import { AddServiceModal } from '../../molecules/modals/AddServiceModal';

interface UOMSectionWithoutAddProps {
    variantMaterialsUoms?: VariantMaterialsUom[]; // Make optional
    setVariantMaterialsUoms?: React.Dispatch<React.SetStateAction<VariantMaterialsUom[]>>; // Make optional
}

export const UOMSectionWithoutAdd = ({
    variantMaterialsUoms = [],
    setVariantMaterialsUoms = () => { }, 
}: any) => {
    const [showMaterialModal, setShowMaterialModal] = useState(false);
    const [showServiceModal, setShowServiceModal] = useState(false);

    // const handleOpenMaterialModal = () => setShowMaterialModal(true);
    const handleCloseMaterialModal = () => setShowMaterialModal(false);

    // const handleOpenServiceModal = () => setShowServiceModal(true);
    const handleCloseServiceModal = () => setShowServiceModal(false);

    // const handleAddVariantMaterialsUom = (data: VariantMaterialsUom) => {
    //   setVariantMaterialsUoms((prev) => [...prev, { ...data, id: Date.now().toString() }]);
    // };

    return (
        <div className="card p-5 mt-4 w-100">
            <h3>Resep</h3>

            <div className="my-6 justify-content-end col-md-12 card p-5">
                <h4>Material</h4>
                <div className="d-flex align-items-center justify-content-between">
                    <SearchComponent />
                </div>
                <VariantMaterialUomTable materialDataChoice={[]} onDelete={() => {}}/>
            </div>

            <div className="mt-10 justify-content-end col-md-12 card p-5">
                <h4>Layanan</h4>
                <div className="d-flex align-items-center justify-content-between">
                    <SearchComponent />
                </div>
                <ServiceTable serviceDataChoice={[]} onDelete={() => {}} />
            </div>

            <AddMaterialModal
                show={showMaterialModal}
                handleClose={handleCloseMaterialModal}
            // onSubmit={handleAddVariantMaterialsUom}
            />

            <AddServiceModal
                show={showServiceModal}
                handleClose={handleCloseServiceModal}
            // onSubmit={handleAddVariantMaterialsUom}
            />
        </div>
    );
};