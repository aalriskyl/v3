import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import { DeleteConfirmationModal, DeleteSuccessModal } from '@metronic/layout/components/form/organism/DeleteModal';
import { EditMaterialModal } from './EditMaterialModal';
import axiosInstance from '../../../../../../../../../service/axiosInstance';

interface DetailMaterialModalProps {
    show: boolean;
    handleClose: () => void;
    id: string;
    type: string;
}

export const DetailMaterialModal = ({ show, handleClose, id, type }: DetailMaterialModalProps) => {
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
            if (!id) {
                setError('ID is undefined or invalid');
                return;
            }

            try {
                const response = await axiosInstance.get(`/inventory/submission/delivery-management/received-note/received-note-material/${id}`);
                setMaterialData(response.data.data);
                console.log('note materials', response.data)
                setError(null);
            } catch (error) {
                console.error('Error fetching material data:', error);
                setError('Data material tidak ditemukan.');
            }
        };

        fetchMaterialData();
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

    const handleDelete = () => {
        const isSuccess = Math.random() > 0.5; // Simulate delete success/failure
        setTimeout(() => {
            setDeleteModalVisible(false);
            if (isSuccess) {
                setSuccessModalVisible(true);
            } else {
                setFailedModalVisible(true);
            }
        }, 1000);
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
                                        <h6>Material</h6>
                                        <p>{materialData.material.name}</p> {/* Accessing material name */}
                                    </div>
                                    <div className="mb-4">
                                        <h6>Deskripsi</h6>
                                        <p>{materialData.material.description || 'Tidak ada deskripsi'}</p> {/* Material description */}
                                    </div>
                                    <div className="mb-4">
                                        <h6>Jumlah</h6>
                                        <p>{materialData.amount}</p> 
                                    </div>
                                    {type === "Standard" && (
                                            <div className="mb-4">
                                                <h6>Jumlah Diretur</h6>
                                                <p>{materialData.amount_retur}</p>
                                            </div>
                                    )}
                                        {type === "Retur" && (
                                            <div className="mb-4">
                                                <h6>Jumlah Dimusnahkan</h6>
                                                <p>{materialData.amount_destroy}</p>
                                            </div>
                                        )}
                                    {/* <div className="mb-4">
                                        <h4>Harga</h4>
                                        <p>{materialData.price}</p> 
                                    </div> */}
                                </div>
                                <div className='col-md-6'>
                                    <div className="mb-4">
                                        <h6>Barcode</h6>
                                        <p>{materialData.material_uom.barcode}</p>
                                    </div>
                                    {/* <div className="mb-4">
                                        <h4>Supplier</h4>
                                        <p>{materialData.material_supplier.supplier.name}</p> 
                                    </div> */}
                                    <div className="mb-4">
                                        <h6>Satuan Uom</h6>
                                        <p>{materialData.material_uom.uom_actual.name}</p>
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
                            {/* <button
                                type="button"
                                className="btn border border-primary px-8 py-2 text-primary"
                                onClick={handleOpenDeleteModal}
                            >
                                Hapus
                            </button> */}
                            {/* <button
                                type="submit"
                                className="btn btn-primary border border-primary px-16 py-2"
                                onClick={handleOpenEditModal}
                            >
                                Ubah
                            </button> */}
                        </div>
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
                    id={id}
                />
            )} */}
        </>
    );
};