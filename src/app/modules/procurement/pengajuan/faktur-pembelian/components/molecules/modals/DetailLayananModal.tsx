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
import { EditLayananModal } from "./EditLayananModal";
import { ID } from "@metronic/helpers";
import { dummyLayanan } from "../../organisms/table/dummyUsers";
import { getSingleServiceSalesOrderById } from "../../../core/_request";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import { useServiceSalesOrder } from "../../template/LayananDetailSectionLayout";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";

interface DetailLayananModalProps {
  show: boolean;
  handleClose: () => void;
  layananId?: string;
}

export const DetailLayananModal = ({
  show,
  handleClose,
  layananId,
}: DetailLayananModalProps) => {
  const { refreshService, status } = useServiceSalesOrder();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [isFailedModalVisible, setFailedModalVisible] = useState(false);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDeleteSuccessModalVisible, setIsDeleteSuccessModalVisible] =
    useState(false);
  const [isDeleteFailedModalVisible, setIsDeleteFailedModalVisible] =
    useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [layananData, setLayananData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(
        `/procurement/submission/purchase-order/purchase-order-service/${layananId}`
      )
      .then((res) => {
        console.log({ getSingleLayanan: res.data.data });
        setLayananData(res.data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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

  return (
    <>
      {isDeleteLoading && <OverlayLoader />}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <h2>Detail Layanan</h2>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            "Loading...."
          ) : error ? (
            <p>{error}</p>
          ) : layananData ? (
            <div className="detail-layanan">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-4">
                    <h4>Layanan</h4>
                    <p>{layananData.service.name}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-4">
                    <h4>Jumlah</h4>
                    <p>{layananData.amount}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-4">
                    <h4>Harga</h4>
                    <p>{layananData.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Data layanan tidak ditemukan.</p>
          )}

          <div className="d-flex mt-4 g-4 justify-content-between">
            <Button variant="secondary" onClick={handleClose}>
              Kembali
            </Button>
            <div className="d-flex gap-4">
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
    </>
  );
};
