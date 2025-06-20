/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { SearchComponent } from '../../molecules/header/Search';
import { AddServiceModal } from '../../molecules/modals/AddServiceModal';
import { FinishGoodsTable } from '../../organism/table/FinishGoodsTable';
import { Link } from 'react-router-dom';

// interface UOMSectionProps {
//     Service?: Service[]; // Make optional
//     setService?: React.Dispatch<React.SetStateAction<Service[]>>; // Make optional
// }

export const VariantSectionWithoutAdd = ({ variantFinishGoodsData, finish_goods_id }: any) => {
    const [showModal, setShowModal] = useState(false);

    // const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="card mt-4 p-5 w-100 mb-4">
            <h3>Variant Finish Goods</h3>
            <div className="card p-5 mt-4 justify-content-end col-md-12">
                <div className="d-flex align-items-center justify-content-between">
                    <SearchComponent />
                    <Link to={`/ppic/masterdata/bom/finishgoods/${finish_goods_id}/new/varian`} className="btn border border-primary px-12 py-4 text-primary">
                        Tambah
                    </Link>
                </div>
                {/* <FinishGoodsTable /> */}
                <FinishGoodsTable variantFinishGoodsData={variantFinishGoodsData} />
            </div>

            <AddServiceModal
                show={showModal}
                handleClose={handleCloseModal}
            />
        </div>
    );
};