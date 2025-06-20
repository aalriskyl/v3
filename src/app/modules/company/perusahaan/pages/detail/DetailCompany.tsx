import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageTitle, PageLink } from '@metronic/layout/core';
import { DeleteConfirmationModal, DeleteSuccessModal } from '@metronic/layout/components/form/organism/DeleteModal';
import { Link } from 'react-router-dom';
import { deleteCompany, getCompanyById } from '../../components/core/_request';

const DetailCompany: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [companyData, setCompanyData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
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
            title: 'Company',
            path: '/company',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Perusahaan',
            path: '/company/perusahaan',
            isSeparator: false,
            isActive: false,
        },
    ];

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const data = await getCompanyById(id!);
                setCompanyData(data);
            } catch (error) {
                setError('Failed to fetch company data');
                console.error("Error fetching company data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCompanyData();
    }, [id]);

    // Handler for opening the confirmation modal
    const handleDeleteClick = () => {
        setShowConfirmModal(true);
    };

    // Handler for when delete is confirmed
    const handleConfirmDelete = async () => {
        try {
           await deleteCompany(id!)
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
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Detail Company</PageTitle>

            <div className="container card font-secondary" style={{ padding: '20px' }}>
                <div className="row">
                    {/* First Row */}
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Nama Perusahaan</label>
                            <div className="fw-light text-gray-800">{companyData.name}</div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Alamat Perusahaan</label>
                            <div className="fw-light text-gray-800">{companyData.address}</div>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Tipe Perusahaan</label>
                            <div className="fw-light text-gray-800">{companyData.type}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Keep action buttons and modals the same */}
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

            {/* Keep modals the same */}
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

export default DetailCompany;