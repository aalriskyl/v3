import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import { DeleteConfirmationModal, DeleteSuccessModal } from '@metronic/layout/components/form/organism/DeleteModal';
import { ID } from '@metronic/helpers';
import { getSingleServicePo } from '../../../core/_request';
import axiosInstance from '../../../../../../../../service/axiosInstance';
import { getErrorMessage } from '../../../../../../../helper/getErrorMessage';

interface DetailLayananModalProps {
    show: boolean;
    handleClose: () => void;
    layananId?: ID;
    status: string
}

export const DetailLayananModal = ({ show, handleClose, layananId, status }: DetailLayananModalProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setFailedModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [layananData, setMaterialData] = useState<any>(null);
    const [isWhData, setIsWhData] = useState<any>(null);
    const [failedMessage, setFailedMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchLayananData = async () => {
            if (!layananId) {
                setError('ID is undefined or invalid');
                return;
            }

            try {
                const data = await getSingleServicePo(layananId);
                setMaterialData(data.data); // Adjust based on the response structure
                setIsWhData(data.data.conversion_service_id !== null) // jika not null dia WH
                setError(null);
            } catch (err) {
                setError('Data layanan tidak ditemukan.');
                console.error(err);
            }
        };

        if (show) {
            fetchLayananData();
        }
    }, [layananId, show]);


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
        try {
            if (!layananId) {
                throw new Error("Material ID tidak ditemukan.");
            }
            await axiosInstance.delete(`/procurement/submission/purchase-order/purchase-order-service/${layananId}`);
            setDeleteModalVisible(false);
        } catch (error) {
            setFailedMessage(getErrorMessage(error));
            setFailedModalVisible(true);
        }
    };

    const handleOpenDeleteModal = () => {
        handleClose(); // Close detail modal
        setDeleteModalVisible(true); // Open delete modal
    };


    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <h2>Detail Layanan</h2>
                </Modal.Header>
                <Modal.Body>
                    {failedMessage && <div className="alert alert-danger">{failedMessage}</div>}
                    {error ? (
                        <p>{error}</p>
                    ) : layananData ? (
                        <div className="detail-layanan">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-4">
                                        <h4>Layanan</h4>
                                        <p>{layananData.service?.name || '-'}</p>
                                    </div>
                                        {isWhData && (
                                            <div className="col-md-6">
                                                <div className="mb-4">
                                                    <h4>Layanan Konversi</h4>
                                                    <p>{layananData.conversion_service?.name || '-' }</p>
                                                </div>
                                            </div>)}
                                    <div className="mb-4">
                                        <h4>Harga</h4>
                                        <p>{layananData?.price}</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-4">
                                        <h4>Supplier</h4>
                                        <p>{layananData.service_supplier?.supplier?.name || '-'}</p>
                                    </div>
                                    
                                        <div className="mb-4">
                                            <h4>Jumlah</h4>
                                            <p>{layananData.amount || '-'}</p>
                                        </div>
                                </div>
                                
                            </div>
                        </div>
                    ) : (
                        <p>Data layanan tidak ditemukan.</p>
                    )}

                    <div className="d-flex mt-4 g-4 justify-content-between">
                        <Button variant="secondary" onClick={handleClose}>
                            Kembali
                        </Button>
                        <div className="d-flex gap-4">
                           {status === "Draft" && (
                                <button
                                    type="button"
                                    className="btn border border-primary px-8 py-2 text-primary"
                                    onClick={handleOpenDeleteModal}
                                >
                                    Hapus
                                </button>
                           )}
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

            {/* {isEditModalVisible && (
                <EditLayananModal
                    show={isEditModalVisible}
                    handleClose={handleCloseEditModal}
                    onSubmit={handleEditSubmit} // Pass the onSubmit handler
                    layananId={layananId} // Pass the layananId to pre-fill the form
                />
            )} */}
        </>
    );
};