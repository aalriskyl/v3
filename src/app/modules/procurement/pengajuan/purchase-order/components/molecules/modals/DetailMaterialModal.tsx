import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import { DeleteConfirmationModal, DeleteSuccessModal } from '@metronic/layout/components/form/organism/DeleteModal';
import { EditMaterialModal } from './EditMaterialModal';
import { ID } from '@metronic/helpers';
import { getSingleMaterialPo } from '../../../core/_request';
import axiosInstance from '../../../../../../../../service/axiosInstance';

interface DetailMaterialModalProps {
    show: boolean;
    handleClose: () => void;
    materialId?: ID;
    status: string
}

export const DetailMaterialModal = ({ show, handleClose, materialId, status }: DetailMaterialModalProps) => {
    const { id } = useParams<{ id: string }>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setFailedModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [materialData, setMaterialData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMaterialData = async () => {
            if (!materialId) {
                setError('ID is undefined or invalid');
                return;
            }

            try {
                const response = await getSingleMaterialPo(materialId);
                setMaterialData(response.data); // Set the data directly from the response
                console.log('detail',response.data)
                setError(null);
            } catch (error) {
                console.error('Error fetching material data:', error);
                setError('Data material tidak ditemukan.');
            }
        };

        fetchMaterialData();
    }, [materialId]);

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
            console.error("Gagal menghapus material:", error);
            setFailedModalVisible(true);
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
                                        <p>{materialData.material?.name}</p>
                                    </div>
                                    <div className="mb-4">
                                        <h4>Jumlah</h4>
                                        <p>{materialData.amount}</p> {/* Updated to use amount */}
                                    </div>
                                    {/* <div className="mb-4">
                                        <h4>Barcode</h4>
                                        <p>{materialData.material_uom?.barcode}</p> 
                                    </div> */}
                                </div>
                                <div className="col-md-6">
                                    {materialData.conversion_material !== null && (
                                            <div className="mb-4">
                                                <h4>Konversi Material</h4>
                                                <p>{materialData.conversion_material?.name}</p> {/* Updated to use conversion_material name */}
                                            </div>
                                    )}
                                    <div className="mb-4">
                                        <h4>Satuan UOM</h4>
                                        <p>{materialData.material_uom?.uom_actual?.name}</p> {/* Updated to use material_uom actual name */}
                                    </div>
                                    <div className="mb-4">
                                        <h4>Harga</h4>
                                        <p>{materialData.price}</p> {/* Updated to use price */}
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
                                    onClick={handleOpenDeleteModal}
                                >
                                    Hapus
                                </button>
                            </div>
                        )}
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
                    purchaseOrderId="b"
                    show={isEditModalVisible}
                    handleClose={handleCloseEditModal}
                // onSubmit={handleEditSubmit} // Pass the onSubmit handler
                // materialId={materialId} // Pass the materialId to pre-fill the form
                />
            )}
        </>
    );
};