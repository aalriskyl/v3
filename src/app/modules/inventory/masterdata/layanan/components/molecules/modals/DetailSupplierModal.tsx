import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { dummyDataSupplier } from '../../organism/table/dummyData';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import { DeleteConfirmationModal, DeleteSuccessModal } from '@metronic/layout/components/form/organism/DeleteModal';
import { AddSupplierModal } from './AddSupplierModal';
import { getSingleServiceSupplier, deleteServiceSupplier } from '../../core/_request';

interface DetailSupplierModalProps {
    show: boolean;
    handleClose: () => void;
    supplier_id: string;
}

export const DetailSupplierModal = ({ show, handleClose, supplier_id }: DetailSupplierModalProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setFailedModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [supplierData, setSupplierData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSupplierData = async () => {
            try {
                const data = await getSingleServiceSupplier(supplier_id);
                setSupplierData(data);
                console.log(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch supplier data');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (show && supplier_id) {
            fetchSupplierData();
        }
    }, [show, supplier_id]);

    const handleSave = () => {
        setIsModalVisible(true);
    };

    const priorityLabels: Record<number, string> = {
        1: "Tinggi",
        2: "Sedang",
        3: "Rendah",
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
        navigate('../'); // Navigasi ke halaman sebelumnya
    };

    const handleCloseFailedModal = () => {
        setFailedModalVisible(false);
    };

    const handleDeleteClick = () => {
        setDeleteModalVisible(true);
    };

    const handleDelete = async () => {
        try {
            await deleteServiceSupplier(supplier_id);
            setDeleteModalVisible(false);
            navigate(0);
        } catch (error) {
            console.error('Gagal menghapus data', error);
            setDeleteModalVisible(false);
            setFailedModalVisible(true);
        }
    };

    const handleOpenDeleteModal = () => {
        handleClose();
        setTimeout(() => {
            setDeleteModalVisible(true); // Buka modal konfirmasi hapus setelah modal detail tertutup
        }, 300); // Delay 300ms
    };

    const handleOpenEditModal = () => {
        handleClose(); // Tutup modal detail
        setTimeout(() => {
            setIsEditModalVisible(true); 
        }, 300); // Delay 300ms
    };

    const handleCloseEditModal = () => {
        setIsEditModalVisible(false); // Tutup modal edit
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <h2>Detail Supplier</h2>
                </Modal.Header>
                <Modal.Body>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : supplierData ? (
                        <div className="detail-supplier">
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className="mb-4">
                                        <h4>Supplier</h4>
                                        <p>{supplierData.supplier?.name}</p>
                                    </div>
                                    <div className="mb-4">
                                        <h4>Harga Beli</h4>
                                        <p>{supplierData.buy_price}</p>
                                    </div>
                                </div>
                                <div className='col-md-6'>

                                    <div className="mb-4">
                                        <h4>Skala Prioritas Supplier</h4>
                                        <p>{priorityLabels[supplierData.supplier_priority] || "Tidak diketahui"}</p>
                                    </div>
                                         <div className="mb-4">
                                             <h4>Set Default</h4>
                                            <p>{supplierData.default_supplier ? "True" : "False"}</p>
                                            </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Data supplier tidak ditemukan.</p>
                    )}

                    <div className="d-flex mt-4 g-4 justify-content-between">
                        <Button variant="secondary" onClick={handleClose}>
                            Kembali
                        </Button>
                        <div className="d-flex gap-4">
                            <button
                                type="button"
                                className="btn border border-primary px-8 py-2 text-primary"
                                onClick={handleDeleteClick}
                            >
                                Hapus
                            </button>
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

            {/* Modal Hapus */}
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

            {/* Modal Sukses Hapus */}
            {isSuccessModalVisible && (
                <DeleteSuccessModal
                    closeModal={() => setSuccessModalVisible(false)}
                    message="Data berhasil dihapus!"
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
                    headTitle="Ubah Material"
                    confirmButtonLabel="Ubah"
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

            {/* Modal Edit Supplier */}
            {isEditModalVisible && (
                <AddSupplierModal
                    show={isEditModalVisible}
                    handleClose={handleCloseEditModal}
                    supplier_id={supplier_id}
                />
            )}
        </>
    );
};