/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import { VariantMaterialUomTable } from '../../organism/table/MaterialsTableUom';
import { ServiceTable } from '../../organism/table/ServiceTable';
import { SearchComponent } from '../../molecules/header/Search';
import { AddMaterialModal } from '../../molecules/modals/AddMaterialModal';
import { AddServiceModal } from '../../molecules/modals/AddServiceModal';

// interface UOMSectionProps {
//     variantMaterialsUoms?: VariantMaterialsUom[]; // Make optional
//     setVariantMaterialsUoms?: React.Dispatch<React.SetStateAction<VariantMaterialsUom[]>>; // Make optional
// }

interface MaterialFormData {
    material: { id: string; name: string };
    quantity: string;
    uom: { id: string; name: string };
    supplier: { id: string; name: string };
}

interface ServiceFormData {
    service: {
        id: string;
        name: string;
    };
    supplier: {
        id: string;
        name: string;
    }
}

export const RecipeSection = ({
    materialDataChoice,
    serviceDataChoice,
    setMaterialDataChoice,
    setServiceDataChoice,
}: any) => {

    const handleDeleteService = (index: number) => {
        setServiceDataChoice((prev: any[]) => prev.filter((_, i) => i !== index));
    
    };

    const handleDeleteMaterial = (index: number) => {
        setMaterialDataChoice((prev: any[]) => prev.filter((_, i) => i !== index));
    }

    const [showMaterialModal, setShowMaterialModal] = useState(false);
    const [showServiceModal, setShowServiceModal] = useState(false);


    const handleOpenMaterialModal = () => setShowMaterialModal(true);
    const handleCloseMaterialModal = () => setShowMaterialModal(false);

    const handleOpenServiceModal = () => setShowServiceModal(true);
    const handleCloseServiceModal = () => setShowServiceModal(false);

    const handleAddVariantMaterialsUom = (data: MaterialFormData) => {
        setMaterialDataChoice([...materialDataChoice, data]);
    };

    const handleAddVariantService = (data: ServiceFormData) => {
        setServiceDataChoice([...serviceDataChoice, data])
    }

    return (
        <div className="card p-5 mt-4 w-100">
            <div className="my-6 justify-content-end col-md-12 card p-5">
                <h4>Ingredient Material</h4>
                <div className="d-flex align-items-center justify-content-between">
                    <SearchComponent />
                    <button
                        type="button"
                        onClick={handleOpenMaterialModal}
                        className="btn border border-primary px-12 py-4 text-primary"
                    >
                        Tambah
                    </button>
                </div>
                <VariantMaterialUomTable 
                    materialDataChoice={materialDataChoice}
                    onDelete={handleDeleteMaterial}    
                />
            </div>

            <div className="mt-10 justify-content-end col-md-12 card p-5">
                <h4>Layanan</h4>
                <div className="d-flex align-items-center justify-content-between">
                    <SearchComponent />
                    <button
                        type="button"
                        onClick={handleOpenServiceModal}
                        className="btn border border-primary px-12 py-4 text-primary"
                    >
                        Tambah
                    </button>
                </div>
                <ServiceTable
                    serviceDataChoice={serviceDataChoice}
                    onDelete={handleDeleteService}
                />
            </div>

            <AddMaterialModal
                show={showMaterialModal}
                handleClose={handleCloseMaterialModal}
                onSubmit={handleAddVariantMaterialsUom}
            />

            <AddServiceModal
                show={showServiceModal}
                handleClose={handleCloseServiceModal}
                onSubmit={handleAddVariantService}
            />
        </div>
    );
};