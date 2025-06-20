import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import { DeleteConfirmationModal, DeleteSuccessModal } from '@metronic/layout/components/form/organism/DeleteModal';
import { getSingleStockEntryMaterial } from '../../../core/_request';
import axiosInstance from '../../../../../../../../../service/axiosInstance';

interface DetailMaterialModalProps {
    show: boolean;
    handleClose: () => void;
    supplier_id: string;
    status: string;
}

export const DetailMaterialModal = ({ show, handleClose, supplier_id, status }: DetailMaterialModalProps) => {
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setFailedModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
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

    const handleDeleteClick = () => {
        setDeleteModalVisible(true); // Show delete confirmation modal
    };

    const confirmDelete = async () => {
        try {
            await axiosInstance.delete(`/inventory/submission/stock-management/stock-entry/stock-entry-material/${supplier_id}`);
            setDeleteModalVisible(false); // Close delete confirmation modal
            setSuccessModalVisible(true); // Show success modal
            navigate(0);
        } catch (error) {
            console.error('Gagal menghapus data', error);
            setDeleteModalVisible(false); // Close delete confirmation modal
            setFailedModalVisible(true); // Show failure modal
        }
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
                                        <p>{materialData.material_uom.uom_actual.name || '-'}</p>
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
                       {status === "Draft" && (
                            <div className="d-flex gap-4">
                                <button
                                    type="button"
                                    className="btn border border-primary px-8 py-2 text-primary"
                                    onClick={handleDeleteClick}
                                >
                                    Hapus
                                </button>
                            </div>
                       )}
                    </div>
                </Modal.Body>
            </Modal>

            {/* Delete Confirmation Modal */}
            {isDeleteModalVisible && (
                <DeleteConfirmationModal
                    cancelLabel='Kembali'
                    confirmLabel='Hapus'
                    onConfirmDelete={confirmDelete} // Pass the confirmDelete function
                    closeModal={() => setDeleteModalVisible(false)}
                    title='Hapus Data?'
                    message='Data akan terhapus dan tidak bisa dikembalikan.'
                />
            )}

            {/* Delete Success Modal */}
            {isSuccessModalVisible && (
                <DeleteSuccessModal
                    closeModal={() => {
                        setSuccessModalVisible(false);
                        handleClose(); // Close the detail modal after successful deletion
                    }}
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