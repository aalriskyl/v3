interface Props {
    closeModal: () => void;
}

const ButtonModal: React.FC<Props> = ({ closeModal }) => {
    return (
        <div className="text-center row mx-4">
            <div className="d-flex justify-content-between">
                <button
                    type="button"
                    className="btn px-12 text-primary py-3 border w-100 border-primary me-2"
                    onClick={closeModal}
                >
                    Reset
                </button>
                <button
                    type="button"
                    className="btn btn-primary px-12 py-3 fw-bold px-6 w-100 border border-primary"
                    onClick={closeModal} // update this as needed
                >
                    Simpan
                </button>
            </div>
        </div>
    );
};

export default ButtonModal;