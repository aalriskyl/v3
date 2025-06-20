import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmModal from '@metronic/layout/components/form/organism/ConfirmModal';
import SuccessModal from '@metronic/layout/components/form/organism/SuccessModal';
import { FailedModal } from '@metronic/layout/components/form/organism/FailedModal';
import { DeleteConfirmationModal, DeleteSuccessModal } from '@metronic/layout/components/form/organism/DeleteModal';
import { getSingleMaterialSuppliers, deleteSupplierFromUom } from '../../core/_request';
import { getErrorMessage } from '../../../../../../../helper/getErrorMessage';
import { useSupplier } from '../../template/SupplierTableLayout';

interface DetailSupplierModalProps {
    show: boolean;
    handleClose: () => void;
    supplier_id: string;
}

export const DetailSupplierModal = ({ show, handleClose, supplier_id }: DetailSupplierModalProps) => {
    const { id } = useParams<{ id: string }>();
    const [supplierData, setSupplierData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
    const [isFailedModalVisible, setFailedModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [failedMessage, setFailedMessage] = useState<string | null>(null);
    const { refetch } = useSupplier();
    

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSupplierData = async () => {
            setLoading(true);
            try {
                const data = await getSingleMaterialSuppliers(supplier_id);
                setSupplierData(data);
            } catch (error) {
                setError('Failed to fetch supplier data');
            } finally {
                setLoading(false);
            }
        };

        if (show && supplier_id) {
            fetchSupplierData();
        }
    }, [show, supplier_id]);

    const handleDelete = async () => {
        setDeleteModalVisible(false);
        try {
            await deleteSupplierFromUom(supplier_id);
            refetch(); // panggil refetch biar data ke-refresh
            setSuccessModalVisible(true); // tampilkan modal sukses
        } catch (error: any) {
            setFailedMessage(getErrorMessage(error));
            setFailedModalVisible(true); // kalau gagal, tampilkan modal gagal
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <h2>Detail Supplier</h2>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : supplierData ? (
                        <div className="detail-supplier">
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className="mb-4">
                                        <h6>Supplier</h6>
                                        <p>{supplierData.supplier.name}</p>
                                    </div>
                                    <div className="mb-4">
                                        <h6>Set Default</h6>
                                        <p>{supplierData.default_supplier ? 'Yes' : 'No'}</p>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                <div className="mb-4">
                                    <h6>Skala Prioritas Supplier</h6>
                                    <p>
                                        {supplierData.priority_supplier === 1 ? 'Tinggi' : 
                                        supplierData.priority_supplier === 2 ? 'Sedang' : 
                                        supplierData.priority_supplier === 3 ? 'Rendah' : 'Tidak Diketahui'}
                                    </p>
                                </div>

                                    <div className="mb-4">
                                        <h6>Harga Jual</h6>
                                        <p>{supplierData.buy_price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Data supplier tidak ditemukan.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-between my-4">
                            <button
                                type="button"
                                className="btn px-12 py-3 border border-gray-500 me-2"
                                onClick={handleClose}
                            >
                                Kembali
                            </button>
                            <div>
                                <button
                                    type="button"
                                    className="btn px-12 py-3 border border-gray-500 me-2"
                                    onClick={() => setDeleteModalVisible(true)}
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                    {failedMessage && (
                        <div className="text-danger mt-3">{failedMessage}</div>
                    )}
                </Modal.Footer>
            </Modal>

            {/* Modal Hapus */}
            {isDeleteModalVisible && (
                <DeleteConfirmationModal
                    cancelLabel='Kembali'
                    confirmLabel='Hapus'
                    onConfirmDelete={() => {
                        handleDelete();
                        navigate(`../detailuom/${id}`);
                    }} // <- perbaikan di sini, harus pakai `() => {}` untuk function
                    closeModal={() => setDeleteModalVisible(false)}
                    title='Hapus Data?'
                    message='Data akan terhapus dan tidak bisa dikembalikan.'
                />
            )}


            {/* Modal Sukses Hapus */}
            {isSuccessModalVisible && (
                <DeleteSuccessModal
                    closeModal={() => {
                        setSuccessModalVisible(false);
                        handleClose(); // tutup modal utama
                    }}
                    title='Berhasil'
                    message='Data berhasil dihapus.'
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
                    handleSubmit={() => {
                        setIsModalVisible(false);
                        setSuccessModalVisible(true);
                    }}
                    closeModal={() => setIsModalVisible(false)}
                    headTitle="Ubah Material"
                    confirmButtonLabel="Ubah"
                    cancelButtonLabel="Batalkan"
                    message="Pastikan bahwa semua informasi sudah benar."
                />
            )}

            {/* Modal Sukses Ubah */}
            {isSuccessModalVisible && (
                <SuccessModal
                    closeModal={() => {
                        setSuccessModalVisible(false);
                        navigate('../');
                    }}
                    message="Data berhasil diubah!"
                />
            )}

            {/* Modal Gagal Ubah */}
            {isFailedModalVisible && (
                <FailedModal
                    closeModal={() => setFailedModalVisible(false)}
                    title='Gagal'
                    message='Material gagal diubah.'
                />
            )}
        </>
    );
};