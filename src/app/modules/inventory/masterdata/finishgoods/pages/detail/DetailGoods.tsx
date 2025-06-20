import { FC, useState } from 'react';
import { PageTitle, PageLink } from '@metronic/layout/core';
import { Link } from 'react-router-dom';
import ImageHolder from '../../components/molecules/field/ImageHolder';

const DetailGoods: FC = () => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const breadcrumbs: Array<PageLink> = [
        {
            title: 'Dashboard',
            path: '/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Inventory',
            path: '/inventory',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Master Data',
            path: '/inventory/masterdata',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Finish Goods',
            path: '/inventory/masterdata/finish-goods',
            isSeparator: false,
            isActive: false,
        },
    ];

    const brandData = {
        imageUrl: 'https://via.placeholder.com/150',
        goodsName: 'PT. ABC',
        category: 'Lorem',
        description: 'Brand terbaik dalam industri masak.',
    };

    // Handler for opening the confirmation modal
    const handleDeleteClick = () => {
        setShowConfirmModal(true);
    };

    // Handler for when delete is confirmed in the confirmation modal
    const handleConfirmDelete = () => {
        // Here you would typically make your API call to delete the item
        setShowConfirmModal(false);
        setShowSuccessModal(true);
    };

    // Handler for closing either modal
    const closeModal = () => {
        setShowConfirmModal(false);
        setShowSuccessModal(false);
    };

    return (
        <>
            {/* Breadcrumb Header */}
            <PageTitle breadcrumbs={breadcrumbs}>Detail Finish Goods</PageTitle>

            {/* Display Brand Data */}
            <div className="container card p-5 font-secondary">
                <div className="col-md-12 d-flex">
                    {/* Brand Image */}
                    <div className="mb-4 me-4 col-md-6">
                        <label className="form-label fw-bold">Foto Finish Goods</label>
                        <ImageHolder
                            imageUrl={brandData.imageUrl}
                            altText={`Logo ${brandData.goodsName}`}
                            className=""
                            placeholder="No image available"
                        />
                    </div>
                    {/* Brand Details */}
                    <div className="d-flex flex-column">
                        <div className="col-md-12 mb-6">
                            <label className="form-label fw-bold">Nama</label>
                            <div className="fw-light text-gray-800">{brandData.goodsName}</div>
                        </div>
                        <div className="col-md-12 mb-6">
                            <label className="form-label fw-bold">Category</label>
                            <div className="fw-light text-gray-800">{brandData.category}</div>
                        </div>
                        <div className="col-md-12 mb-2">
                            <label className="form-label fw-bold">Deskripsi</label>
                            <div className="fw-light text-gray-800">{brandData.description}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="row">
                <div className="col-12 text-end my-4">
                    <Link to="../" className="btn btn-primary px-12 py-3 border border-primary me-2">
                        Kembali
                    </Link>
                    {/* <button
                        type="button"
                        className="btn px-12 py-3 border border-gray-500 me-2"
                        onClick={handleDeleteClick}
                    >
                        Hapus
                    </button> */}
                    {/* <Link to="../edit" className="btn btn-primary px-12 py-3 border me-2">
                        Ubah
                    </Link> */}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {/* {showConfirmModal && (
                <DeleteConfirmationModal
                    closeModal={closeModal}
                    onConfirmDelete={handleConfirmDelete}
                />
            )} */}

            {/* Success Modal */}
            {/* {showSuccessModal && (
                <DeleteSuccessModal
                    closeModal={closeModal}
                />
            )} */}
        </>
    );
};

export default DetailGoods;