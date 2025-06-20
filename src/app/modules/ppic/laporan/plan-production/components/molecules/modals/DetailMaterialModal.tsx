import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import { DeleteConfirmationModal, DeleteSuccessModal } from '@metronic/layout/components/form/organism/DeleteModal';
import { dummyMaterials } from '../../organisms/table/dummyUsers'; // Import dummyMaterials

interface DetailMaterialModalProps {
    show: boolean;
    handleClose: () => void;
    id: string;
}

export const DetailMaterialModal = ({ show, handleClose }: DetailMaterialModalProps) => {
    const { id = '' } = useParams<{ id: string }>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setFailedModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [materialData, setMaterialData] = useState<any>(null);
    // const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    useEffect(() => {
        if (!id) {
            setError('ID is undefined or invalid');
            return;
        }

        // Konversi id dari string ke number
        const materialId = parseInt(id, 10);

        // Cari data material dari dummyMaterials berdasarkan id
        const material = dummyMaterials.find((item) => item.id === materialId);

        if (material) {
            setMaterialData(material);
            setError(null);
        } else {
            setError('Data material tidak ditemukan.');
        }
    }, [id]);


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

    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <h2>Detail Material</h2>
                </Modal.Header>
                <Modal.Body>
                    {error ? (
                        <p>{error}</p>
                    ) : materialData ? (
                        <div className="detail-material">
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className="mb-4">
                                        <h4>Bill of Material</h4>
                                        <p>{materialData.bill_of_materials}</p>
                                    </div>
                                    <div className="mb-4">
                                        <h4>Jenis Buffer Stock</h4>
                                        <p>{materialData.jenis_buffer_stock}</p>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="mb-4">
                                        <h4>Jumlah</h4>
                                        <p>{materialData.jumlah_produksi}</p>
                                    </div>
                                    <div className="mb-4">
                                        <h4>Buffer Stock</h4>
                                        <p>{materialData.buffer_stock}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Data material tidak ditemukan.</p>
                    )}

                    <div className="d-flex mt-4 g-4 justify-content-end">
                        {/* <Button variant="secondary" onClick={handleClose}>
                            Kembali
                        </Button>
                        <div className="d-flex gap-4">
                            <button
                                type="button"
                                className="btn border border-primary px-8 py-2 text-primary"
                                onClick={handleOpenDeleteModal}
                            >
                                Hapus
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary border border-primary px-16 py-2"
                                onClick={handleOpenEditModal}
                            >
                                Ubah
                            </button>
                        </div> */}
                        <Button variant="secondary" onClick={handleClose}>
                            Kembali
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

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
                    closeModal={() => setSuccessModalVisible(false)}
                    message="Data berhasil dihapus!"
                />
            )}

            {isFailedModalVisible && (
                <FailedModal
                    closeModal={() => setFailedModalVisible(false)}
                    title='Gagal'
                    message='Material gagal dihapus.'
                />
            )}

            {isModalVisible && (
                <ConfirmModal
                    handleSubmit={handleConfirm}
                    closeModal={handleCloseModal}
                    headTitle="Ubah Material"
                    confirmButtonLabel="Ubah"
                    cancelButtonLabel="Batalkan"
                    message="Pastikan bahwa semua informasi sudah benar."
                />
            )}

            {isSuccessModalVisible && (
                <SuccessModal
                    closeModal={handleCloseSuccessModal}
                    message="Data berhasil diubah!"
                />
            )}

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