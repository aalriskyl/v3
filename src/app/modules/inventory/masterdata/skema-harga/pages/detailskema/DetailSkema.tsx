import { FC, useState, useEffect } from 'react';
import { PageTitle, PageLink } from '@metronic/layout/core';
import { Link, useParams } from 'react-router-dom';
import { DeleteConfirmationModal, DeleteSuccessModal } from '@metronic/layout/components/form/organism/DeleteModal';
import { getSchemeById } from '../../core/_request';

const DetailSkema: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [schemeData, setSchemeData] = useState<any>(null);
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
            title: 'Skema Harga',
            path: '/inventory/masterdata/skema-harga',
            isSeparator: false,
            isActive: false,
        },
    ];

    useEffect(() => {
        const fetchSchemeData = async () => {
            if (id) {
                try {
                    const data = await getSchemeById(id);
                    console.log('Fetched data:', data);
                    setSchemeData(data);
                } catch (error) {
                    console.error("Error fetching customer data:", error);
                }
            }
        };
        fetchSchemeData();
    }, [id]);

    const handleDeleteClick = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await getSchemeById(id!);  // Ensure `id` is not null/undefined
            setShowConfirmModal(false);
            setShowSuccessModal(true);
        } catch (error) {
            console.error("Error deleting category:", error);
            alert('Gagal menghapus kategori produk. Silakan coba lagi.');
        }
    };

    const closeModal = () => {
        setShowConfirmModal(false);
        setShowSuccessModal(false);
    };

    if (!schemeData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/* Breadcrumb Header */}
            <PageTitle breadcrumbs={breadcrumbs}>Detail Skema Harga </PageTitle>

            {/* Display Brand Data */}
            <div className="container card p-5 font-secondary">
                <div className="row">
                    {/* Brand Details */}
                    <div className="col-md-6">
                        <div className="mb-6">
                            <label className="form-label fw-bold">Nama Skema Harga</label>
                            <div className="fw-base text-gray-800">{schemeData.name}</div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-6">
                            <label className="form-label fw-bold">Jenis Skema Harga</label>
                            <div className="fw-base text-gray-800">{schemeData.type}</div>
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

export default DetailSkema;