import { FC, useState } from 'react';
import { PageTitle, PageLink } from '@metronic/layout/core';
import { Link } from 'react-router-dom';
import { DeleteConfirmationModal, DeleteSuccessModal } from '@metronic/layout/components/form/organism/DeleteModal';

const DetailItem: FC = () => {
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
            title: 'Kategori Produk',
            path: '/inventory/masterdata/item-bundling',
            isSeparator: false,
            isActive: false,
        },
    ];

    const layananData = {
        layananName: 'Lorem Ipsum',
        category: 'Lorem',
        description: 'Satuan Baru',
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
            <PageTitle breadcrumbs={breadcrumbs}>Detail Item Bundling</PageTitle>

            {/* Display Brand Data */}
            <div className="card p-5 mb-8">
                <div className="row g-4">
                    <h2 className="">Deskripsi</h2>
                    <div className="col-md-6">
                        <h5>Nama</h5>
                        <label>Lorem</label>
                    </div>
                    <div className="col-md-6">
                        <h5>Deskripsi</h5>
                        <label>Lorem</label>
                    </div>
                </div>
            </div>
            <div className="card p-5">
                <h2 className="mb-0">Barang</h2>
                <div className="mb-4">
                    <div className="d-flex align-items-start mt-6">
                        {/* Nomor Urut */}
                        <div className="me-3 fs-6 mt-7 text-center" style={{ width: '30px' }}>
                            <span>1</span>
                        </div>

                        {/* Input Nama */}
                        <div className="me-3 fs-6 flex-grow-1">
                            <h6>Finish Goods</h6>
                            <span>Lorem Impsum</span>
                        </div>

                        {/* Input Deskripsi */}
                        <div className="me-3 fs-6 flex-grow-1">
                            <h6>Deskripsi</h6>
                            <span>Lorem Impsum</span>
                        </div>
                    </div>
                    {/* Separator */}
                    <div className="separator border-gray-400 mt-6 w-90"></div>
                    <div className="d-flex align-items-start mt-6">
                        {/* Nomor Urut */}
                        <div className="me-3 fs-6 mt-7 text-center" style={{ width: '30px' }}>
                            <span>2</span>
                        </div>

                        {/* Input Nama */}
                        <div className="me-3 fs-6 flex-grow-1">
                            <h6>Finish Goods</h6>
                            <span>Lorem Impsum</span>
                        </div>

                        {/* Input Deskripsi */}
                        <div className="me-3 fs-6 flex-grow-1">
                            <h6>Deskripsi</h6>
                            <span>Lorem Impsum</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card p-5 my-8">
                <div className="row g-4">
                    <h2>Deskripsi</h2>
                    <div className="col-md-12 d-flex">
                        {/* Brand Details */}
                        <div className="d-flex flex-column col-md-6">
                            <div className="col-md-12 col-lg-12 mb-6">
                                <label className="form-label fw-bold">Jenis Discount</label>
                                <div className="fw-light text-gray-800">test</div>
                            </div>
                            <div className="col-md-12 mb-2">
                                <label className="form-label fw-bold">Harga Total</label>
                                <div className="fw-light text-gray-800">desc</div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-2">
                            <label className="form-label fw-bold">Discount</label>
                            <div className="fw-light text-gray-800">kate</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Action Buttons */}
            <div className="row">
                <div className="col-12 text-end my-4">
                    <Link to="../" className="btn px-12 py-3 border border-gray-500 me-2">
                        Kembali
                    </Link>
                    <button
                        type="button"
                        className="btn px-12 py-3 border border-gray-500 me-2"
                        onClick={handleDeleteClick}
                    >
                        Hapus
                    </button>
                    <Link to="../edit" className="btn btn-primary px-12 py-3 border me-2">
                        Ubah
                    </Link>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showConfirmModal && (
                <DeleteConfirmationModal
                    closeModal={closeModal}
                    onConfirmDelete={handleConfirmDelete}
                />
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <DeleteSuccessModal
                    closeModal={closeModal}
                />
            )}
        </>
    );
};

export default DetailItem;