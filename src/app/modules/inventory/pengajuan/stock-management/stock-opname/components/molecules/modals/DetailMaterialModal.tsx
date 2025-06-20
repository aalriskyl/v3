import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import {
  DeleteConfirmationModal,
  DeleteSuccessModal,
} from "@metronic/layout/components/form/organism/DeleteModal";
import { getSingleMaterialOpnameById } from "../../../core/_request";
import axiosInstance from "../../../../../../../../../service/axiosInstance";
import { useMaterialOpname } from "../../template/MaterialTableLayout";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";

interface DetailMaterialModalProps {
  show: boolean;
  handleClose: () => void;
  id: string;
}

export const DetailMaterialModal = ({
  show,
  handleClose,
  id,
}: DetailMaterialModalProps) => {
  const { refreshMaterial, status } = useMaterialOpname();
  // const { id } = useParams<{ id: string }>();

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDeleteSuccessModalVisible, setIsDeleteSuccessModalVisible] =
    useState(false);
  const [isDeleteFailedModalVisible, setIsDeleteFailedModalVisible] =
    useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [materialData, setMaterialData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      setError("ID is undefined or invalid");
      return;
    }
    setIsLoading(true);
    getSingleMaterialOpnameById(id)
      .then((data) => {
        console.log({ data });
        setMaterialData({
          material: data.material.name,
          jumlah: data.amount,
          harga: data.amount,
          uom: data.material_uom.uom_actual.name,
          barcode: data.material_uom.barcode,
        });
        setError(null);
      })
      .catch((err) => {
        setError("Data material tidak ditemukan.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    try {
      await axiosInstance.delete(
        `/inventory/submission/stock-management/stock-opname/stock-opname-material/${id}?company_id=${localStorage.getItem(
          "company_id"
        )}`
      );
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
          {isLoading ? (
            "Loading...."
          ) : error ? (
            <p>{error}</p>
          ) : materialData ? (
            <div className="detail-material">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-4">
                    <h4>Material</h4>
                    <p>{materialData.material}</p>
                  </div>
                  <div className="mb-4">
                    <h4>Satuan UOM</h4>
                    <p>{materialData.uom}</p>
                  </div>
                  <div className="mb-4">
                    <h4>Harga</h4>
                    <p>{materialData.harga}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-4">
                    <h4>Jumlah</h4>
                    <p>{materialData.jumlah}</p>
                  </div>
                  <div className="mb-4">
                    <h4>Barcode</h4>
                    <p>{materialData.barcode}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Data material tidak ditemukan.</p>
          )}

          <div className="d-flex mt-4 g-4 justify-content-between">
            <Button variant="secondary" onClick={handleClose}>
              Kembali
            </Button>
            <div className="d-flex gap-4">
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
        <SuccessModal
          title="Berhasil"
          successMessage="Data telah berhasil dihapus!"
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

      {/* {isEditModalVisible && id && (
        <EditMaterialModal
          show={isEditModalVisible}
          handleClose={handleCloseEditModal}
          id={id}
        />
      )} */}
    </>
  );
};
