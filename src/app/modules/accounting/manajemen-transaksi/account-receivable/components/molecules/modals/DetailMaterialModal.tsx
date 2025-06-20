import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import {
  DeleteConfirmationModal,
  DeleteSuccessModal,
} from "@metronic/layout/components/form/organism/DeleteModal";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { dummyMaterials } from "../../organisms/table/dummyUsers";
import { useMaterial } from "../core/MaterialContext";

interface DetailMaterialModalProps {
  show: boolean;
  handleClose: () => void;
  materialId?: string;
}

export const DetailMaterialModal = ({
  show,
  handleClose,
  materialId,
}: DetailMaterialModalProps) => {
  const { fetchData: refreshMaterial, status } = useMaterial();

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDeleteSuccessModalVisible, setIsDeleteSuccessModalVisible] =
    useState(false);
  const [isDeleteFailedModalVisible, setIsDeleteFailedModalVisible] =
    useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const navigate = useNavigate();

  // pakai dummy data
  const materialData = dummyMaterials.find((mat) => mat.id === materialId);

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // simulasi API call
      await refreshMaterial();
      setIsDeleteSuccessModalVisible(true);
    } catch (error) {
      setIsDeleteFailedModalVisible(true);
    } finally {
      setIsDeleteLoading(false);
      setIsDeleteModalVisible(false);
      handleClose();
    }
  };

  return (
    <>
      {isDeleteLoading && <OverlayLoader />}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <h2>Detail Material</h2>
        </Modal.Header>
        <Modal.Body>
          {!materialData ? (
            <p>Data material tidak ditemukan.</p>
          ) : (
            <div className="detail-material">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-4">
                    <h4>Material</h4>
                    <p>{materialData.name}</p>
                  </div>
                  <div className="mb-4">
                    <h4>Jumlah</h4>
                    <p>{materialData.amount}</p>
                  </div>
                  <div className="mb-4">
                    <h4>Barcode</h4>
                    <p>{materialData.barcode}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-4">
                    <h4>Jumlah Konversi</h4>
                    <p>{materialData.conversion || "-"}</p>
                  </div>
                  <div className="mb-4">
                    <h4>Satuan UOM</h4>
                    <p>{materialData.uom || "-"}</p>
                  </div>
                  <div className="mb-4">
                    <h4>Harga</h4>
                    <p>{materialData.price || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="d-flex mt-4 g-4 justify-content-between">
            <Button variant="secondary" onClick={handleClose}>
              Kembali
            </Button>
            {status === "Draft" && (
              <button
                type="button"
                className="btn border border-primary px-8 py-2 text-primary"
                onClick={() => {
                  setIsDeleteModalVisible(true);
                }}
              >
                Hapus
              </button>
            )}
          </div>
        </Modal.Body>
      </Modal>

      {isDeleteModalVisible && (
        <DeleteConfirmationModal
          cancelLabel="Kembali"
          confirmLabel="Hapus"
          onConfirmDelete={handleDelete}
          closeModal={() => setIsDeleteModalVisible(false)}
          title="Hapus Data?"
          message="Data akan terhapus dan tidak bisa dikembalikan."
        />
      )}

      {isDeleteSuccessModalVisible && (
        <DeleteSuccessModal
          title="Berhasil"
          // successMessage="Data telah berhasil dihapus!"
          closeModal={() => {
            setIsDeleteSuccessModalVisible(false);
            navigate("../");
          }}
        />
      )}

      {isDeleteFailedModalVisible && (
        <FailedModal
          title="Gagal"
          message="Terjadi kesalahan saat menghapus data."
          closeModal={() => setIsDeleteFailedModalVisible(false)}
        />
      )}
    </>
  );
};
