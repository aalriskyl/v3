import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom"; // Import useParams
import ConfirmModal from "@metronic/layout/components/form/organism/ConfirmModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import {
  DeleteConfirmationModal,
  DeleteSuccessModal,
} from "@metronic/layout/components/form/organism/DeleteModal";
import { EditMaterialModal } from "./EditMaterialModal";
import { dummyMaterials } from "../../organisms/table/dummyUsers"; // Import dummyMaterials
import { getSingleMaterialById } from "../../../core/_request";
import { getSingleMaterialSalesOrderById } from "../../../../../../../sales/pengajuan/sales-order/core/_request";

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
  // const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();
  const mode = pathname.toLowerCase().includes("new") ? "create" : "edit";

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isFailedModalVisible, setFailedModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
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
    if (mode === "edit") {
      getSingleMaterialById(id)
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
    } else {
      getSingleMaterialSalesOrderById(id)
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
    }
  }, [id]);

  const handleConfirm = () => {
    setIsModalVisible(false);
    try {
      console.log("Data berhasil diubah");
      setSuccessModalVisible(true);
    } catch (error) {
      console.error("Gagal mengubah data", error);
      setFailedModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalVisible(false);
    navigate("../");
  };

  const handleCloseFailedModal = () => {
    setFailedModalVisible(false);
  };

  const handleDelete = () => {
    const isSuccess = Math.random() > 0.5;
    setTimeout(() => {
      setDeleteModalVisible(false);
      if (isSuccess) {
        setSuccessModalVisible(true);
      } else {
        setFailedModalVisible(true);
      }
    }, 1000);
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
  };

  return (
    <>
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
                  {/* <div className="mb-4">
                    <h4>Harga</h4>
                    <p>{materialData.harga}</p>
                  </div> */}
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
            {/* <div className="d-flex gap-4">
              <button
                type="button"
                className="btn border border-primary px-8 py-2 text-primary"
                onClick={handleOpenDeleteModal}
              >
                Hapus
              </button>
              <button
                type="submit"
                className="btn btn-primary border border-primary px-16 py-2"
                onClick={handleOpenEditModal}
              >
                Ubah
              </button>
            </div> */}
          </div>
        </Modal.Body>
      </Modal>

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

      {isSuccessModalVisible && (
        <DeleteSuccessModal
          closeModal={() => setSuccessModalVisible(false)}
          message="Data berhasil dihapus!"
        />
      )}

      {isFailedModalVisible && (
        <FailedModal
          closeModal={() => setFailedModalVisible(false)}
          title="Gagal"
          message="Material gagal dihapus."
        />
      )}

      {isModalVisible && (
        <ConfirmModal
          handleSubmit={handleConfirm}
          closeModal={handleCloseModal}
          headTitle="Ubah Material"
          confirmButtonLabel="Ubah"
          cancelButtonLabel="Batalkan"
          message="Pastikan bahwa semua informasi sudah benar."
        />
      )}

      {isSuccessModalVisible && (
        <SuccessModal
          closeModal={handleCloseSuccessModal}
          message="Data berhasil diubah!"
        />
      )}

      {isFailedModalVisible && (
        <FailedModal
          closeModal={handleCloseFailedModal}
          title="Gagal"
          message="Material gagal diubah."
        />
      )}

      {isEditModalVisible && id && (
        <EditMaterialModal
          show={isEditModalVisible}
          handleClose={handleCloseEditModal}
          id={id}
        />
      )}
    </>
  );
};
