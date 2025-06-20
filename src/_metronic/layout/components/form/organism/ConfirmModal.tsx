import { FC } from 'react';

interface ConfirmModalProps {
    show?: boolean;
    handleSubmit: () => void;
    closeModal: () => void;
    headTitle: string;
    buttonTitle?: string;
    message: string;
    confirmButtonLabel?: string;
    cancelButtonLabel?: string;
    isLoading?: boolean; // Pastikan ini boolean, bukan any
}

const ConfirmModal: FC<ConfirmModalProps> = ({
    handleSubmit,
    closeModal,
    headTitle,
    buttonTitle,
    message,
    confirmButtonLabel = "Confirm",
    cancelButtonLabel = "Cancel",
    isLoading = false
}) => {
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
                        <h1 className="modal-title fw-bold font-secondary">{headTitle}</h1>
                    </div>
                    <div className="modal-body">
                        <p className="text-muted fs-4 text-center">{message}</p>
                    </div>
                    <div className="d-flex gap-4">
                        <button
                            type="button"
                            className="btn btn-light w-100 border border-gray-300"
                            onClick={closeModal}
                            disabled={isLoading} // Jangan biarkan modal ditutup saat proses berlangsung
                        >
                            {cancelButtonLabel}
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={handleSubmit}
                            disabled={isLoading} // Tombol disabled saat loading
                        >
                            {isLoading ? "Processing..." : confirmButtonLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
