import { FC, ReactNode } from 'react';

interface FailedModalProps {
    show?: boolean;
    closeModal: () => void;
    title?: string;
    message?: ReactNode;
    error?: unknown;
    confirmLabel?: string;
    cancelLabel?: string;
}

const extractErrorMessage = (error: unknown): ReactNode => {
    if (typeof error === 'string') return error;

    // Handle object-type errors first
    if (typeof error === 'object' && error !== null) {
        // Handle Axios-style error response
        const axiosError = error as {
            response?: {
                data?: {
                    field?: string | Record<string, string> | string[]
                    message?: string
                }
            }
        };

        // 1. Check for field errors first
        if (axiosError.response?.data?.field) {
            const fieldError = axiosError.response.data.field;

            // Handle string field errors
            if (typeof fieldError === 'string') {
                return fieldError;
            }

            // Handle object/array field errors
            if (typeof fieldError === 'object') {
                const messages = Array.isArray(fieldError)
                    ? fieldError
                    : Object.values(fieldError);

                return formatErrorMessages(messages.filter(msg => typeof msg === 'string'));
            }
        }

        // 2. Check for message property
        if (axiosError.response?.data?.message) {
            return axiosError.response.data.message;
        }

        // 3. Handle generic error objects
        const genericError = error as { message?: string };
        if (genericError.message) {
            return genericError.message;
        }
    }

    // Finally handle Error instances
    if (error instanceof Error) return error.message;

    return 'Terjadi kesalahan yang tidak diketahui';
};

const formatErrorMessages = (messages: string | string[]): ReactNode => {
    if (Array.isArray(messages)) {
        return (
            <ul className="mb-0 ps-3">
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        );
    }
    return messages;
};

export const FailedModal: FC<FailedModalProps> = ({
    closeModal,
    title = 'Gagal',
    message,
    error,
}) => {
    const content = message || extractErrorMessage(error);

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
                        <div className="text-muted fs-4 text-center">
                            {content || 'Terjadi kesalahan'}
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center text-center w-100">
                        <button
                            type="button"
                            className="btn btn-primary fw-bold w-100 border border-primary px-12 py-3"
                            onClick={closeModal}
                        >
                            Kembali
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};