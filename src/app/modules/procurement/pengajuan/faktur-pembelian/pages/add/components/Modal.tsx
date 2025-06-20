import { FC } from 'react';

interface ConfirmModalProps {
    handleSubmit: () => void;
    closeModal: () => void;
    modalType: string; // Tambahkan jenis modal
    message: string;
    confirmButtonLabel?: string;
    cancelButtonLabel?: string;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
    handleSubmit,
    closeModal,
    modalType,
    message,
    confirmButtonLabel = 'Tambah',
    cancelButtonLabel = 'Batalkan',
}) => {
    let title: string;
    let head: string;

    switch (modalType) {
        case 'supplier':
            title = 'Tambah Supplier?';
            head = 'Tambah';
            break;
        case 'customer':
            title = 'Tambah Customer?';
            head = 'Tambah';
            break;
        case 'editsup':
            title = 'Ubah Supplier?';
            head = 'Edit';
            break;
        case 'editcust':
            title = 'Ubah Customer?';
            head = 'Edit';
            break;
        default:
            title = 'Konfirmasi';
            break;
    }

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
                    <div className="d-flex gap-4">
                        <button
                            type="button"
                            className="btn btn-light w-100 border border-gray-300"
                            onClick={closeModal}
                        >
                            {cancelButtonLabel}
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={handleSubmit}
                        >
                            {confirmButtonLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
