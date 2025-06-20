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
import { EditMaterialModal } from "./EditMaterialModal";
import { dummyMaterials } from "../../organisms/table/dummyUsers"; // Import dummyMaterials
import { getSingleMaterialById } from "../../../../../../pengajuan/manajemen-pengiriman/catatan-pengiriman/core/_request";

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
  // const { id = '' } = useParams<{ id: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isFailedModalVisible, setFailedModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [materialData, setMaterialData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      setError("ID is undefined or invalid");
      return;
    }
    setIsLoading(true);
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
  }, [id]);

  const handleSave = () => {
    setIsModalVisible(true);
  };

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

  /*     const handleOpenDeleteModal = () => {
        handleClose(); // Tutup modal detail
        setDeleteModalVisible(true); // Langsung buka modal hapus
    };

    const handleOpenEditModal = () => {
        handleClose(); // Tutup modal detail
        setIsEditModalVisible(true); // Langsung buka modal edit
    }; */

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

          <div className="d-flex mt-4 g-4 justify-content-end">
            <div className="d-flex gap-4">
              <Button variant="secondary" onClick={handleClose}>
                Kembali
              </Button>
            </div>
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

      {isEditModalVisible && (
        <EditMaterialModal
          show={isEditModalVisible}
          handleClose={handleCloseEditModal}
          id={id}
        />
      )}
    </>
  );
};
