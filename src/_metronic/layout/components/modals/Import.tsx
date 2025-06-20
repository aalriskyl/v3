/* eslint-disable @typescript-eslint/no-explicit-any */
// ImportModal.tsx
import { FC, useState } from "react";

interface ImportModalProps {
  closeModal: () => void;
  onConfirm: any;
  showSuccess: any;
  onDownloadTemplate?: () => void;
}

const ImportModal: FC<ImportModalProps> = ({
  closeModal,
  onConfirm,
  showSuccess,
  onDownloadTemplate,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rowError, setRowError] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
    setError(null);
  };

  const handleImport = async () => {
    if (!selectedFile) {
      setError("Please upload a file before importing.");
      return;
    }

    const result = await onConfirm(selectedFile);

    if (result) {
      setError(result.message || "Import failed");
      setRowError(result.fieldErrors || []);
    }
  };

  return (
    <>
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
          style={{ maxWidth: "360px", height: "307px" }}
        >
          <div className="modal-content p-4">
            <div className="mb-4 d-flex justify-content-between align-items-center mb-12 px-2 my-4">
              <h4
                className="modal-title fw-bolder font-secondary"
                style={{ fontSize: "24px" }}
              >
                Import File
              </h4>
              <button
                className="btn border border-primary text-primary px-4 py-2"
                onClick={onDownloadTemplate} // Add onClick handler
              >
                Download Template
              </button>
            </div>
            <div className="mb-2 px-2">
              <p className="fw-bold fs-6">
                Upload File
                <span
                  className="text-danger align-items-start ms-1"
                  style={{ fontSize: "12px" }}
                >
                  *
                </span>
              </p>
              <div className="mt-2">
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                />
                {error && <p className="mt-2 text-danger">{error}</p>}
                <p className="mt-2 text-muted fs-5">
                  Format file harus sesuai dengan template.
                </p>
              </div>
            </div>
            <div className="d-flex row my-4 px-2">
              <div className="col">
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn w-100 col border border-gray-400 me-8 bg-gray-100 fw-bold"
                    onClick={closeModal}
                  >
                    Kembali
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary border border-primary w-100 col fw-bold"
                    onClick={handleImport}
                  >
                    Import
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccess == "success" ? (
        <>
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
                    Import berhasil.
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
        </>
      ) : (
        showSuccess == "failed" && (
          <div
            className="modal fade show d-block"
            tabIndex={-1}
            role="dialog"
            aria-hidden="true"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content py-8 px-6">
                <div className="mb-4 text-center">
                  <h4 className="fw-bolder" style={{ fontSize: "24px" }}>
                    Gagal
                  </h4>
                </div>
                <div className="text-center">
                  <p style={{ fontSize: "18px" }}>
                    Silahkan cek kembali datanya
                  </p>
                </div>
                <div className="mb-4">
                  {rowError.map((data, index) => {
                    console.log(data);
                    return (
                      <li key={index} style={{ fontSize: "16px" }}>
                        {data}
                      </li>
                    );
                  })}
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
        )
      )}
    </>
  );
};

export default ImportModal;
