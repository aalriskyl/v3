import { FC, useState, useEffect } from 'react';
import { PageTitle, PageLink } from '@metronic/layout/core';
import { Link, useParams } from 'react-router-dom';
import { getUomById, deleteUomById } from '../../components/core/_request';
import { DeleteConfirmationModal, DeleteSuccessModal } from '@metronic/layout/components/form/organism/DeleteModal';

const DetailUom: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [uomData, setUomData] = useState<any>(null); // State to store customer data
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
            title: 'Satuan UOM',
            path: '/inventory/masterdata/satuan-uom',
            isSeparator: false,
            isActive: false,
        },
    ];

    useEffect(() => {
        const fetchCustomerData = async () => {
            if (id) {
                try {
                    const data = await getUomById(id);
                    setUomData(data);
                } catch (error) {
                    console.error("Error fetching customer data:", error);
                }
            }
        };
        fetchCustomerData();
    }, [id]);

    // Handler for opening the confirmation modal
    const handleDeleteClick = () => {
        setShowConfirmModal(true);
    };

    // Handler for when delete is confirmed
    const handleConfirmDelete = async () => {
        try {
            await deleteUomById(id!);  // Make sure `id` is not null/undefined
            setShowConfirmModal(false);
            setShowSuccessModal(true);
        } catch (error) {
            console.error("Error deleting uom:", error);
            alert('Gagal menghapus customer. Silakan coba lagi.');
        }
    };

    // Handler for closing modals
    const closeModal = () => {
        setShowConfirmModal(false);
        setShowSuccessModal(false);
    };

    // Loading state if data is not yet available
    if (!uomData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/* Breadcrumb Header */}
            <PageTitle breadcrumbs={breadcrumbs}>Detail Satuan/UOM</PageTitle>

            {/* Display Brand Data */}
            <div className="container card p-5 font-secondary">
                <div className="col-md-12 d-flex">
                    {/* Brand Details */}
                    <div className="d-flex flex-column  col-md-6">
                        <div className="col-md-12 col-lg-12 mb-6">
                            <label className="form-label fw-bold">Nama Satuan/UOM</label>
                            <div className="fw-base text-gray-800">{uomData.name}</div>
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

export default DetailUom;