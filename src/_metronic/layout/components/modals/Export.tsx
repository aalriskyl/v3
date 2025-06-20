import { FC, useState } from "react";

interface ExportModalProps {
  closeModal: () => void;
  onConfirm: (selectedFormat: string) => void;
  showSuccess: boolean;
  showPdfOption?: boolean;
  showExcelOption?: boolean;
  showCsvOption?: boolean;
}

const ExportModal: FC<ExportModalProps> = ({
  closeModal,
  onConfirm,
  showSuccess,
  showPdfOption = false,
  showExcelOption = false,
  showCsvOption = false,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleExport = () => {
    if (!selectedFormat) {
      setError("Tolong pilih format file sebelum export.");
      return;
    }
    onConfirm(selectedFormat);
  };

  return (
    <>
      {!showSuccess ? (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            style={{ maxWidth: "360px" }}
          >
            <div className="modal-content px-8 py-8">
              <div className="mb-4">
                <h1 className="modal-title fw-bold font-secondary">Export</h1>
              </div>
              <div className="mb-2">
                <p className="fw-bold fs-6">
                  Pilih format file:
                  <span className="text-danger">*</span>
                </p>

                <div className="mt-2">
                  {showPdfOption && (
                    <div className="form-check mb-4">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="fileFormat"
                        id="pdfOption"
                        value="pdf"
                        onChange={(e) => setSelectedFormat(e.target.value)}
                      />
                      <label
                        className="form-check-label text-gray-900"
                        htmlFor="pdfOption"
                      >
                        PDF
                      </label>
                    </div>
                  )}
                  {showExcelOption && (
                    <div className="form-check mb-4">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="fileFormat"
                        id="excelOption"
                        value="excel"
                        onChange={(e) => setSelectedFormat(e.target.value)}
                      />
                      <label
                        className="form-check-label text-gray-900"
                        htmlFor="excelOption"
                      >
                        Excel
                      </label>
                    </div>
                  )}
                  {showCsvOption && (
                    <div className="form-check mb-4">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="fileFormat"
                        id="csvOption"
                        value="csv"
                        onChange={(e) => setSelectedFormat(e.target.value)}
                      />
                      <label
                        className="form-check-label text-gray-900"
                        htmlFor="csvOption"
                      >
                        CSV
                      </label>
                    </div>
                  )}
                  {error && <p className="text-danger mt-2">{error}</p>}
                </div>
              </div>
              <div className="d-flex row mt-4">
                <div className="col">
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn w-100 col border border-gray-500 me-8"
                      onClick={closeModal}
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary border border-primary w-100 col"
                      onClick={handleExport}
                    >
                      Export
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            style={{ maxWidth: "480px", height: "232px" }}
          >
            <div className="modal-content py-8 px-6">
              <div className="mb-4 text-center">
                <h4 className="fw-bolder" style={{ fontSize: "24px" }}>
                  Berhasil
                </h4>
              </div>
              <div className="text-center mb-4">
                <p className="text-muted" style={{ fontSize: "18px" }}>
                  Export berhasil.
                </p>
              </div>
              <div className="text-center w-100">
                <button
                  type="button"
                  className="btn btn-primary border border-primary fw-bold w-100"
                  onClick={closeModal}
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExportModal;
