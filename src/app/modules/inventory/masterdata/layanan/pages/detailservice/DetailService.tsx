import { FC, useState, useEffect } from 'react';
import { PageTitle, PageLink } from '@metronic/layout/core';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { DeleteConfirmationModal, DeleteSuccessModal } from '@metronic/layout/components/form/organism/DeleteModal';
import { getServiceById } from '../../components/core/_request'; // Import the getServiceById function
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import SupplierDetailTableLayout from '../../components/template/SupplierDetailTableLayout';
import SupplierTableLayout from '../../components/template/SupplierTableLayout';
import { deleteService } from '../../components/core/_request';
import OverlayLoader from '@metronic/layout/components/OverlayLoader';

const DetailService: FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [serviceData, setServiceData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setFailedModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

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
            title: 'Layanan',
            path: '/inventory/masterdata/layanan',
            isSeparator: false,
            isActive: false,
        },
    ];

    // Fetch Layanan data based on id
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await getServiceById(id!); // Call the getServiceById function
                setServiceData(response); // Set the service data directly
            } catch (err) {
                setError('Failed to fetch layanan data.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleSave = () => {
        setIsModalVisible(true);
    };

    const handleConfirm = () => {
        setIsModalVisible(false);
        try {
            console.log('Data berhasil diubah');
            setSuccessModalVisible(true);
        } catch (error) {
            console.error('Gagal mengubah data', error);
            setFailedModalVisible(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleCloseSuccessModal = () => {
        setSuccessModalVisible(false);
        navigate('../');
    };

    const handleCloseFailedModal = () => {
        setFailedModalVisible(false);
    };
    
    const handleDeleteClick = () => {
        setDeleteModalVisible(true);
    };

    const handleDelete = async () => {
        try {
            await deleteService(id!); // Call the deleteService function
            setDeleteModalVisible(false);
        } catch (error) {
            console.error('Gagal menghapus data', error);
            setDeleteModalVisible(false);
            setFailedModalVisible(true); // Show failure modal
        } finally {
            setSuccessModalVisible(true);
            // navigate('../')
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!serviceData) {
        return <div>Data tidak ditemukan</div>;
    }

    // Accessing the nested properties
    const { name, description, brand, category, default_purchase, default_sale, sell_price } = serviceData;

    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Detail Layanan</PageTitle>
            {
                isLoading && <OverlayLoader/>
            }
            {/* Display Brand Data */}
            <div className="container card p-5 font-secondar mb-8">
                <h4 className="mb-8">Layanan</h4>
                <div className="row">
                    {/* Kolom Kiri */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label fw-bold">Nama Layanan</label>
                            <div className="fw-light text-gray-800">{name || "Nama kosong"}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Brand</label>
                            <div className="fw-light text-gray-800">{brand?.name || "Brand kosong"}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Harga Jual</label>
                            <div className="fw-light text-gray-800">{sell_price || "Harga Jual ga Kosong"}</div>
                        </div>
                    </div>
                    {/* Kolom Kanan */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label fw-bold">Kategori Produk</label>
                            <div className="fw-light text-gray-800">{category?.name || "Kategori kosong"}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Deskripsi</label>
                            <div className="fw-light text-gray-800">{description || "Deskripsi kosong"}</div>
                        </div>
                        {/* <div className="mb-3">
                            <label className="form-label fw-bold">Set default</label>
                            <div className="fw-light text-gray-800">
                                Default Purchase: {default_purchase ? 'Yes' : 'No'}
                            </div>
                            <div className="fw-light text-gray-800">
                                Default Sale: {default_sale ? 'Yes' : 'No'}
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            <SupplierTableLayout id={id || ''} />

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
                    <Link
                        to={`/inventory/masterdata/layanan/edit/${id}`}
                        className="btn btn-primary border border-primary px-16 py-3"
                    >
                        Ubah
                    </Link>
                </div>
            </div>

            {isDeleteModalVisible && (
                <DeleteConfirmationModal
                    cancelLabel='Kembali'
                    confirmLabel='Hapus'
                    onConfirmDelete={handleDelete}
                    closeModal={() => setDeleteModalVisible(false)}
                    title='Hapus Data?'
                    message='Data akan terhapus dan tidak bisa dikembalikan.'
                />
            )}

            {isSuccessModalVisible && (
                <DeleteSuccessModal
                    closeModal={() => {
                        setSuccessModalVisible(false);
                        navigate('../');
                    }}
                    title='Berhasil'
                    message='Data berhasil dihapus.'
                />
            )}

            {isFailedModalVisible && (
                <FailedModal
                    closeModal={() => setFailedModalVisible(false)}
                    title='Gagal'
                    message='Layanan gagal dihapus.'
                />
            )}

            {isModalVisible && (
                <ConfirmModal
                    handleSubmit={handleConfirm}
                    closeModal={handleCloseModal}
                    headTitle="Ubah Layanan"
                    confirmButtonLabel="Ubah"
                    cancelButtonLabel="Batalkan"
                    message="Pastikan bahwa semua informasi sudah benar."
                />
            )}

            {isSuccessModalVisible && (
                <SuccessModal
                    closeModal={handleCloseSuccessModal}
                    successMessage= "Data berhasil terhapus"
                />
            )}

            {isFailedModalVisible && (
                <FailedModal
                    closeModal={handleCloseFailedModal}
                    title='Gagal'
                    message='Layanan gagal diubah.'
                />
            )}
        </>
    );
};

export default DetailService;