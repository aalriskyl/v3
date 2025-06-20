import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface DeleteModalProps {
    show?: boolean;
    closeModal: () => void;
    onConfirmDelete: () => void;
    title?: string;
    message?: string;
    confirmLabel?: string;
    cancelLabel?: string;
}

// Confirmation Modal
export const DeleteConfirmationModal: FC<DeleteModalProps> = ({
    closeModal,
    onConfirmDelete,
    title = 'Konfirmasi Hapus',
    message = 'Apakah Anda yakin ingin menghapus data ini?',
    confirmLabel = 'Hapus',
    cancelLabel = 'Kembali',
}) => {
    return (
        <div
            className="modal fade show d-block"
            tabIndex={-1}
            role="dialog"
            aria-hidden="true"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex:'9999' }}
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content px-8 py-8">
                    <div className="text-center">
                        <h1 className="modal-title fw-bold font-secondary">{title}</h1>
                    </div>
                    <div className="modal-body">
                        <p className="text-muted fs-4 text-center">{message}</p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center text-center w-100">
                        <button
                            type='button'
                            className="btn btn-light border fw-bold border-gray-300 w-100 px-12 py-3 me-2"
                            onClick={closeModal}>
                            {cancelLabel}
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary fw-bold w-100 border border-primary px-12 py-3"
                            onClick={onConfirmDelete}
                        >
                            {confirmLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Success Modal

export const DeleteSuccessModal: FC<Omit<DeleteModalProps, 'onConfirmDelete'>> = ({
    closeModal,
    title = 'Berhasil',
    message = 'Data berhasil dihapus.',
    confirmLabel = 'Kembali',
}) => {
    const navigate = useNavigate();

    return (
        <div
            className="modal fade show d-block"
            tabIndex={-1}
            role="dialog"
            aria-hidden="true"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content px-8 py-8">
                    <div className="text-center">
                        <h1 className="modal-title fw-bold font-secondary">{title}</h1>
                    </div>
                    <div className="modal-body">
                        <p className="text-muted fs-4 text-center">{message}</p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center text-center w-100">
                        <button
                            type="button"
                            className="btn btn-primary fw-bold w-100 border border-primary px-12 py-3"
                            onClick={() => {
                                closeModal();
                                navigate('../');
                            }}
                        >
                            {confirmLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
