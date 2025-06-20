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
import axiosInstance from "../../../../../../../../../service/axiosInstance";
import { getErrorMessage } from "../../../../../../../../helper/getErrorMessage";

interface MaterialData {
  material: {
    name: string;
  };
  amount: number;
  material_uom: {
    uom_actual: {
      name: string;
    };
    barcode: string;
  };
  remarks: string;
}

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isFailedModalVisible, setFailedModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [materialData, setMaterialData] = useState<MaterialData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (id && show) {
      console.log({ idMaterial: id });
      setIsLoading(true);
      axiosInstance
        .get(
          `/inventory/submission/delivery-management/retur-purchase/retur-purchase-material/${id}`
        )
        .then((response) => {
          const data = response.data.data;
          // console.log("Retur sales material data:", data);
          setMaterialData(data);
          setError(null);
        })
        .catch((error) => {
          setError(getErrorMessage(error));
          setFailedMessage(getErrorMessage(error));
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id, show]);

  // const handleConfirm = () => {
  //   setIsModalVisible(false);
  //   try {
  //     console.log("Data berhasil diubah");
  //     setSuccessModalVisible(true);
  //   } catch (error) {
  //     console.error("Gagal mengubah data", error);
  //     setFailedModalVisible(true);
  //   }
  // };

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

  // const handleDelete = () => {
  //   const isSuccess = Math.random() > 0.5;
  //   setTimeout(() => {
  //     setDeleteModalVisible(false);
  //     if (isSuccess) {
  //       setSuccessModalVisible(true);
  //     } else {
  //       setFailedModalVisible(true);
  //     }
  //   }, 1000);
  // };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
  };

  const handleOpenEditModal = () => {
    setIsEditModalVisible(true);
  };

  const handleOpenDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <h2>Detail Material</h2>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <div className="text-center">Loading....</div>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : materialData ? (
            <div className="detail-material">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-4">
                    <h4>Material</h4>
                    <p>{materialData.material.name}</p>
                  </div>
                  <div className="mb-4">
                    <h4>Satuan UOM</h4>
                    <p>{materialData.material_uom.uom_actual.name}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-4">
                    <h4>Jumlah</h4>
                    <p>{materialData.amount}</p>
                  </div>
                  <div className="mb-4">
                    <h4>Remarks</h4>
                    <p>{materialData.remarks || "-"}</p>
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
          </div>
        </Modal.Body>
      </Modal>

      {/* {isDeleteModalVisible && (
        <DeleteConfirmationModal
          cancelLabel="Kembali"
          confirmLabel="Hapus"
          onConfirmDelete={handleDelete}
          closeModal={() => setDeleteModalVisible(false)}
          title="Hapus Data?"
          message="Data akan terhapus dan tidak bisa dikembalikan."
        />
      )} */}

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
          message={failedMessage || "Material gagal dihapus."}
        />
      )}

      {/* {isModalVisible && (
        <ConfirmModal
          handleSubmit={handleConfirm}
          closeModal={handleCloseModal}
          headTitle="Ubah Material"
          confirmButtonLabel="Ubah"
          cancelButtonLabel="Batalkan"
          message="Pastikan bahwa semua informasi sudah benar."
        />
      )} */}

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
          message={failedMessage || "Material gagal diubah."}
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
