import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import {
  DeleteConfirmationModal,
  DeleteSuccessModal,
} from "@metronic/layout/components/form/organism/DeleteModal";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { useMaterialSalesOrderFaktur } from "../../template/MaterialDetailSectionLayout";
import { dummyMaterials } from "../../organisms/table/dummyUsers";
import axiosInstance from "../../../../../../../../service/axiosInstance";

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
  const { refreshMaterial, status, returPresent } =
    useMaterialSalesOrderFaktur();
  const [materialData, setMaterialData] = useState<any>(null);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDeleteSuccessModalVisible, setIsDeleteSuccessModalVisible] =
    useState(false);
  const [isDeleteFailedModalVisible, setIsDeleteFailedModalVisible] =
    useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!materialId) return;

    const hasRetur = Boolean(returPresent);
    const endpoint = hasRetur
      ? `/inventory/submission/delivery-management/retur-purchase/retur-purchase-material/${materialId}`
      : `/procurement/submission/purchase-order/purchase-order-material/${materialId}`;

    axiosInstance
      .get(endpoint)
      .then((res) => {
        console.log({ getSingleMaterial: res.data.data });
        // Handle different response structures
        const data = hasRetur ? res.data.data : res.data.data;
        setMaterialData(data);
      })
      .catch((error) => {
        console.error("Error fetching material detail:", error);
        setMaterialData(null);
      });
  }, [materialId, returPresent]);

  const handleDelete = async () => {
    if (!materialId) return;

    setIsDeleteLoading(true);
    try {
      const hasRetur = Boolean(returPresent);
      const endpoint = hasRetur
        ? `/inventory/submission/delivery-management/retur-purchase/retur-purchase-material/${materialId}`
        : `/procurement/submission/purchase-order/purchase-order-material/${materialId}`;

      await axiosInstance.delete(endpoint);
      await refreshMaterial();
      setIsDeleteSuccessModalVisible(true);
    } catch (error) {
      console.error("Error deleting material:", error);
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
                    <p>{materialData?.material?.name}</p>
                  </div>
                  <div className="mb-4">
                    <h4>Jumlah</h4>
                    <p>{materialData?.amount}</p>
                  </div>
                  <div className="mb-4">
                    <h4>Barcode</h4>
                    <p>{materialData?.material_uom?.barcode || "-"}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-4">
                    <h4>Jumlah Konversi</h4>
                    <p>{materialData?.material_uom?.conversion || "-"}</p>
                  </div>
                  <div className="mb-4">
                    <h4>Satuan UOM</h4>
                    <p>{materialData?.material_uom?.uom_actual?.name || "-"}</p>
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
            {/* {status === "Draft" && (
              <button
                type="button"
                className="btn border border-primary px-8 py-2 text-primary"
                onClick={() => {
                  setIsDeleteModalVisible(true);
                }}
              >
                Hapus
              </button>
            )} */}
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
