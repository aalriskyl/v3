import { FC, useEffect, useState } from 'react';
import { PageTitle, PageLink } from '@metronic/layout/core';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DeleteConfirmationModal, DeleteSuccessModal } from '@metronic/layout/components/form/organism/DeleteModal';
import { getCategoryById, deleteCategoryById } from '../../components/core/_request';

const DetailCategory: FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [categoryData, setCategoryData] = useState<any>(null);
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
            path: '/inventory/masterdata/kategori-produk',
            isSeparator: false,
            isActive: false,
        },
    ];

    useEffect(() => {
        const fetchCustomerData = async () => {
            if (id) {
                try {
                    const data = await getCategoryById(id);
                    console.log('Fetched data:', data);
                    setCategoryData(data);
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
            await deleteCategoryById(id!);  // Ensure `id` is not null/undefined
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

    if (!categoryData) {
        return <div>Loading...</div>;
    }

    // Determine access label based on sellable and purchasable
    let accessLabel = '';
    if (categoryData.sellable && categoryData.purchasable) {
        accessLabel = 'Sellable & Purchasable';
    } else if (categoryData.sellable) {
        accessLabel = 'Sellable';
    } else if (categoryData.purchasable) {
        accessLabel = 'Purchasable';
    } else {
        accessLabel = 'No Access';
    }

    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Detail Kategori Produk</PageTitle>
            <div className="container card p-5 font-secondary">
                <div className="row">
                    <div className="col-md-6 mb-6">
                        <label className="form-label fw-bold">Nama</label>
                        <div className="fw-light text-gray-800">{categoryData.name}</div>
                    </div>
                    <div className="col-md-6 mb-6">
                        <label className="form-label fw-bold">Deskripsi</label>
                        <div className="fw-light text-gray-800">{categoryData.description}</div>
                    </div>
                    <div className="col-md-6 mb-6">
                        <label className="form-label fw-bold">Tipe Produk</label>
                        <div className="fw-light text-gray-800">{categoryData.product_type.name}</div>
                    </div>
                    <div className="col-md-6 mb-6">
                        <label className="form-label fw-bold">Akses</label>
                        <div className="fw-light text-gray-800">{accessLabel}</div>
                    </div>

                </div>
            </div>
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
            {showConfirmModal && (
                <DeleteConfirmationModal
                    closeModal={closeModal}
                    onConfirmDelete={handleConfirmDelete}
                />
            )}
            {showSuccessModal && (
                <DeleteSuccessModal
                    closeModal={() => {
                        closeModal();
                        navigate('../');
                    }}
                />
            )}
        </>
    );
};

export default DetailCategory;