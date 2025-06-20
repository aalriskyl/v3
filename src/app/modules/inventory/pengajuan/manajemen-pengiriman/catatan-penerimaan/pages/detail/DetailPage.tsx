/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useMemo, useState } from "react";
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
import MaterialTableLayoutDetail from "../../components/template/MaterialTableLayoutDetail";
import axiosInstance from "../../../../../../../../service/axiosInstance";
import { UserTwoStepsCell } from "../../components/organisms/table/columns/UserTwoStepsCell";
import OverlayLoader from "@metronic/layout/components/OverlayLoader";
import { formatDateToMonthYear } from "../../../../../../../helper/formatDate";
import { getErrorMessage } from "../../../../../../../helper/getErrorMessage";

const defaultPagination = {
  pageIndex: 0,
  pageSize: 10,
};

const DetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<any>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDeleteSuccessModalVisible, setIsDeleteSuccessModalVisible] =
    useState(false);

  const [failedMessage, setFailedMessage] = useState<null | string>(null);

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isFailedModalVisible, setIsFailedModalVisible] = useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isApprovedSuccessModalVisible, setIsApprovedSuccessModalVisible] =
    useState(false);
  const [isRejectedSuccessModalVisible, setIsRejectedSuccessModalVisible] =
    useState(false);

  const [pagination, setPagination] = useState(defaultPagination);
  const [changeStatus, setChangeStatus] = useState("");
  const [isChangeStatusModalVisible, setIsChangeStatusModalVisible] =
    useState(false);
  const [isChangeStatusLoading, setIsChangeStatusLoading] = useState(false);
  const [
    isChangeStatusSuccessModalVisible,
    setIsChangeStatusSuccessModalVisible,
  ] = useState(false);
  const [
    isChangeStatusFailedModalVisible,
    setIsChangeStatusFailedModalVisible,
  ] = useState(false);
  const [isChangeStatusFailedMessage, setIsChangeStatusFailedMessage] =
    useState<null | string>(null);
  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      title: "Pengajuan",
      path: "/inventory/pengajuan",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Manajemen Pengiriman",
      path: "/inventory/pengajuan/manajemen-pengiriman",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Catatan Penerimaan",
      path: "/inventory/pengajuan/manajemen-pengiriman/catatan-penerimaan",
      isSeparator: false,
      isActive: false,
    },
  ];

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
    const fetchReceivedNote = async () => {
      if (id) {
        try {
          const response = await axiosInstance.get(
            `/inventory/submission/delivery-management/received-note/${id}`
          );
          setUserData(response.data.data);
          console.log("detail response", response.data.data);
        } catch (error) {
          console.error("Failed to fetch received note:", error);
        }
      }
    };

    fetchReceivedNote();
  }, [id]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [materialData, setMaterialData] = useState<any[]>([]); // Initialize materialData state
  // Fetch material data when receivedNoteId or pagination changes
  useEffect(() => {
    const fetchMaterialData = async () => {
      if (!id) return; // Exit if no receivedNoteId
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          `/inventory/submission/delivery-management/received-note/received-note-material/received-note/${id}`,
          {
            params: {
              page: pagination.pageIndex + 1, // API might expect 1-based index
              pageSize: pagination.pageSize,
            },
          }
        );
        console.log("data", response.data.data.received_note_materials);
        setMaterialData(response.data.data.received_note_materials);
      } catch (err) {
        setError("Failed to fetch material data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaterialData();
  }, [id, pagination]);

  const paginatedData = useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    return materialData.slice(start, end);
  }, [materialData, pagination.pageIndex, pagination.pageSize]);

  const handleBack = () => {
    navigate(-1);
  };

  // const handleDelete = () => {
  //     setIsDeleteModalVisible(true);
  // };

  const handleEdit = () => {
    navigate(`../edit/${id}`);
  };

  const handleDeleteAction = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(
        `/inventory/submission/delivery-management/received-note/${id}`
      );
      setIsDeleteSuccessModalVisible(true);
    } catch (error) {
      setFailedMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
      setIsDeleteModalVisible(false);
    }
  };

  // const handleEdit = () => {
  //     navigate(`/inventory/pengajuan/manajemen-pengiriman/catatan-penerimaan/edit/${id}`);
  // };

  const handleApprove = () => {
    setIsApproveModalVisible(true);
  };

  const handleReject = () => {
    setIsRejectModalVisible(true);
  };

  const handleApproveConfirm = async () => {
    setIsApproving(true);
    try {
      await axiosInstance.put(
        `/inventory/submission/delivery-management/received-note/status/${id}`,
        {
          status: "Approved",
        }
      );
      setIsApprovedSuccessModalVisible(true);
    } catch (error) {
      console.error("Failed to approve:", error);
      setIsFailedModalVisible(true);
    } finally {
      setIsApproving(false);
      setIsApproveModalVisible(false);
    }
  };

  const handleRejectConfirm = async () => {
    setIsRejecting(true);
    try {
      await axiosInstance.put(
        `/inventory/submission/delivery-management/received-note/status/${id}`,
        {
          status: "Rejected",
        }
      );
      setIsRejectedSuccessModalVisible(true);
    } catch (error) {
      console.error("Failed to reject:", error);
      setIsFailedModalVisible(true);
    } finally {
      setIsRejecting(false);
      setIsRejectModalVisible(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await axiosInstance.put(
        `/inventory/submission/delivery-management/received-note/status/${id}`,
        {
          status: "Submitted",
        }
      );
      setIsSuccessModalVisible(true);
    } catch (error) {
      setIsFailedModalVisible(true);
      if ((error as any).response.data.field) {
        setIsChangeStatusFailedMessage((error as any).response.data.field);
      } else {
        setIsChangeStatusFailedMessage((error as any).response.data.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isLoading && <OverlayLoader />}
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
                  {userData?.received_type === "Standard"
                    ? "Nomor Purchase Request"
                    : "Nomor Request Order"}
                </label>
                <p className="text-lg font-medium">
                  {userData?.received_type === "Standard"
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
                  {userData?.received_type === "Standard"
                    ? "Supplier"
                    : "Customer"}
                </label>
                <p className="text-lg font-medium">
                  {userData?.received_type === "Standard"
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

        <MaterialTableLayoutDetail
          status={userData?.status || ""}
          type={userData?.received_type || ""}
        />

        <div className="d-flex justify-content-end row">
          <div className="col-12 text-end my-4">
            <button
              type="button"
              onClick={handleBack}
              className="btn px-12 py-3 border border-gray-500 me-2"
            >
              Kembali
            </button>
            {userData?.status === "Draft" && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setIsDeleteModalVisible(true);
                  }}
                  className="btn px-12 py-3 border border-gray-500 me-2"
                >
                  Hapus
                </button>
                <button
                  type="button"
                  onClick={handleEdit}
                  className="btn btn-primary px-12 py-3 border border-primary me-8"
                >
                  Ubah
                </button>
                <button
                  type="button"
                  onClick={handleSubmit} // Directly call handleSubmit
                  className="btn px-12 py-3 border border-gray-500 me-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </>
            )}
            {userData?.status === "Submitted" && (
              <>
                <button
                  type="button"
                  onClick={handleReject}
                  className="btn px-12 py-3 border border-gray-500 me-2"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={handleApprove}
                  className="btn btn-primary px-12 py-3 border border-primary"
                  disabled={isApproving}
                >
                  {isApproving ? "Menyetujui..." : "Approve"}
                </button>
              </>
            )}
            {/* {userData?.status === 'Approved' && (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="btn px-12 py-3 border border-gray-500 me-2"
                            >
                                Kembali
                            </button>
                        )} */}
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
        {failedMessage && (
          <FailedModal
            closeModal={() => setFailedMessage(null)}
            title="Gagal"
            message={failedMessage}
          />
        )}

        {isSuccessModalVisible && (
          <SuccessModal
            title="Berhasil"
            successMessage="Data telah berhasil diupdate!"
            closeModal={() => {
              setIsSuccessModalVisible(false);
              navigate(0);
            }}
          />
        )}

        {isFailedModalVisible && (
          <FailedModal
            title="Gagal"
            message={isChangeStatusFailedMessage || "Terjadi kesalahan."}
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
