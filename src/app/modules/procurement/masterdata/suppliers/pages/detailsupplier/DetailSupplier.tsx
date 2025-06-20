import { FC, useEffect, useState } from 'react';
import { PageTitle, PageLink } from '@metronic/layout/core';
import { Link, useParams } from 'react-router-dom';
import { DeleteConfirmationModal, DeleteSuccessModal } from '@metronic/layout/components/form/organism/DeleteModal';
import { getSupplierById, deleteSupplier } from '../../core/_request';

const DetailSupplier: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [supplierData, setSupplierData] = useState<any>(null); // State to store customer data
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
            title: 'Procurement',
            path: '/procurement',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Master Data',
            path: '/procurement/masterdata/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Suppliers',
            path: '/procurement/masterdata/suppliers',
            isSeparator: false,
            isActive: false,
        },
    ];

    // Fetch customer data by id
    useEffect(() => {
        const fetchCustomerData = async () => {
            if (id) {
                try {
                    const data = await getSupplierById(id);
                    setSupplierData(data);
                } catch (error) {
                    console.error("Error fetching data:", error);
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
            await deleteSupplier(id!);  // Make sure `id` is not null/undefined
            setShowConfirmModal(false);
            setShowSuccessModal(true);
        } catch (error) {
            console.error("Error deleting customer:", error);
            alert('Gagal menghapus customer. Silakan coba lagi.');
        }
    };

    // Handler for closing modals
    const closeModal = () => {
        setShowConfirmModal(false);
        setShowSuccessModal(false);
    };

    // Loading state if data is not yet available
    if (!supplierData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/* Breadcrumb Header */}
            <PageTitle breadcrumbs={breadcrumbs}>Detail Supplier</PageTitle>

            {/* Display Customer Data */}
            <div className="container card p-5 font-secondary">
                <div className="row g-1">
                    <div className="col-md-6 mb-2">
                        <label className="form-label fw-bold">Nama Perusahaan</label>
                        <div className="fw-light text-gray-800">{supplierData.name}</div>
                    </div>

                    <div className="col-md-6 mb-2">
                        <label className="form-label">Email</label>
                        <div className="fw-light text-gray-800">{supplierData.email}</div>
                    </div>

                    <div className="col-md-6 mb-2">
                        <label className="form-label fw-bold">Nomor Handphone</label>
                        <div className="fw-light text-gray-800">{supplierData.phone}</div>
                    </div>

                    <div className="col-md-6 mb-2">
                        <label className="form-label fw-bold">Kota</label>
                        <div className="fw-light text-gray-800">{supplierData.city.name}</div>
                    </div>

                    <div className="col-md-6 mb-2">
                        <label className="form-label fw-bold">Industri</label>
                        <div className="fw-light text-gray-800">{supplierData.industry}</div>
                    </div>
                     <div className="col-md-6 mb-2">
                        <label className="form-label fw-bold">Is Company</label>
                        <div className="fw-light text-gray-800">{supplierData.is_a_company ? 'Yes' : 'No'}</div>
                    </div>

                    <div className="col-md-6 mb-2">
                        <label className="form-label fw-bold">Alamat</label>
                        <div className="fw-light text-gray-800">{supplierData.address}</div>
                    </div>
                    {supplierData.is_a_company === true && (
                        <div className="col-md-6 mb-2">
                        <label className="form-label fw-bold">Company</label>
                        <div className="fw-light text-gray-800">{supplierData.is_company.name}</div>
                    </div>
                    )}
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
                    <Link to={`../edit/${id}`} className="btn btn-primary px-12 py-3 border me-2">
                        Ubah
                    </Link>
                </div>
            </div>

            {/* Delete Modals */}
            {showConfirmModal && (
                <DeleteConfirmationModal
                    closeModal={closeModal}
                    onConfirmDelete={handleConfirmDelete}
                />
            )}
            {showSuccessModal && (
                <DeleteSuccessModal
                    closeModal={closeModal}
                />
            )}
        </>
    );
};

export default DetailSupplier;
