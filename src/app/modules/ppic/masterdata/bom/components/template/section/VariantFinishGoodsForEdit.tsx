import { useState } from 'react';
import { FinishGoods } from '../../molecules/core/_models';
import { VariantMaterialUomTable } from '../../organism/table/MaterialsTableUom';
import { SearchComponent } from '../../molecules/header/Search';
import { AddMaterialModal } from '../../molecules/modals/AddMaterialModal';
import { FinishGoodsTable } from '../../organism/table/FinishGoodsTable';
import { Link, useNavigate } from 'react-router-dom';


interface FinishGoodsProp {
    variantFinishGoodsForEdit?: FinishGoods[]; // Make optional
    setVariantFinishGoodsForEdit?: React.Dispatch<React.SetStateAction<FinishGoods[]>>; // Make optional
}

export const GoodsSectionForEdit = ({
    variantFinishGoodsForEdit = [], // Default value if not provided
    setVariantFinishGoodsForEdit = () => { }, // Default function if not provided
}: FinishGoodsProp) => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    // const handleOpenModal = navigate('/addfinishgoods');
    const handleCloseModal = () => setShowModal(false);

    // const handleAddVariantMaterialsUom = (data: VariantMaterialsUom) => {
    //     setVariantMaterialsUoms((prev) => [...prev, { ...data, id: Date.now().toString() }]);
    // };

    return (
        <div className="card p-5 mt-4 w-100 mb-4">
            <h3>Varian Finish Goods</h3>
            <div className="mt-4 justify-content-end col-md-12 card p-5">
                <div className="d-flex align-items-center justify-content-between">
                    <SearchComponent />
                    {/* <Link to="varian" className="btn border border-primary px-12 py-4 text-primary">
                        Tambah
                    </Link> */}
                </div>
                <FinishGoodsTable />
            </div>

            <AddMaterialModal
                show={showModal}
                handleClose={handleCloseModal}
            // onSubmit={handleAddVariantMaterialsUom}
            />
        </div>
    );
};