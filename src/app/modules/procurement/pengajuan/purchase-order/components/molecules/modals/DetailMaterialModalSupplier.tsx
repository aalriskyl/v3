import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import { DeleteConfirmationModal, DeleteSuccessModal } from '@metronic/layout/components/form/organism/DeleteModal';
import { EditMaterialModal } from './EditMaterialModal';
// import { dummyMaterials } from '../../organisms/table/dummyUsers';
import { ID } from '@metronic/helpers';
import { getDetailMaterialPo } from '../../../core/_request';
import axiosInstance from '../../../../../../../../service/axiosInstance';
import { getErrorMessage } from '../../../../../../../helper/getErrorMessage';

interface DetailMaterialModalProps {
    show: boolean;
    handleClose: () => void;
    materialId?: ID;
}

export const DetailMaterialModal = ({ show, handleClose, materialId }: DetailMaterialModalProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setFailedModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [materialData, setMaterialData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [failedMessage, setFailedMessage] = useState<string | null>(null);

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!materialId) {
    //         setError('ID is undefined or invalid');
    //         return;
    //     }

        // Find material data from dummyMaterials based on materialId
        // const material = dummyMaterials.find((item) => item.id === materialId);

    //     if (material) {
    //         setMaterialData(material);
    //         setError(null);
    //     } else {
    //         setError('Data material tidak ditemukan.');
    //     }
    // }, [materialId]);

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

    const handleDelete = async () => {
        try {
            if (!materialId) {
                throw new Error("Material ID tidak ditemukan.");
            }
            await axiosInstance.delete(`/procurement/submission/purchase-order/purchase-order-material/${materialId}`);
            setDeleteModalVisible(false);
            setSuccessModalVisible(true);
        } catch (error) {
            setFailedMessage(getErrorMessage(error));
        }
    };


    const handleOpenDeleteModal = () => {
        handleClose(); // Close detail modal
        setDeleteModalVisible(true); // Open delete modal
    };

    const handleOpenEditModal = () => {
        handleClose(); // Close detail modal
        setIsEditModalVisible(true); // Open edit modal
    };

    const handleCloseEditModal = () => {
        setIsEditModalVisible(false);
    };

    const handleEditSubmit = (data: any) => {
        console.log('Edited data:', data);
        // Here you can handle the data submission logic
        setSuccessModalVisible(true);
        handleCloseEditModal(); // Close edit modal after submission
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
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-4">
                                        <h4>Material</h4>
                                        <p>{materialData.material}</p>
                                    </div>
                                    <div className="mb-4">
                                        <h4>Jumlah</h4>
                                        <p>{materialData.jumlah}</p>
                                    </div>
                                    <div className="mb-4">
                                        <h4>Barcode</h4>
                                        <p>{materialData.barcode}</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-4">
                                        <h4>Konversi Material</h4>
                                        <p>{materialData.konversi_material}</p>
                                    </div>
                                    <div className="mb-4">
                                        <h4>Satian UOM</h4>
                                        <p>{materialData.uom}</p>
                                    </div>
                                    <div className="mb-4">
                                        <h4>Harga</h4>
                                        <p>{materialData.harga}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Data material tidak ditemukan.</p>
                    )}

                    <div className="d-flex mt-4 g-4 justify-content-between">
                        <Button variant="secondary" onClick={handleClose}>
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
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {isDeleteModalVisible && (
                <DeleteConfirmationModal
                    cancelLabel="Kembali"
                    confirmLabel="Hapus"
                    onConfirmDelete={handleDelete}
                    closeModal={() => setDeleteModalVisible(false)}
                    title="Hapus Data?"
                    message="Data akan terhapus dan tidak bisa dikembalikan."
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
                    title="Gagal"
                    message="Material gagal dihapus."
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
                    title="Gagal"
                    message="Material gagal diubah."
                />
            )}

            {isEditModalVisible && (
                <EditMaterialModal
                    show={isEditModalVisible}
                    handleClose={handleCloseEditModal}
                    purchaseOrderId="b"
                />
            )}
        </>
    );
};