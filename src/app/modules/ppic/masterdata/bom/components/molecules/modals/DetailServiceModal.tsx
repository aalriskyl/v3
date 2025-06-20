import { Modal, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { EditServiceModal } from '../modals/EditServiceModal';
import { DeleteConfirmationModal, DeleteSuccessModal } from '@metronic/layout/components/form/organism/DeleteModal';

interface DetailServiceModalProps {
    show: boolean;
    handleClose: () => void;
    handleDelete: () => void;
}

export const DetailServiceModal = ({ show, handleClose, handleDelete }: DetailServiceModalProps) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

    const handleOpenEditModal = () => {
        handleClose(); // Tutup modal utama
        setShowEditModal(true); // Buka modal edit
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false); // Tutup modal edit
    };

    const handleOpenDeleteModal = () => {
        handleClose(); // Tutup modal utama
        setTimeout(() => setDeleteModalVisible(true), 300); // Beri jeda sebelum membuka modal hapus
    };

    const handleConfirmDelete = () => {
        handleDelete(); // Panggil fungsi delete
        setDeleteModalVisible(false); // Tutup modal hapus
        setSuccessModalVisible(true); // Tampilkan modal sukses
    };

    return (
        <>
            {/* Modal Detail Layanan */}
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <h5>Detail Layanan</h5>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-3">
                        <Col md={6}>
                            <div>
                                <strong>Layanan</strong>
                                <p>Lorem Ipsum</p>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div>
                                <strong>Supplier</strong>
                                <p>Normal</p>
                            </div>
                        </Col>
                    </Row>

                    {/* Tombol */}
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
                                type="button"
                                className="btn btn-primary border border-primary px-16 py-2"
                                onClick={handleOpenEditModal}
                            >
                                Ubah
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Modal Edit Layanan */}
            <EditServiceModal
                show={showEditModal}
                handleClose={handleCloseEditModal}
            />

            {/* Modal Delete Confirmation */}
            {isDeleteModalVisible && (
                <DeleteConfirmationModal
                    cancelLabel="Kembali"
                    confirmLabel="Hapus"
                    onConfirmDelete={handleConfirmDelete}
                    closeModal={() => setDeleteModalVisible(false)}
                    title="Hapus Data"
                    message="Data akan terhapus dan tidak bisa dikembalikan."
                />
            )}

            {/* Modal Delete Success */}
            {isSuccessModalVisible && (
                <DeleteSuccessModal
                    closeModal={() => setSuccessModalVisible(false)}
                    message="Data berhasil dihapus."
                />
            )}
        </>
    );
};
