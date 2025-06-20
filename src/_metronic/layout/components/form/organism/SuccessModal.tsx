import { FC } from 'react';

interface SuccessModalProps {
    show?: boolean;

    closeModal: () => void;
    title?: string;
    successMessage?: string;
    buttonLabel?: string;
    message?: string;
}

const SuccessModal: FC<SuccessModalProps> = ({
    closeModal,
    title = 'Berhasil',
    successMessage,
    buttonLabel = 'Tutup',
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
                        <h1 className="modal-title fw-bold font-secondary">{title}</h1>
                    </div>
                    <div className="modal-body">
                        <p className="text-muted fs-4 text-center">{successMessage}</p>
                    </div>
                    <div className="text-center">
                        <button
                            type="button"
                            className="btn btn-primary px-12"
                            onClick={closeModal}
                        >
                            {buttonLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
