import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import {
  DeleteConfirmationModal,
  DeleteSuccessModal,
} from "@metronic/layout/components/form/organism/DeleteModal";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import { DetailPaymentTermsType } from "../../core/_models";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { usePaymentTerms } from "../../template/SupplierTableLayout";

interface DetailSupplierModalProps {
  show: boolean;
  handleClose: () => void;
  supplier_id: any;
}

export const DetailSupplierModal = ({
  show,
  handleClose,
  supplier_id,
}: DetailSupplierModalProps) => {
  const { fetchPaymentTerms } = usePaymentTerms();
  const [data, setData] = useState<DetailPaymentTermsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    if (show && supplier_id) {
      axiosInstance
        .get(
          `/accounting/master-data/top/payment-terms/${supplier_id}?company_id=${localStorage.getItem(
            "company_id"
          )}`
        )
        .then((res) => {
          console.log({ singlePaymentTerms: res });
          setData(res.data.data);
        })
        .catch(() => {
          setError("Gagal mengambil data");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [show, supplier_id]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await axiosInstance.delete(
        `/accounting/master-data/top/payment-terms/${supplier_id}?company_id=${localStorage.getItem(
          "company_id"
        )}`
      );
      console.log({ delete: res.data.data });
      await fetchPaymentTerms();
      setSuccessMessage("Berhasil delete payment term");
    } catch (error) {
      console.error("Gagal menghapus data", error);
      setFailedMessage(
        (error as any)?.response?.data?.field?.body ||
          (error as any)?.response?.data?.field ||
          "Gagal membuat payment terms"
      );
    } finally {
      setDeleteModalVisible(false);
      setIsDeleting(false);
    }
  };

  return (
    <>
      {isDeleting && <OverlayLoader />}
      <Modal
        show={successMessage || failedMessage ? false : show}
        onHide={handleClose}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <h2>Detail Payment Terms</h2>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : data ? (
            <div className="detail-supplier">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-4">
                    <h4>Nama Payment Terms</h4>
                    <p>{data?.name || "-"}</p>
                  </div>
                  <div className="mb-4">
                    <h4>Due Date Based On</h4>
                    <p>{data?.due_date_based_on || "-"}</p>
                  </div>
                  <div className="mb-4">
                    <h4>Deskripsi</h4>
                    <p>{"-"}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-4">
                    <h4>Invoice Portion</h4>
                    <p>{data?.invoice_portion || "-"}</p>
                  </div>
                  <div className="mb-4">
                    <h4>Credit Days</h4>
                    <p>{data?.credit_days || "-"} Days</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Data payment terms tidak ditemukan.</p>
          )}

          <div className="d-flex mt-4 g-4 justify-content-between">
            <Button variant="secondary" onClick={handleClose}>
              Kembali
            </Button>
            <div className="d-flex gap-4">
              <button
                type="button"
                className="btn border border-primary px-8 py-2 text-primary"
                onClick={() => setDeleteModalVisible(true)}
              >
                Hapus
              </button>
              {/* <button
                                type="button"
                                className="btn btn-primary border border-primary px-16 py-2"
                                onClick={handleOpenEditModal}
                            >
                                Ubah
                            </button> */}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal Hapus */}
      {isDeleteModalVisible && (
        <DeleteConfirmationModal
          cancelLabel="Kembali"
          confirmLabel="Hapus"
          onConfirmDelete={handleDelete}
          closeModal={() => setDeleteModalVisible(false)}
          title="Hapus Data?"
          message="Data akan terhapus dan tidak bisa dikembalikan."
        />
      )}

      {failedMessage && (
        <FailedModal
          closeModal={() => setFailedMessage(null)}
          message={failedMessage}
          confirmLabel={"Tutup"}
        />
      )}
      {successMessage && (
        <SuccessModal
          closeModal={() => {
            handleClose();
            setFailedMessage(null);
          }}
          successMessage={successMessage}
        />
      )}
    </>
  );
};
