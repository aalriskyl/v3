import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import { DeleteConfirmationModal, DeleteSuccessModal } from '@metronic/layout/components/form/organism/DeleteModal';
import { getSingleStockEntryMaterial } from '../../../core/_request';

interface DetailMaterialModalProps {
    show: boolean;
    handleClose: () => void;
    supplier_id: string;
}

export const DetailMaterialModal = ({ show, handleClose, supplier_id }: DetailMaterialModalProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setFailedModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [materialData, setMaterialData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMaterialData = async () => {
            try {
                const data = await getSingleStockEntryMaterial(supplier_id);
                console.log(data);
                setMaterialData(data);
                setError(null);
            } catch (err) {
                setError('Gagal memuat data material');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (show && supplier_id) {
            fetchMaterialData();
        }
    }, [show, supplier_id]);

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

    const handleOpenEditModal = () => {
        handleClose();
        setTimeout(() => {
            setIsEditModalVisible(true);
        }, 300);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <h2>Detail Material</h2>
                </Modal.Header>
                <Modal.Body>
                    {isLoading ? (
                        <p>Memuat...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : materialData ? (
                        <div className="detail-material">
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className="mb-4">
                                        <h6>Material</h6>
                                        <p>{materialData.material.name || '-'}</p>
                                    </div>
                                    <div className="mb-4">
                                        <h6>Jumlah Stok</h6>
                                        <p>{materialData.amount || 0}</p>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="mb-4">
                                        <h6>Satuan UOM</h6>
                                        <p>{materialData.material.uom_default.name || '-'}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Data material tidak ditemukan.</p>
                    )}

                    <div className="d-flex mt-4 g-4 justify-content-end">
                        <div className="d-flex gap-4">
                            <Button variant="secondary" onClick={handleClose}>
                                Kembali
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Delete Confirmation Modal */}
            {isDeleteModalVisible && (
                <DeleteConfirmationModal
                    cancelLabel='Kembali'
                    confirmLabel='Hapus'
                    onConfirmDelete={() => console.log('Delete functionality not implemented yet')}
                    closeModal={() => setDeleteModalVisible(false)}
                    title='Hapus Data?'
                    message='Data akan terhapus dan tidak bisa dikembalikan.'
                />
            )}

            {/* Delete Success Modal */}
            {isSuccessModalVisible && (
                <DeleteSuccessModal
                    closeModal={() => setSuccessModalVisible(false)}
                    message="Data berhasil dihapus!"
                />
            )}

            {/* Failed Modal */}
            {isFailedModalVisible && (
                <FailedModal
                    closeModal={() => setFailedModalVisible(false)}
                    title='Gagal'
                    message='Material gagal dihapus.'
                />
            )}
        </>
    );
};