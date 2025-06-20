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
import { EditMaterialModal } from "./EditMaterialModal";
import { dummyMaterials } from "../../organisms/table/dummyUsers";
import { ID } from "@metronic/helpers";
import { getSingleMaterialSalesOrderById } from "../../../core/_request";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { useMaterialSalesOrder } from "../../template/MaterialDetailSectionLayout";

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
  const { refreshMaterial, status, isPreOrder } = useMaterialSalesOrder();

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
    if (!materialId) {
      setError("ID is undefined or invalid");
      return;
    }
    setIsLoading(true);

    getSingleMaterialSalesOrderById(materialId)
      .then((data) => {
        console.log({ materialId });
        setMaterialData(data);
      })
      .catch(() => {
        setError("Data material tidak ditemukan.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [materialId]);

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    try {
      await axiosInstance.delete(
        `/sales/submission/sales-order/sales-order-material/${materialId}?company_id=${localStorage.getItem(
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
                    <p>{materialData.material.name}</p>
                  </div>
                  <div className="mb-4">
                    <h4>Jumlah</h4>
                    <p>{materialData.amount}</p>
                  </div>
                  <div className="mb-4">
                    <h4>Barcode</h4>
                    <p>{materialData.material_uom.barcode}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-4">
                    <h4>Jumlah Konversi</h4>
                    <p>{materialData.material_uom.conversion || "-"}</p>
                  </div>
                  <div className="mb-4">
                    <h4>Satuan UOM</h4>
                    <p>{materialData.material_uom.uom_actual.name || "-"}</p>
                  </div>
                  <div className="mb-4">
                    <h4>Harga</h4>
                    <p>{materialData.price || "-"}</p>
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
              {status === "Draft" && !isPreOrder && (
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
              {/* <button
                type="submit"
                className="btn btn-primary border border-primary px-16 py-2"
                onClick={handleOpenEditModal}
              >
                Ubah
              </button> */}
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

      {/* {isEditModalVisible && (
        <EditMaterialModal
          show={isEditModalVisible}
          handleClose={() => {
            setIsEditModalVisible(false);
          }}
          onSubmit={handleEditSubmit} // Pass the onSubmit handler
          materialId={materialId} // Pass the materialId to pre-fill the form
        />
      )} */}
    </>
  );
};
