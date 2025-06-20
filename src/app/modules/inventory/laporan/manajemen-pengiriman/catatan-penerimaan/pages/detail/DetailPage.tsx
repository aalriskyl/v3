import React, { FC, useEffect, useState } from "react";
import { PageLink, PageTitle } from "@metronic/layout/core";
import { useParams, useNavigate } from "react-router-dom";
import { DeleteConfirmationModal } from "@metronic/layout/components/form/organism/DeleteModal";
import SuccessModal from "@metronic/layout/components/form/organism/SuccessModal";
import { FailedModal } from "@metronic/layout/components/form/organism/FailedModal";
import {
  ApprovedConfirmationModal,
  ApprovedSuccessModal,
} from "@metronic/layout/components/form/organism/ApprovedModal";
import {
  RejectedConfirmationModal,
  RejectedSuccessModal,
} from "@metronic/layout/components/form/organism/RejectedModal";
import MaterialTableLayout from "../../components/template/MaterialTableLayout";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import { UserTwoStepsCell } from "../../components/organisms/table/columns/UserTwoStepsCell";
import { formatDateToMonthYear } from "../../../../../../../helper/formatDate";

const DetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isApprovedSuccessModalVisible, setIsApprovedSuccessModalVisible] =
    useState(false);
  const [isRejectedSuccessModalVisible, setIsRejectedSuccessModalVisible] =
    useState(false);

  const navigate = useNavigate();

  const breadcrumbs: Array<PageLink> = [
    { title: "Dashboard", path: "/", isSeparator: false, isActive: false },
    {
      title: "Inventory",
      path: "/inventory",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Laporan",
      path: "/inventory/laporan",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Manajemen Pengiriman",
      path: "/inventory/laporan/manajemen-pengiriman",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Catatan Penerimaan",
      path: "/inventory/laporan/manajemen-pengiriman/catatan-penerimaan",
      isSeparator: false,
      isActive: false,
    },
  ];

  const getSingleReceivedNote = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/inventory/submission/delivery-management/received-note/${id}`
      );
      setUserData(response.data.data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    if (!date) return "-";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("id-ID", options).format(new Date(date));
  };

  useEffect(() => {
    if (id) {
      getSingleReceivedNote();
    }
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleDeleteAction = () => {
    // Implement delete action here
    setIsDeleteModalVisible(false);
    setIsSuccessModalVisible(true); // Show success modal for demo
  };

  const handleApproveConfirm = () => {
    setIsApproveModalVisible(false);
    setIsApprovedSuccessModalVisible(true);
  };

  const handleRejectConfirm = () => {
    setIsRejectModalVisible(false);
    setIsRejectedSuccessModalVisible(true);
  };

  if (loading) {
    return <div>Loading...</div>; // Replace with a loading spinner or skeleton
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbs}>Detail Catatan Penerimaan</PageTitle>

      <div className="font-secondary">
        <div className="card p-5 w-100 mb-8">
          <h3 className="mb-6">Catatan Penerimaan</h3>
          <div className="row">
            <div className="col-md-6">
              <div>
                <label className="form-label fw-bold">
                  Nomor Catatan Penerimaan
                </label>
                <p className="text-lg font-medium">
                  {userData?.no_received_note || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">
                  {userData?.type === "Supplier"
                    ? "Nomor Purchase Request"
                    : "Nomor Request Order"}
                </label>
                <p className="text-lg font-medium">
                  {userData?.type === "Supplier"
                    ? userData?.purchase_order?.no_purchase_order || "-"
                    : userData?.retur_sales?.sales_order?.no_sales_order || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Tipe</label>
                <p className="text-lg font-medium">{userData?.type || "-"}</p>
              </div>
              <div>
                <label className="form-label fw-bold">Gudang</label>
                <p className="text-lg font-medium">
                  {userData?.warehouse?.name || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Tanggal Pengajuan</label>
                <p className="text-lg font-medium">
                  {formatDateToMonthYear(userData?.submitted_date)}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Tanggal Submitted</label>
                <p className="text-lg font-medium">
                  {formatDateToMonthYear(userData?.submitted_date) || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Tanggal Approve</label>
                <p className="text-lg font-medium">
                  {formatDateToMonthYear(userData?.approved_date)}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <label className="form-label fw-bold">Jenis Penerimaan</label>
                <p className="text-lg font-medium">
                  {userData?.received_type || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">
                  {userData?.type === "Supplier" ? "Supplier" : "Customer"}
                </label>
                <p className="text-lg font-medium">
                  {userData?.type === "Supplier"
                    ? userData?.supplier?.name || "-"
                    : userData?.customer?.name || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Requested By</label>
                <p className="text-lg font-medium">
                  {userData?.requested_by?.name || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Submitted by</label>
                <p className="text-lg font-medium">
                  {userData?.submitted_by?.name || "-"}
                </p>
              </div>
              <div>
                <label className="form-label fw-bold">Approved By</label>
                <p className="text-lg font-medium">
                  {userData?.approved_by?.name || "-"}
                </p>
              </div>
              <div className="mb-2">
                <p className="form-label fw-bold">Status</p>
                <UserTwoStepsCell status={userData?.status} />
              </div>
              {/* <div>
                <label className="form-label fw-bold">Posting Date</label>
                <p className="text-lg font-medium">
                  {formatDate(userData?.approved_date)}
                </p>
              </div> */}
            </div>
          </div>
        </div>

        <MaterialTableLayout type={userData?.type} />

        <div className="d-flex justify-content-end row">
          <div className="col-12 text-end my-4">
            <button
              type="button"
              onClick={handleBack}
              className="btn btn-primary px-12 py-3 border border-primary"
            >
              Kembali
            </button>
          </div>
        </div>

        {isDeleteModalVisible && (
          <DeleteConfirmationModal
            onConfirmDelete={handleDeleteAction}
            closeModal={() => setIsDeleteModalVisible(false)}
            title="Hapus Data?"
            confirmLabel="Hapus"
            cancelLabel="Batalkan"
            message="Apakah Anda yakin ingin menghapus data ini?"
          />
        )}

        {isSuccessModalVisible && (
          <SuccessModal
            title="Berhasil"
            successMessage="Data telah berhasil dihapus!"
            closeModal={() => {
              setIsSuccessModalVisible(false);
              navigate("../");
            }}
          />
        )}

        {isFailedModalVisible && (
          <FailedModal
            title="Gagal"
            message="Terjadi kesalahan saat menghapus data."
            closeModal={() => setIsFailedModalVisible(false)}
          />
        )}

        {isApproveModalVisible && (
          <ApprovedConfirmationModal
            onConfirmApproved={handleApproveConfirm}
            closeModal={() => setIsApproveModalVisible(false)}
          />
        )}

        {isRejectModalVisible && (
          <RejectedConfirmationModal
            onConfirmRejected={handleRejectConfirm}
            closeModal={() => setIsRejectModalVisible(false)}
          />
        )}

        {isApprovedSuccessModalVisible && (
          <ApprovedSuccessModal
            title="Berhasil"
            message="Catatan Penerimaan berhasil diapprove"
            closeModal={() => setIsApprovedSuccessModalVisible(false)}
          />
        )}

        {isRejectedSuccessModalVisible && (
          <RejectedSuccessModal
            title="Berhasil"
            message="Catatan Penerimaan berhasil di reject"
            closeModal={() => setIsRejectedSuccessModalVisible(false)}
          />
        )}
      </div>
    </>
  );
};

export default DetailPage;
