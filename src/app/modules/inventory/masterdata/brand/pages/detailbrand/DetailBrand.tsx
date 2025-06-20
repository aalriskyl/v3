import { FC, useState, useEffect } from 'react';
import { PageTitle, PageLink } from '@metronic/layout/core';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { DeleteConfirmationModal, DeleteSuccessModal } from '@metronic/layout/components/form/organism/DeleteModal';
import ImageHolder from '../../components/molecules/field/ImageHolder';
import { deleteBrand, getBrandById } from '../../core/_request';
import { Row } from 'react-bootstrap';
const API_BASE_URL = import.meta.env.VITE_APP_API_URL;




const DetailBrand: FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [brandData, setBrandData] = useState<any>(null);
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
            isActive: true,
        },
        {
            title: 'Master Data',
            path: '/inventory/masterdata',
            isSeparator: false,
            isActive: true,
        },
        {
            title: 'Brand',
            path: '/inventory/masterdata/brand',
            isSeparator: false,
            isActive: false,
        },
    ];

    const baseUrl = API_BASE_URL;

    useEffect(() => {
        const fetchCustomerData = async () => {
            if (id) {
                try {
                    const data = await getBrandById(id);
                    console.log('Fetched data:', data);
                    setBrandData(data);
                } catch (error) {
                    console.error("Error fetching customer data:", error);
                }
            }
        };
        fetchCustomerData();
    }, [id]);

    const handleDeleteClick = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteBrand(id!);  // Ensure `id` is not null/undefined
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

    if (!brandData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/* Breadcrumb Header */}
            <PageTitle breadcrumbs={breadcrumbs}>Detail Brand</PageTitle>

            {/* Display Brand Data */}
            <div className="container card p-5 font-secondary">
                <div className="row">
                    <div className="col-md-6 d-flex">
                        {/* Brand Image */}
                        <div className="mb-4 me-4 col-md-12">
                            <label className="form-label fw-bold">Foto Brand</label>
                            <ImageHolder
                                imageUrl={`${baseUrl}/${brandData.picture}`}
                                altText={`Logo ${brandData.name}`}
                                className=""
                                placeholder="No image available"
                            />
                        </div>
                        {/* Brand Details */}
                        <div className="col-md-6">
                            <div className="col-md-12 mb-6">
                                <label className="form-label fw-bold">Nama Brand</label>
                                <div className="fw-light text-gray-800">{brandData.name}</div>
                            </div>
                            <div className="col-md-12 mb-2">
                                <label className="form-label fw-bold">Deskripsi</label>
                                <div className="fw-light text-gray-800">{brandData.description}</div>
                            </div>
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
                    <Link to={`../edit/${id}`} className="btn btn-primary px-12 py-3 border me-2">
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

export default DetailBrand;