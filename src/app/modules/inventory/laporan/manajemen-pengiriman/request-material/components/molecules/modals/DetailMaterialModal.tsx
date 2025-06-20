import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import { DeleteConfirmationModal, DeleteSuccessModal } from '@metronic/layout/components/form/organism/DeleteModal';
import { EditMaterialModal } from './EditMaterialModal';
import axiosInstance from '../../../../../../../../../service/axiosInstance'; // Adjust the path to your axiosInstance
import { ID } from '@metronic/helpers';

interface DetailMaterialModalProps {
    show: boolean;
    handleClose: () => void;
    materialId?: ID;
    status?: string;
}

export const DetailMaterialModal = ({ show, handleClose, materialId, status }: DetailMaterialModalProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setFailedModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [materialData, setMaterialData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // Fetch material details based on materialId
    useEffect(() => {
        const fetchMaterialDetails = async () => {
            if (!materialId) {
                setError('Material ID is missing or invalid');
                return;
            }

            setIsLoading(true);
            try {
                const response = await axiosInstance.get(
                    `/inventory/submission/delivery-management/material-request/material-request-material/${materialId}`
                );
                setMaterialData(response.data.data); // Assuming the API returns the material details
                setError(null);
            } catch (error) {
                console.error('Failed to fetch material details:', error);
                setError('Failed to fetch material details. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        if (show) {
            fetchMaterialDetails();
        }
    }, [materialId, show]);

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
        navigate(0);
    };

    const handleCloseFailedModal = () => {
        setFailedModalVisible(false);
    };

    const handleDelete = async () => {
        if (!materialId) {
            setError('Material ID is missing or invalid');
            return;
        }

        setIsLoading(true);
        try {
            await axiosInstance.delete(
                `/inventory/submission/delivery-management/material-request/material-request-material/${materialId}`
            );
            setDeleteModalVisible(false);
            setSuccessModalVisible(true); // Show success modal
        } catch (error) {
            console.error('Failed to delete material:', error);
            setFailedModalVisible(true); // Show failed modal
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenDeleteModal = () => {
        handleClose(); // Close detail modal
        setDeleteModalVisible(true); // Open delete confirmation modal
    };

    const handleOpenEditModal = () => {
        handleClose(); // Close detail modal
        setIsEditModalVisible(true); // Open edit modal
    };

    const handleCloseEditModal = () => {
        setIsEditModalVisible(false);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <h2>Detail Material</h2>
                </Modal.Header>
                <Modal.Body>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : materialData ? (
                        <div className="detail-material">
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className="mb-4">
                                        <h4>Material</h4>
                                        <p>{materialData.material?.name}</p>
                                    </div>
                                    <div className="mb-4">
                                        <h4>Satuan UOM</h4>
                                        <p>{materialData.material_uom?.uom_actual?.name}</p>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="mb-4">
                                        <h4>Jumlah</h4>
                                        <p>{materialData.amount}</p>
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

            {/* {isEditModalVisible && (
                <EditMaterialModal
                    show={isEditModalVisible}
                    handleClose={handleCloseEditModal}
                    material_request_id={materialId}
                />
            )} */}
        </>
    );
};