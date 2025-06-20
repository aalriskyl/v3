/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useEffect } from 'react';
import { PageTitle } from '@metronic/layout/core';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { DeleteConfirmationModal, DeleteSuccessModal } from '@metronic/layout/components/form/organism/DeleteModal';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import ImageHolder from '../../components/molecules/field/ImageHolder';
import { UOMSectionWithoutAdd } from '../../components/template/section/UOMSectionWithoutAdd';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';

const dummyBOMData = {
    id: '1',
    name: 'Material 1',
    description: 'Ini adalah deskripsi material 1',
    picture: 'Here is the picture',
    brand: 'Brand2',
    setDefault: 'Varian Penjualan',
};

const DetailMaterials: FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [brandData, setBrandData] = useState<any>(null);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setFailedModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchDummyData = async () => {
                try {
                    setTimeout(() => {
                        setBrandData(dummyBOMData);
                    }, 500);
                } catch (error) {
                    console.error('Error fetching dummy data:', error);
                }
            };
            fetchDummyData();
        }
    }, [id]);

    // Handler untuk modal konfirmasi ubah
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

    const handleDelete = () => {
        const isSuccess = Math.random() > 0.5;
        setTimeout(() => {
            setDeleteModalVisible(false);
            if (isSuccess) {
                setSuccessModalVisible(true);
            } else {
                setFailedModalVisible(true);
            }
        }, 1000);
    };

    if (!brandData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <PageTitle breadcrumbs={[]}>Detail Bill of Material</PageTitle>

            <div className="container card p-5 font-secondary mb-8">
                <h4 className="mb-8">Material</h4>
                <div className="row">
                    <div className="col-md-6">
                        {/* Brand Image */}
                        <div className="mb-4">
                            <label className="form-label fw-bold">Foto Material</label>
                            <ImageHolder
                                imageUrl={brandData.imageUrl}
                                altText={`Logo ${brandData.name}`}
                                className=""
                                placeholder="No image available"
                            />
                            <label className="form-label fw-bold mt-3">Deskripsi</label>
                            <div className="fw-light text-gray-800">{brandData.description}</div>
                        </div>
                    </div>
                    {/* Brand Details */}
                    <div className="col-md-6">
                        <div className="col-md-12 mb-6">
                            <label className="form-label fw-bold">Nama Material</label>
                            <div className="fw-light text-gray-800">{brandData.name}</div>
                        </div>
                        <div className="col-md-12 mb-2">
                            <label className="form-label fw-bold">Kategori Material</label>
                            <div className="fw-light text-gray-800">{brandData.description}</div>
                        </div>
                        {/* <div className="col-md-12 mb-2">
                            <label className="form-label fw-bold">Brand</label>
                            <div className="fw-light text-gray-800">{brandData.brand}</div>
                        </div> */}
                        <div className="col-md-12 mb-2">
                            <label className="form-label fw-bold">SetDefault</label>
                            <div className="fw-light text-gray-800">{brandData.setDefault}</div>
                        </div>
                    </div>
                </div>
            </div>

            <UOMSectionWithoutAdd />

            <div className="row">
                <div className="col-12 text-end my-4">
                    <Link to="../" className="btn px-12 py-3 border border-gray-500 me-2">
                        Kembali
                    </Link>
                    <button
                        type="button"
                        className="btn px-12 py-3 border border-gray-500 me-2"
                        onClick={() => setDeleteModalVisible(true)}
                    >
                        Hapus
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary border border-primary px-16 py-3"
                        onClick={handleSave}
                    >
                        Ubah
                    </button>
                </div>
            </div>

            {/* Modal Konfirmasi Hapus */}
            {isDeleteModalVisible && (
                <DeleteConfirmationModal
                    cancelLabel='Kembali'
                    confirmLabel='Hapus'
                    onConfirmDelete={handleDelete}
                    closeModal={() => setDeleteModalVisible(false)}
                    title='Hapus Data'
                    message='Data akan terhapus dan tidak bisa dikembalikan.'
                />
            )}

            {/* Modal Sukses Hapus */}
            {isSuccessModalVisible && (
                <DeleteSuccessModal
                    closeModal={() => {
                        setSuccessModalVisible(false);
                        navigate('../');
                    }}
                    message='Data berhasil dihapus.'
                />
            )}

            {/* Modal Gagal Hapus */}
            {isFailedModalVisible && (
                <FailedModal
                    closeModal={() => setFailedModalVisible(false)}
                    title='Gagal'
                    message='Material gagal dihapus.'
                />
            )}

            {/* Modal Konfirmasi Ubah */}
            {isModalVisible && (
                <ConfirmModal
                    handleSubmit={handleConfirm}
                    closeModal={handleCloseModal}
                    headTitle="Ubah Bill of Material"
                    confirmButtonLabel="Simpan"
                    cancelButtonLabel="Batalkan"
                    message="Pastikan bahwa semua informasi sudah benar."
                />
            )}

            {/* Modal Sukses Ubah */}
            {isSuccessModalVisible && (
                <SuccessModal
                    closeModal={handleCloseSuccessModal}
                    message="Data berhasil diubah!"
                />
            )}

            {/* Modal Gagal Ubah */}
            {isFailedModalVisible && (
                <FailedModal
                    closeModal={handleCloseFailedModal}
                    title='Gagal'
                    message='Material gagal diubah.'
                />
            )}
        </>
    );
};

export default DetailMaterials;